"use client";
import { useEffect, useState } from "react";
import Note, { NoteInterface } from "./Note";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Homepage() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/notes",
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
  return (
    <main className="">
      <div className="rounded-xl w-1/2 mx-auto bg-white shadow-md">
        <div className="mt-12 mb-8">
          <div className="sticky top-0 w-full rounded-xl z-10 bg-white">
            <div className="header-wrapper flex pt-6 pb-2 px-10">
              <h2 className="text-2xl font-bold mr-auto">All notes</h2>
              <button className="bg-black px-4 py-1 rounded-full text-white">
                Create +{" "}
              </button>
            </div>
          </div>
          <div className="notes-wrapper p-8  overflow-y-auto">
            <ul>
              {notes.map((note, index) => (
                <li key={index}>
                  <Note title={note.title} noteBody={note.noteBody} createdAt={new Date(note.createdAt)} updatedAt={new Date(note.updatedAt)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
