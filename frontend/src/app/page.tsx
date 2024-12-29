import React from "react";

const Home = () => {
  return (
    <div className="flex  w-[100%] h-full">
      <div className="flex flex-col gap-5 w-[400px]">
        <h1 className="text-4xl mb-4 font-bold  ">Welcome to To-do app</h1>
        <input type="text" className="border-2 p-2" placeholder="password" />
        <input type="text" className="border-2 p-2" placeholder="email ID" />
        <button className="p-2 bg-blue-700 text-white font-bold hover:bg-blue-500">
          Sign in to continue
        </button>
      </div>
    </div>
  );
};

export default Home;
