export interface Video {
  id: number;
  author: string;
  authorAvatar: string;
  likes: number;
  comments: number;
  shares: number;
  videoUrl: string;
  description: string;
}

export const mockVideos: Video[] = [
  {
    id: 1,
    author: 'CyberCreator',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/fb14cd1e-e818-437f-8c4a-78714db04196.jpg',
    likes: 12500,
    comments: 436,
    shares: 89,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: '🚀 Future vibes only! Check out this tech aesthetic 💜 #cyberpunk #techstyle #future',
  },
  {
    id: 2,
    author: 'NeonDancer',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/f6887c05-c23f-48ba-9c37-f82ecfc71348.jpg',
    likes: 24800,
    comments: 892,
    shares: 156,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Dancing through the neon lights ✨ Pure energy! #dance #neon #vibes',
  },
  {
    id: 3,
    author: 'TechBeats',
    authorAvatar: 'https://cdn.poehali.dev/projects/00d5c065-a0cf-4f74-bc8f-bc3cb47dc2bc/files/b7be10cb-cafa-4dee-b9f7-6f4194b5c3c5.jpg',
    likes: 18900,
    comments: 621,
    shares: 134,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Electronic music meets visual art 🎵 What do you think? #music #electronic #art',
  },
];
