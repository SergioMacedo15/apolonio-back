"use client";

import { useState } from "react";
import ConversationItem from "@/app/components/ConversationItem";
import SearchInput from "@/app/components/SearchInput";

const conversations = [
  {
    profileImage: "/profile-old-woman.jpg",
    name: "Vó",
    lastMessage: "Tá bem",
    time: "14:11",
  },
  {
    profileImage: "/profile.png",
    name: "João Agiota",
    lastMessage: "Gravando aúdio...",
    time: "13:54",
  },
  {
    profileImage: "/profile-tecnico.jpg",
    name: "Técnico Assistência",
    lastMessage: "Sua placa queimou",
    time: "12:24",
  },
  {
    profileImage: "/profile-chefe.jpg",
    name: "Chefe",
    lastMessage: "Passa no RH amanhã",
    time: "11:41",
  },
  {
    profileImage: "/profile-mecanico.jpg",
    name: "Tião Mecânico",
    lastMessage: "🎤 8:23",
    time: "10:32",
  },
  {
    profileImage: "/profile-namorada.jpg",
    name: "Amor 💗",
    lastMessage: "Precisamos conversar...",
    time: "8:14",
  },
  {
    profileImage: "/profile-familia.jpg",
    name: "Família Buscapé",
    lastMessage: "Prima Fernanda: Tio Paulo seu corno",
    time: "7:45",
  },
];

export default function ConversationList() {
  const [searchValue, setSearchValue] = useState("");

  // Controla a renderização condicional
  const showOnlyGrandma = searchValue.trim() !== "";

  return (
    <>
      <SearchInput
        // Passa a prop para controlar o valor e onChange no input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <div className="flex-1 overflow-y-hidden overflow-x-hidden">
        {showOnlyGrandma ? (
          <>
            <ConversationItem {...conversations[0]} />
            <p className="text-gray-400 text-center mt-2 italic">A única que importa</p>
          </>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem key={conversation.name} {...conversation} />
          ))
        )}
      </div>
    </>
  );
}
