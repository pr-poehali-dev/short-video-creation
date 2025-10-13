import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function UploadVideo() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) return;
    
    setIsUploading(true);
    
    setTimeout(() => {
      setIsUploading(false);
      setVideoFile(null);
      setVideoPreview('');
      setDescription('');
    }, 2000);
  };

  const handleCancel = () => {
    setVideoFile(null);
    setVideoPreview('');
    setDescription('');
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent">
            <Icon name="Upload" size={40} className="text-white" />
          </div>
          <h2 className="mb-2 font-['Orbitron'] text-xl md:text-2xl font-bold text-foreground">
            Upload Video
          </h2>
          <p className="text-sm text-muted-foreground">
            Share your creative content with the world
          </p>
        </div>

        {!videoPreview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card/30 p-12 text-center backdrop-blur-sm transition-all hover:border-primary hover:bg-card/50"
          >
            <Icon name="Video" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="mb-2 font-['Orbitron'] text-sm font-semibold text-foreground">
              Click to select video
            </p>
            <p className="text-xs text-muted-foreground">
              MP4, WebM, or MOV (max 100MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-background">
              <video
                src={videoPreview}
                className="h-full w-full object-cover"
                controls
              />
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder="Add a description... (use #hashtags)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] resize-none rounded-2xl border-border bg-card/50 font-['Inter'] text-sm backdrop-blur-sm focus:border-primary"
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 rounded-2xl border-border font-['Orbitron'] text-sm hover:bg-card/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent font-['Orbitron'] text-sm font-bold text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Publish
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border/50 bg-card/20 p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <Icon name="Info" size={18} className="text-primary" />
            <h3 className="font-['Orbitron'] text-sm font-semibold text-foreground">
              Tips for best results
            </h3>
          </div>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Use vertical 9:16 format for better viewing</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary">•</span>
              <span>Add engaging hashtags to reach more people</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">•</span>
              <span>Keep videos under 60 seconds for maximum impact</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
