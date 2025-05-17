import ConversationItem from "@/app/components/ConversationItem";

const conversations = [
  {
    profileImage: "/profile.png",
    name: "Vó Surda",
    lastMessage: "Tá bem",
    time: "15:11",
  },
  {
    profileImage: "/profile.png",
    name: "João Silva",
    lastMessage: "Tudo certo para amanhã?",
    time: "14:32",
  },
  {
    profileImage: "/profile.png",
    name: "Maria Oliveira",
    lastMessage: "Me avise quando chegar.",
    time: "13:15",
  },
  {
    profileImage: "/profile.png",
    name: "Grupo da Família",
    lastMessage: "Feliz aniversário, João!",
    time: "11:45",
  },
];

export default function ConversationList() {
  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation, index) => (
        <ConversationItem key={index} {...conversation} />
      ))}
    </div>
  );
}
