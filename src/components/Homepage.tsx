"use client";
import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import useSWR from "swr";
import { RiDeleteBin5Line } from "react-icons/ri";
import axios from "axios";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Homepage() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const noteDialogRef = useRef<HTMLDialogElement | null>(null);
  const deleteNoteDialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState();

  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");

  const { data, error, isLoading } = useSWR(
    "https://gentle-reef-44011-52614e167e42.herokuapp.com/api/notes",
    fetcher
  );

  useEffect(() => {
    if (isLoading) return; // Do nothing while loading
    if (error) {
      console.error("Error occurred:", error);
      return;
    }
    console.log(data.notes);

    setNotes(data.notes); // Set notes when data is available
  }, [data, error, isLoading]);

  if (isLoading) return "Loading..";
  if (error) return "Error occured";

  const openDeleteNoteDialog = (id: any) => {
    setSelectedNoteId(id);
    if (deleteNoteDialogRef.current) {
      deleteNoteDialogRef.current.showModal();
    }
  };

  const closeDeleteNoteDialog = () => {
    if (deleteNoteDialogRef.current) {
      deleteNoteDialogRef.current.close();
    }
  };

  const openNoteDialog = () => {
    if (noteDialogRef.current) {
      noteDialogRef.current.showModal();
    }
    // add event listener to close the dialog when clicking outside
    document.addEventListener("mousedown", handleOutsideClick);
  };

  const closeNoteDialog = () => {
    // remove event listener and close the dialog
    // document.removeEventListener("mousedown", handleOutsideClick);
    if (noteDialogRef.current) {
      noteDialogRef.current.close();
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      noteDialogRef.current &&
      !noteDialogRef.current.contains(event.target as Node)
    ) {
      closeNoteDialog();
    }
  };

  const handleDeleteNote = async () => {
    try {
      // Make an API call to delete the note with the selectedNoteId
      console.log("DEL");
      await axios.delete(
        `https://gentle-reef-44011-52614e167e42.herokuapp.com/api/notes/${selectedNoteId}`
      );

      // Update the local state to reflect the deleted note
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== selectedNoteId)
      );

      // Close the delete note dialog
      if (deleteNoteDialogRef.current) {
        deleteNoteDialogRef.current.close();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleCreateNote = async () => {
    try {
      // Make an API call to create a new note
      await axios.post(
        "https://gentle-reef-44011-52614e167e42.herokuapp.com/api/notes",
        {
          title: newNoteTitle,
          noteBody: newNoteBody,
        }
      );

      // Refetch the notes to update the list
      const newData = await fetcher(
        "https://gentle-reef-44011-52614e167e42.herokuapp.com/api/notes"
      );
      setNotes(newData.notes);

      // Close the note dialog
      closeNoteDialog();
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  // handleOutsideClick()

  return (
    <main className="">
      <div className="rounded-xl w-2/3 mx-auto bg-white shadow-md">
        <div className="mt-12 mb-8">
          <div className="sticky top-0 w-full rounded-xl z-10 bg-white">
            <div className="header-wrapper flex pt-6 pb-2 px-10">
              <h2 className="text-2xl font-bold mr-auto">All notes</h2>
              <button
                onClick={openNoteDialog}
                className="bg-black px-4 py-1 rounded-full text-white"
              >
                Create +{" "}
              </button>
            </div>
          </div>
          <div className="notes-wrapper p-8  overflow-y-auto">
            <ul>
              {notes.map((note, index) => (
                <li key={index} className="flex items-center">
                  <div className="mr-auto flex-1">
                    <Note
                      title={note.title}
                      noteBody={note.noteBody}
                      createdAt={new Date(note.createdAt)}
                      updatedAt={new Date(note.updatedAt)}
                    />
                  </div>

                  <RiDeleteBin5Line
                    onClick={() => openDeleteNoteDialog(note._id)}
                    className="text-2xl ml-4 opacity-70 hover:opacity-100 hover:cursor-pointer text-pink-600	 "
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <dialog
        ref={noteDialogRef}
        className="bg-white p-8 rounded-xl w-1/2 mx-auto shadow-sm"
      >
        <div className="bg-red-100j">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateNote();
            }}
          >
            <div className="w-full">
              <input
                type="text"
                className="w-full"
                placeholder="Note title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
            </div>
            <div className="min-h-[18em]">
              <input
                type="text"
                placeholder="Note body"
                className="h-full w-full"
                value={newNoteBody}
                onChange={(e) => setNewNoteBody(e.target.value)}
              />
            </div>
            <div className="flex">
              <button type="submit" className="mr-auto">
                Save
              </button>
              <button onClick={closeNoteDialog}>cancel</button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog ref={deleteNoteDialogRef} className="h-40 rounded-lg p-8">
        <p className="mb-8">
          Deleting note will permanetly remove it from your library
        </p>
        <div className="flex">
          <button className="mr-auto " onClick={closeDeleteNoteDialog}>
            No, Keep Note
          </button>
          <button
            className="bg-pink-600 text-white p-2 rounded-md"
            onClick={handleDeleteNote}
          >
            Yes, Delete Note
          </button>
        </div>
      </dialog>
    </main>
  );
}
