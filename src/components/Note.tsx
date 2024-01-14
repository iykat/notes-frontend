import { FC } from "react";

interface NoteProps {
  title: string;
  body: string;
}

const Note: FC<NoteProps> = ({ title, body }) => {
  return (
    <div className="mb-4 hover:bg-neutral-100 p-2 rounded-lg hover:cursor-pointer">
      <h2 className="font-semibold">{title}</h2>
      <p className="opacity-90 text-sm">{body}</p>
      <div className="flex text-xs opacity-80 mt-1">
        <p className="mr-auto">Created at: some date</p>
        <p>Updated at: some date</p>
      </div>
    </div>
  );
};

export default Note;
