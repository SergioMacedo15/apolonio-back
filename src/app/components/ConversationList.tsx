"use client";
import { useState, useEffect } from "react";
import ConversationItem from "@/app/components/ConversationItem";
import SearchInput from "@/app/components/SearchInput";
import GrandmaConversationItem from "@/app/components/GrandmaConversationItem";

interface Conversation {
  profileImage: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  scheduledTime?: number;
}

interface ConversationTimingData {
  visibleConversations: Conversation[];
  scheduledConversations: {
    conversationIndex: number;
    appearAt: number;
  }[];
  initializedAt: number;
}

const grandmaConversation: Conversation = {
  profileImage: "/profile-old-woman.jpg",
  name: "Vó",
  lastMessage: "Tá bem",
  time: "",
  unreadCount: 1,
};

const baseConversations: Conversation[] = [
  {
    profileImage: "/profile-familia.jpg",
    name: "Família Buscapé",
    lastMessage: "Prima Fernanda: Tio Paulo seu corno",
    time: "",
    unreadCount: 1,
  },
  {
    profileImage: "/profile-namorada.jpg",
    name: "Amor 💗",
    lastMessage: "Precisamos conversar...",
    time: "",
    unreadCount: 1,
  },
  {
    profileImage: "/profile-mecanico.jpg",
    name: "Tião Mecânico",
    lastMessage: "🎤 8:23",
    time: "",
    unreadCount: 1,
  },
  {
    profileImage: "/profile-chefe.jpg",
    name: "Chefe",
    lastMessage: "Passa no RH amanhã",
    time: "",
    unreadCount: 1,
  },
  {
    profileImage: "/profile-tecnico.jpg",
    name: "Técnico Assistência",
    lastMessage: "Sua placa queimou",
    time: "",
    unreadCount: 1,
  },
  {
    profileImage: "/profile.png",
    name: "João Agiota",
    lastMessage: "Gravando áudio...",
    time: "",
    unreadCount: 2,
  }
];

export default function ConversationList() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [visibleConversations, setVisibleConversations] = useState<Conversation[]>([]);
  let notificationSound: HTMLAudioElement | null = null;
  
  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      notificationSound = new Audio("/toque.mp3");
    }

    const storedDataString = sessionStorage.getItem("whatsappTimingData");
    let timingData: ConversationTimingData;
    
    if (storedDataString) {
      timingData = JSON.parse(storedDataString);
      setVisibleConversations(timingData.visibleConversations);
    } else {
      const now = Date.now();
      const scheduledConversations = baseConversations.map((_, index) => {
        const minDelay = 17000;
        const randomExtraTime = Math.floor(Math.random() * 15000);
        const totalDelay = minDelay * (index + 1) + randomExtraTime;
        
        return {
          conversationIndex: index,
          appearAt: now + totalDelay
        };
      });
      
      timingData = {
        visibleConversations: [],
        scheduledConversations,
        initializedAt: now
      };
      
      sessionStorage.setItem("whatsappTimingData", JSON.stringify(timingData));
    }
    
    timingData.scheduledConversations.forEach(scheduled => {
      const now = Date.now();
      const remainingDelay = Math.max(0, scheduled.appearAt - now);
      
      if (remainingDelay > 0) {
        setTimeout(() => {
          const conversationToAdd = {
            ...baseConversations[scheduled.conversationIndex], 
            time: new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
          };
          
          setVisibleConversations(prev => {
            const updated = [conversationToAdd, ...prev];
            
            const updatedTimingData: ConversationTimingData = {
              visibleConversations: updated,
              scheduledConversations: timingData.scheduledConversations.filter(
                sc => sc.conversationIndex !== scheduled.conversationIndex
              ),
              initializedAt: timingData.initializedAt
            };
            
            sessionStorage.setItem("whatsappTimingData", JSON.stringify(updatedTimingData));
            
            if (notificationSound) {
              notificationSound.currentTime = 0;
              notificationSound.play().catch(err => console.log("Audio play error:", err));
            }
            
            return updated;
          });
        }, remainingDelay);
      }
    });
    
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
            <GrandmaConversationItem {...grandmaConversation} />
            <p className="text-gray-400 text-center mt-2 italic">A única que importa</p>
          </>
        ) : (
          <>
            <GrandmaConversationItem {...grandmaConversation} />
            {visibleConversations.map((conversation) => (
              <ConversationItem key={conversation.name} {...conversation} />
            ))}
          </>
        )}
      </div>
    </>
  );
}