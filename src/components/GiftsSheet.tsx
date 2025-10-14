import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface GiftsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoAuthor: string;
}

interface Gift {
  id: number;
  emoji: string;
  name: string;
  price: number;
}

const gifts: Gift[] = [
  { id: 1, emoji: '❤️', name: 'Сердце', price: 10 },
  { id: 2, emoji: '🌹', name: 'Роза', price: 50 },
  { id: 3, emoji: '🎁', name: 'Подарок', price: 100 },
  { id: 4, emoji: '💎', name: 'Бриллиант', price: 500 },
  { id: 5, emoji: '👑', name: 'Корона', price: 1000 },
  { id: 6, emoji: '🚀', name: 'Ракета', price: 2000 },
  { id: 7, emoji: '🔥', name: 'Огонь', price: 100 },
  { id: 8, emoji: '⭐', name: 'Звезда', price: 200 },
  { id: 9, emoji: '💰', name: 'Деньги', price: 5000 },
];

export default function GiftsSheet({ isOpen, onClose, videoAuthor }: GiftsSheetProps) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [balance] = useState(10000);

  const handleSendGift = () => {
    if (selectedGift) {
      console.log(`Sending ${selectedGift.name} to ${videoAuthor}`);
      setSelectedGift(null);
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl border-t-2 border-primary/20">
        <SheetHeader>
          <SheetTitle className="font-['Orbitron'] text-xl text-center">
            Отправить подарок
          </SheetTitle>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">для {videoAuthor}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Icon name="Coins" size={16} className="text-primary" />
              <span className="font-['Orbitron'] text-sm font-bold text-primary">
                {balance.toLocaleString()} монет
              </span>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-3 gap-4 pb-24 overflow-y-auto max-h-[calc(70vh-200px)]">
          {gifts.map((gift) => (
            <button
              key={gift.id}
              onClick={() => setSelectedGift(gift)}
              className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
                selectedGift?.id === gift.id
                  ? 'bg-gradient-to-br from-primary/20 to-secondary/20 ring-2 ring-primary'
                  : 'bg-card hover:bg-card/80'
              }`}
            >
              <span className="text-4xl">{gift.emoji}</span>
              <span className="text-xs font-medium text-foreground">{gift.name}</span>
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={12} className="text-primary" />
                <span className="font-['Orbitron'] text-xs font-bold text-primary">
                  {gift.price}
                </span>
              </div>
            </button>
          ))}
        </div>

        {selectedGift && (
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedGift.emoji}</span>
                <div>
                  <p className="font-semibold">{selectedGift.name}</p>
                  <div className="flex items-center gap-1">
                    <Icon name="Coins" size={14} className="text-primary" />
                    <span className="font-['Orbitron'] text-sm font-bold text-primary">
                      {selectedGift.price}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleSendGift}
                disabled={balance < selectedGift.price}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-['Orbitron'] font-bold"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}