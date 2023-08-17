import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Introduction";
import SignUp from "./login/SignUp";
import SignInSide from "./login/SignIn";
import Account from "./profile/Account";
import TicTacToe from "./services/TicTacToe";
import Chat from "./chat-app/Chat";

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/account" element={<Account />} />
      <Route path="/signin" element={<SignInSide />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/chat/*" element={<Chat />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
    </Routes>
  );
};
export default Path;
