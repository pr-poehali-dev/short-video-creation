import { useState } from 'react';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface Gift {
  id: number;
  name: string;
  emoji: string;
  price: number;
  category: 'basic' | 'premium' | 'epic' | 'legendary';
  animation?: string;
}

interface GiftsShopProps {
  open: boolean;
  onClose: () => void;
  onSendGift: (gift: Gift) => void;
  recipientName?: string;
}

const mockGifts: Gift[] = [
  { id: 1, name: 'Сердце', emoji: '❤️', price: 10, category: 'basic' },
  { id: 2, name: 'Роза', emoji: '🌹', price: 50, category: 'basic' },
  { id: 3, name: 'Звезда', emoji: '⭐', price: 100, category: 'basic' },
  { id: 4, name: 'Огонь', emoji: '🔥', price: 150, category: 'premium' },
  { id: 5, name: 'Бриллиант', emoji: '💎', price: 500, category: 'premium' },
  { id: 6, name: 'Корона', emoji: '👑', price: 1000, category: 'premium' },
  { id: 7, name: 'Ракета', emoji: '🚀', price: 2000, category: 'epic' },
  { id: 8, name: 'Единорог', emoji: '🦄', price: 3000, category: 'epic' },
  { id: 9, name: 'Дракон', emoji: '🐉', price: 5000, category: 'legendary' },
  { id: 10, name: 'Трофей', emoji: '🏆', price: 10000, category: 'legendary' },
];

const categoryColors = {
  basic: 'from-gray-400 to-gray-500',
  premium: 'from-blue-400 to-purple-500',
  epic: 'from-purple-500 to-pink-500',
  legendary: 'from-yellow-400 to-orange-500',
};

const categoryLabels = {
  basic: 'Базовые',
  premium: 'Премиум',
  epic: 'Эпические',
  legendary: 'Легендарные',
};

export default function GiftsShop({ open, onClose, onSendGift, recipientName }: GiftsShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userCoins] = useState(5000);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'basic', label: 'Базовые' },
    { id: 'premium', label: 'Премиум' },
    { id: 'epic', label: 'Эпические' },
    { id: 'legendary', label: 'Легендарные' },
  ];

  const filteredGifts = mockGifts.filter(
    (gift) => selectedCategory === 'all' || gift.category === selectedCategory
  );

  const handleSendGift = (gift: Gift) => {
    if (userCoins >= gift.price) {
      setSelectedGift(gift);
      setTimeout(() => {
        onSendGift(gift);
        setSelectedGift(null);
        onClose();
      }, 1000);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl border-t border-border bg-background">
        <SheetHeader className="mb-4">
          <SheetTitle className="font-['Orbitron'] text-xl">
            Магазин подарков
          </SheetTitle>
          {recipientName && (
            <p className="text-sm text-muted-foreground">
              Отправить подарок для {recipientName}
            </p>
          )}
        </SheetHeader>

        <div className="mb-4 rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Wallet" size={24} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Ваш баланс</p>
                <div className="flex items-center gap-1">
                  <Icon name="Coins" size={16} className="text-yellow-500" />
                  <span className="font-['Orbitron'] text-lg font-bold text-foreground">
                    {userCoins}
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold hover:opacity-90 transition-opacity">
              <Icon name="Plus" size={16} />
              Пополнить
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'bg-card/50 border border-border text-muted-foreground hover:border-primary'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="overflow-y-auto scrollbar-hide" style={{ height: 'calc(85vh - 280px)' }}>
          <div className="grid grid-cols-3 gap-3 pb-6">
            {filteredGifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => handleSendGift(gift)}
                disabled={userCoins < gift.price}
                className={`relative rounded-2xl border p-4 transition-all ${
                  userCoins < gift.price
                    ? 'border-border bg-card/20 opacity-50 cursor-not-allowed'
                    : 'border-border bg-card/50 hover:border-primary hover:scale-105 active:scale-95'
                } ${selectedGift?.id === gift.id ? 'animate-bounce' : ''}`}
              >
                <div
                  className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-gradient-to-r ${
                    categoryColors[gift.category]
                  } text-[10px] font-bold text-white`}
                >
                  {categoryLabels[gift.category]}
                </div>

                <div className="text-4xl mb-2">{gift.emoji}</div>
                <p className="text-xs font-medium text-foreground mb-1 truncate">
                  {gift.name}
                </p>
                <div className="flex items-center justify-center gap-1">
                  <Icon name="Coins" size={12} className="text-yellow-500" />
                  <span className="text-xs font-bold text-foreground">{gift.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} className="text-primary" />
            <span>Подарки появятся в прямом эфире с анимацией</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
