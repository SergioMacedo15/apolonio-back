import MessageItem from "@/app/components/MessageItem";
import type { RoleAPIModel } from "@/services/sdk/types";
import type { UIMessage } from "ai";

const messages: {
  content: string | { type: "image"; url: string };
  sender: "me" | "them";
  time: string;
}[] = [
  {
    content: "Oi, tudo bem?",
    sender: "them",
    time: "14:30",
  },
  {
    content: "Tudo sim, e você?",
    sender: "me",
    time: "14:31",
  },
  {
    content: {
      type: "image",
      url: "https://isinaliza.vtexassets.com/arquivos/ids/173952-800-auto?v=636848933160370000&width=800&height=auto&aspect=true",
    },
    sender: "them",
    time: "14:32",
  },
  {
    content: "Que foto linda! Você vai ao evento hoje?",
    sender: "me",
    time: "14:33",
  },
  {
    content: {
      type: "image",
      url: "https://isinaliza.vtexassets.com/arquivos/ids/173952-800-auto?v=636848933160370000&width=800&height=auto&aspect=true",
    },
    sender: "them",
    time: "14:34",
  },
  {
    content: "Vou sim, você também vai?",
    sender: "them",
    time: "14:35",
  },
];

interface MessageListProps {
  messages: UIMessage[];
}

export default function MessageList(props: MessageListProps) {
  const { messages } = props;
  return (
    <div className="p-4 overflow-y-auto h-full">
      {messages.map((msg, index) => (
        <MessageItem key={index} {...msg} />
      ))}
    </div>
  );
}
