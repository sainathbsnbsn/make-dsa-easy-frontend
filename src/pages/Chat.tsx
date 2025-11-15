import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import BottomNav from "./BottomNav";

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "Alice",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      text: "Hey everyone! Just solved the two-sum problem. Anyone want to discuss different approaches?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      user: "Bob",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      text: "Nice! I used a hash map approach. What did you use?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      user: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      text: "I'm working on dynamic programming problems. Any tips?",
      timestamp: "10:35 AM",
      isCurrentUser: true,
    },
    {
      id: 4,
      user: "Charlie",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      text: "Start with the classic problems like fibonacci and climbing stairs. Build intuition first!",
      timestamp: "10:37 AM",
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <h1 className="text-xl font-bold text-center">Developer Chat</h1>
        <p className="text-sm text-center opacity-90">Connect with fellow learners</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.isCurrentUser ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={msg.avatar} />
                <AvatarFallback>{msg.user[0]}</AvatarFallback>
              </Avatar>
              <div className={`flex flex-col ${msg.isCurrentUser ? "items-end" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[280px] ${
                    msg.isCurrentUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t bg-card p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;
