import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Introduction";
import Message from "./chat-app/Message";
import SignUp from "./login/SignUp";
import SignInSide from "./login/SignIn";
import Account from "./profile/Account";
import TicTacToe from "./services/TicTacToe";

const Path = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/account" element={<Account />} />
      <Route path="/signin" element={<SignInSide />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/message/*" element={<Message />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
    </Routes>
  );
};
export default Path;
