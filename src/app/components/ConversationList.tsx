"use client";
import { useState, useEffect } from "react";
import ConversationItem from "@/app/components/ConversationItem";
import SearchInput from "@/app/components/SearchInput";

interface Conversation {
  profileImage: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const conversations: Conversation[] = [
  {
    profileImage: "/profile-old-woman.jpg",
    name: "Vó",
    lastMessage: "Tá bem",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile-familia.jpg",
    name: "Família Buscapé",
    lastMessage: "Prima Fernanda: Tio Paulo seu corno",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile-namorada.jpg",
    name: "Amor 💗",
    lastMessage: "Precisamos conversar...",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile-mecanico.jpg",
    name: "Tião Mecânico",
    lastMessage: "🎤 8:23",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile-chefe.jpg",
    name: "Chefe",
    lastMessage: "Passa no RH amanhã",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile-tecnico.jpg",
    name: "Técnico Assistência",
    lastMessage: "Sua placa queimou",
    time: "",
    unreadCount: 1
  },
  {
    profileImage: "/profile.png",
    name: "João Agiota",
    lastMessage: "Gravando áudio...",
    time: "",
    unreadCount: 2
  },
];

export default function ConversationList() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [visibleConversations, setVisibleConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const storedConversations = localStorage.getItem("visibleConversations");
    if (storedConversations) {
      setVisibleConversations(JSON.parse(storedConversations));
    } else {
      const grandmaConversation = { ...conversations[0] };
      
      setVisibleConversations([grandmaConversation]);
      localStorage.setItem("visibleConversations", JSON.stringify([grandmaConversation]));
      
      for (let i = 1; i < conversations.length; i++) {
        const minDelay = 30000;
        const randomExtraTime = Math.floor(Math.random() * 15000);
        const totalDelay = minDelay * i + randomExtraTime;
        
        setTimeout(() => {
          const newConversation = {
            ...conversations[i],
            time: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          };
          
          setVisibleConversations((prev) => {
            const voConversation = prev.find(c => c.name === "Vó");
            const otherConversations = prev.filter(c => c.name !== "Vó");
            
            const updated = voConversation 
              ? [voConversation, newConversation, ...otherConversations] 
              : [newConversation, ...otherConversations];
              
            localStorage.setItem("visibleConversations", JSON.stringify(updated));
            return updated;
          });
        }, totalDelay);
      }
    }
  }, []);

  const showOnlyGrandma = searchValue.trim() !== "";
  
  return (
    <>
      <SearchInput
        value={searchValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
      />
      <div className="flex-1 overflow-y-hidden overflow-x-hidden">
        {showOnlyGrandma ? (
          <>
            <ConversationItem {...conversations[0]} />
            <p className="text-gray-400 text-center mt-2 italic">A única que importa</p>
          </>
        ) : (
          visibleConversations.map((conversation) => (
            <ConversationItem key={conversation.name} {...conversation} />
          ))
        )}
      </div>
    </>
  );
}