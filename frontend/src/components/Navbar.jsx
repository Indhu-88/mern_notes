import React from "react";
import { Link } from "react-router"; //main purpose is to build single-page apps
import { PlusIcon } from "lucide-react"; //for icons

// <div data-theme="forest">  theme in App.jsx

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/30 ">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl text-primary font-bold font-mono tracking-tight">
            ThinkBoard
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// tracking-tight -> is a utility class that controls letter spacing
