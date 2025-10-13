import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import GiftsShop from '@/components/GiftsShop';

interface LiveStream {
  id: number;
  username: string;
  avatar: string;
  title: string;
  viewers: number;
  thumbnail: string;
  category: string;
}

interface LiveScreenProps {
  onStreamClick?: (stream: LiveStream) => void;
}

const mockLiveStreams: LiveStream[] = [
  {
    id: 1,
    username: 'CyberCreator',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    title: 'Создаю футуристические дизайны 🚀',
    viewers: 1234,
    thumbnail: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    category: 'Искусство и дизайн',
  },
  {
    id: 2,
    username: 'NeonDancer',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    title: 'Тренировка танцев ✨',
    viewers: 856,
    thumbnail: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    category: 'Танцы',
  },
  {
    id: 3,
    username: 'TechBeats',
    avatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    title: 'Создаю биты в прямом эфире 🎵',
    viewers: 2341,
    thumbnail: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    category: 'Музыка',
  },
];

export default function LiveScreen({ onStreamClick }: LiveScreenProps) {
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);

  if (selectedStream) {
    return <LiveStreamViewer stream={selectedStream} onClose={() => setSelectedStream(null)} />;
  }

  return (
    <div className="h-screen overflow-y-auto scrollbar-hide bg-background pb-20">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-['Orbitron'] text-2xl font-bold text-foreground mb-1">
              Прямые эфиры
            </h1>
            <p className="text-sm text-muted-foreground">
              {mockLiveStreams.length} креаторов в эфире
            </p>
          </div>
          <button className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity animate-pulse-glow">
            <Icon name="Radio" size={24} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {mockLiveStreams.map((stream) => (
          <div
            key={stream.id}
            onClick={() => {
              setSelectedStream(stream);
              onStreamClick?.(stream);
            }}
            className="rounded-2xl overflow-hidden border border-border bg-card/30 backdrop-blur-sm cursor-pointer hover:border-primary transition-all group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={stream.thumbnail}
                alt={stream.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-2 animate-pulse-glow">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white uppercase">Эфир</span>
              </div>

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm flex items-center gap-1">
                <Icon name="Eye" size={14} className="text-white" />
                <span className="text-xs font-bold text-white">
                  {stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white overflow-hidden flex-shrink-0">
                    <img
                      src={stream.avatar}
                      alt={stream.username}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{stream.username}</p>
                    <p className="text-xs text-white/70">{stream.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-['Orbitron'] font-bold text-foreground mb-1">
                {stream.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LiveStreamViewerProps {
  stream: LiveStream;
  onClose: () => void;
}

function LiveStreamViewer({ stream, onClose }: LiveStreamViewerProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, username: 'User123', text: 'Удивительный эфир! 🔥', time: '1м' },
    { id: 2, username: 'TechFan', text: 'Обожаю!', time: '2м' },
    { id: 3, username: 'CoolViewer', text: 'Продолжай! 💜', time: '3м' },
  ]);
  const [isLiked, setIsLiked] = useState(false);
  const [showGiftsShop, setShowGiftsShop] = useState(false);
  const [giftAnimations, setGiftAnimations] = useState<Array<{ id: number; emoji: string; name: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, username: 'Вы', text: message, time: 'сейчас' },
      ]);
      setMessage('');
    }
  };

  const handleSendGift = (gift: any) => {
    const newAnimation = { id: Date.now(), emoji: gift.emoji, name: gift.name };
    setGiftAnimations([...giftAnimations, newAnimation]);
    
    setMessages([
      ...messages,
      { 
        id: messages.length + 1, 
        username: 'Вы', 
        text: `Отправил(а) ${gift.name} ${gift.emoji}`, 
        time: 'сейчас' 
      },
    ]);

    setTimeout(() => {
      setGiftAnimations((prev) => prev.filter((a) => a.id !== newAnimation.id));
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <video
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          className="h-full w-full object-cover"
          autoPlay
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <div className="absolute top-0 left-0 right-0 px-4 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name="ArrowLeft" size={20} className="text-white" />
              </button>
              <div className="h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                <img src={stream.avatar} alt={stream.username} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-['Orbitron'] text-sm font-bold text-white">
                  {stream.username}
                </p>
                <p className="text-xs text-white/70">{stream.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center gap-2 animate-pulse-glow">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white uppercase">Эфир</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1">
                <Icon name="Eye" size={14} className="text-white" />
                <span className="text-xs font-bold text-white">{stream.viewers}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-20 right-4 flex flex-col gap-4">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`h-12 w-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
              isLiked ? 'bg-gradient-to-br from-primary to-secondary' : 'bg-black/30'
            }`}>
              <Icon name="Heart" size={24} className={isLiked ? 'text-white fill-current' : 'text-white'} />
            </div>
            <span className="text-xs font-bold text-white">324</span>
          </button>

          <button 
            onClick={() => setShowGiftsShop(true)}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 backdrop-blur-sm flex items-center justify-center animate-pulse-glow">
              <Icon name="Gift" size={24} className="text-white" />
            </div>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Icon name="Share2" size={24} className="text-white" />
            </div>
          </button>
        </div>

        {giftAnimations.map((gift) => (
          <div
            key={gift.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-bounce pointer-events-none"
            style={{ 
              animation: 'bounce 1s ease-in-out, fadeOut 3s ease-in-out',
            }}
          >
            {gift.emoji}
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6">
          <div className="mb-4 max-h-48 overflow-y-auto scrollbar-hide space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="inline-block px-3 py-2 rounded-full bg-black/50 backdrop-blur-sm animate-fade-in"
              >
                <span className="font-bold text-primary text-xs mr-1">{msg.username}</span>
                <span className="text-white text-xs">{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Напишите что-нибудь..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 rounded-full border-2 border-white/30 bg-black/30 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`h-12 w-12 rounded-full flex items-center justify-center transition-all ${
                message.trim()
                  ? 'bg-gradient-to-r from-primary to-secondary'
                  : 'bg-black/30'
              }`}
            >
              <Icon name="Send" size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <GiftsShop
        open={showGiftsShop}
        onClose={() => setShowGiftsShop(false)}
        onSendGift={handleSendGift}
        recipientName={stream.username}
      />
    </div>
  );
}