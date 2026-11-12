import React from "react";
import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NoNotesFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/30 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No Notes found</h3>
      <p className="text-base-content/70 ">
        Ready to gather your thoughts? Create your first Note here!!
      </p>
      <Link to="/create" className="btn btn-primary ">
        Create your First Note!
      </Link>
    </div>
  );
};

export default NoNotesFound;
