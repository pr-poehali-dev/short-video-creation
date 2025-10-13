import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatScreenProps {
  chat: {
    id: number;
    username: string;
    avatar: string;
    online: boolean;
  };
  onBack: () => void;
}

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Hey! How are you? 👋",
    timestamp: '10:30',
    isOwn: false,
  },
  {
    id: 2,
    text: "Hi! I'm great, thanks! Just finished a new video",
    timestamp: '10:32',
    isOwn: true,
  },
  {
    id: 3,
    text: "That's awesome! Can't wait to see it 🚀",
    timestamp: '10:33',
    isOwn: false,
  },
  {
    id: 4,
    text: "Check it out on my profile! Let me know what you think ✨",
    timestamp: '10:35',
    isOwn: true,
  },
];

export default function ChatScreen({ chat, onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background pb-20">
      <div className="px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm flex items-center gap-4">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full hover:bg-card/50 flex items-center justify-center transition-colors"
        >
          <Icon name="ArrowLeft" size={24} />
        </button>

        <div className="relative flex-shrink-0">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-border">
            <img src={chat.avatar} alt={chat.username} className="h-full w-full object-cover" />
          </div>
          {chat.online && (
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-['Orbitron'] font-bold text-foreground">{chat.username}</h2>
          <p className="text-xs text-muted-foreground">{chat.online ? 'Online' : 'Offline'}</p>
        </div>

        <button className="h-10 w-10 rounded-full hover:bg-card/50 flex items-center justify-center transition-colors">
          <Icon name="MoreVertical" size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.isOwn
                    ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white'
                    : 'bg-card/50 border border-border text-foreground'
                }`}
              >
                <p className="text-sm break-words">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isOwn ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full hover:bg-card/50 flex items-center justify-center transition-colors flex-shrink-0">
            <Icon name="Paperclip" size={20} />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-2xl border border-border bg-card/50 px-4 py-3 text-foreground backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
              inputValue.trim() === ''
                ? 'bg-card/50 text-muted-foreground cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90'
            }`}
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
