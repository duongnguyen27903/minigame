import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import tictactoe from "F:/minigame/src/assets/tictactoe.jpg";

export const Menu = [
  {
    path: "/account",
    icon: <UserCircleIcon className="h-10 w-10" />,
    name: "Account",
  },
  {
    path: "/chat",
    icon: <ChatBubbleBottomCenterTextIcon className="h-10 w-10" />,
    name: "Chat",
  },
  {
    path: "/tic-tac-toe",
    icon: (
      <img src={tictactoe} alt="tictactoe" className="h-10 w-10 rounded-full" />
    ),
    name: "TicTacToe",
  },
  {
    path: "/",
    icon: <ArrowLeftOnRectangleIcon className="h-10 w-10" />,
    name: "Home",
  },
];
