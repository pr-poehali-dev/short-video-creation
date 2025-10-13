import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export default function ShareSheet({ 
  isOpen, 
  onClose,
  videoUrl,
  videoTitle 
}: ShareSheetProps) {
  
  const shareOptions = [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'Send',
      color: 'from-[#0088cc] to-[#0088cc]',
      action: () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`, '_blank');
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'from-[#25D366] to-[#128C7E]',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(videoTitle + ' ' + videoUrl)}`, '_blank');
      }
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'Twitter',
      color: 'from-[#1DA1F2] to-[#0d8bd9]',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`, '_blank');
      }
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'from-[#1877F2] to-[#0c63d4]',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
      }
    },
    {
      id: 'vk',
      name: 'VK',
      icon: 'Share2',
      color: 'from-[#0077FF] to-[#0056b3]',
      action: () => {
        window.open(`https://vk.com/share.php?url=${encodeURIComponent(videoUrl)}&title=${encodeURIComponent(videoTitle)}`, '_blank');
      }
    },
    {
      id: 'copy',
      name: 'Скопировать ссылку',
      icon: 'Copy',
      color: 'from-primary to-secondary',
      action: () => {
        navigator.clipboard.writeText(videoUrl);
        alert('Ссылка скопирована в буфер обмена!');
        onClose();
      }
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-auto rounded-t-3xl border-t-2 border-border bg-background p-0"
      >
        <SheetHeader className="border-b border-border/50 px-6 py-4">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Share2" size={24} className="text-primary" />
              <span className="font-['Orbitron'] text-lg font-bold">Поделиться видео</span>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-1 transition-colors hover:bg-card/50"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </SheetTitle>
        </SheetHeader>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-all hover:bg-card/30 active:scale-95"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${option.color} shadow-lg transition-transform group-hover:scale-110`}>
                  <Icon name={option.icon} size={24} className="text-white" />
                </div>
                <span className="text-xs font-medium text-foreground">
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border/50 bg-card/20 p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm text-muted-foreground">
                  {videoUrl}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(videoUrl);
                  alert('Ссылка скопирована!');
                }}
                className="rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Копировать
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}