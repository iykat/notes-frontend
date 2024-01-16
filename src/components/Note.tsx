import { formatDate } from "@/utils/helpers";
import { FC } from "react";
export interface NoteInterface {
  id?: string;
  title: string;
  noteBody: string;
  createdAt: Date,
  updatedAt: Date
}

const Note: FC<NoteInterface> = ({ title, noteBody, createdAt, updatedAt }) => {
  return (
    <div className="mb-4 hover:bg-neutral-100 p-2 rounded-lg hover:cursor-pointer">
      <h2 className="overflow-ellipsis clamp-text font-semibold">{title}</h2>
      <p className="opacity-90 text-sm overflow-ellipsis clamp-text">{noteBody}</p>
      <div className="flex text-xs opacity-40 mt-1">
        <p className="mr-auto">Created at: {formatDate(createdAt)}</p>
        <p>Updated at: {formatDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default Note;
