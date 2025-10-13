import { useState } from 'react';
import Icon from '@/components/ui/icon';
import ChatScreen from '@/components/ChatScreen';

interface Chat {
  id: number;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    username: 'CyberCreator',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    lastMessage: 'Привет! Посмотри мое новое видео 🚀',
    timestamp: '2m',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    username: 'NeonDancer',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    lastMessage: 'Спасибо за подписку! ✨',
    timestamp: '1h',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    username: 'TechBeats',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    lastMessage: 'Обожаю твой контент! Продолжай в том же духе',
    timestamp: '3h',
    unread: 1,
    online: false,
  },
];

export default function MessagesScreen() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedChat) {
    return (
      <ChatScreen
        chat={selectedChat}
        onBack={() => setSelectedChat(null)}
      />
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col pb-20">
      <div className="px-6 pt-6 pb-4 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground">
            Сообщения
          </h1>
          <button className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center hover:opacity-90 transition-opacity">
            <Icon name="Edit" size={20} className="text-white" />
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Поиск сообщений..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card/50 px-4 py-3 pl-12 text-foreground backdrop-blur-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredChats.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-card/30 flex items-center justify-center">
                <Icon name="MessageCircle" size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Сообщения не найдены</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-card/20 transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-border">
                    <img src={chat.avatar} alt={chat.username} className="h-full w-full object-cover" />
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-['Orbitron'] font-bold text-foreground truncate">
                      {chat.username}
                    </h3>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{chat.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}