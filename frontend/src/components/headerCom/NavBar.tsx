import Link from "next/link";
import React from "react";

const NavBar: React.FC = () => {
  return (
    <div className="flex p-3 font-bold gap-3 fixed w-full bg-white shadow-3xl justify-between">
      <div className="flex gap-2 items-center">
        <Link href={"dashboard"}>Dashboard</Link>
        <Link href={"taskList"}>Task list</Link>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-400 font-bold py-1 px-2 rounded-lg">
        Sign out
      </button>
    </div>
  );
};

export default NavBar;
