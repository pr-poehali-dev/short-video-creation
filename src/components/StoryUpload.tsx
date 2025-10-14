import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { authService } from '@/lib/auth';

interface StoryUploadProps {
  onClose: () => void;
  onUploadSuccess: () => void;
  onLoginRequired: () => void;
}

const STORIES_API = 'https://functions.poehali.dev/28f82b7d-ad37-41a0-b378-05240f106feb';

export default function StoryUpload({ onClose, onUploadSuccess, onLoginRequired }: StoryUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Размер файла не должен превышать 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const user = authService.getCurrentUser();
    if (!user) {
      onLoginRequired();
      return;
    }

    if (!selectedImage) return;

    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch(STORIES_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id,
        },
        body: JSON.stringify({
          username: user.username,
          image_url: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      onUploadSuccess();
      onClose();
    } catch (err) {
      setError('Не удалось загрузить story. Попробуйте ещё раз.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl border-2 border-primary/20 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-['Orbitron'] text-xl font-bold text-gradient">
            Создать Story
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {!selectedImage ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[9/16] rounded-xl border-2 border-dashed border-primary/30 bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center justify-center gap-3"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Icon name="Plus" size={32} className="text-white" />
              </div>
              <p className="text-foreground/70">Выберите фото</p>
            </button>
          ) : (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full aspect-[9/16] object-cover rounded-xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <Icon name="X" size={16} className="text-white" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {selectedImage && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-secondary to-accent text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Загрузка...
                </span>
              ) : (
                'Опубликовать'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
