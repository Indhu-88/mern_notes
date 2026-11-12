import React from "react";
import { Route, Routes } from "react-router"; //main purpose is to build single-page apps

import HomePage from "./page/HomePage";
import CreatePage from "./page/CreatePage";
import NoteDetailPage from "./page/NoteDetailPage";
import toast from "react-hot-toast";

//removed data-theme="forest" bcoz its mentioned in tailwind.config
// also no self closing for <div>
const App = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"></div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
        <Route path="/note/:id" element={<NoteDetailPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;

// --------------------DEPLOYMENT-------------------
// git init (in mern_thinkboard folder)
// git add .

// had to initialize my name and email
// git config --global user.name indhu
// git config --global user.email indhu.sadan88@gmail.com

// git commit -m "initial commit"

// Your identification has been saved in /home/indhu/.ssh/id_ed25519
// Your identification has been saved in /home/indhu/.ssh/id_ed25519

// npm init -y       --> to create package.json in mern_thinkbpoard folder

// In package.json,
// "scripts": {
// "build": "npm install --prefix backend && npm install --prefix frontend && npm run buil --prefix frontend"
// },

//npm run build     -->this creates node modules for both backend and frontend && runs build under frontend
// -->creates dist folder which is the optimised version of REACT-frontend
