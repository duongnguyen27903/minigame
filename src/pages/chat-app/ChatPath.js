import React from "react";
import { Route, Routes } from "react-router-dom";
import anh from "F:/minigame/src/assets/EI.jpg";
import { BoxChat } from "./BoxChat";

export const ChatPath = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<img className="min-h-screen" src={anh} alt="anh" />}
      />
      <Route path="/:id" element={<BoxChat />} />
    </Routes>
  );
};
