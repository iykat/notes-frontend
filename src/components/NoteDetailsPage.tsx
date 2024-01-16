"use client";
import { useState } from "react";

export default function NoteDetailsPage() {
  const [content, setContent] = useState("");

  return (
    <section className="bg-white mt-12  rounded-xl w-1/2 mx-auto shadow-md">
      <div className="bg-red-100j">
        <form action="">
          <div className="w-full">
            <input type="text" className="w-full" placeholder="Note title" />
            {/* <label htmlFor="">Title</label> */}
          </div>
          <div className="min-h-[18em]">
            <input
              type="text"
              placeholder="Note body"
              className="h-full w-full"
            />
            {/* <label htmlFor="">Body</label> */}
          </div>
        </form>
      </div>
    </section>
  );
}
