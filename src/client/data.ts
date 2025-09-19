import { Challenge } from "./types";

// stores all game content, will be hardcoded for now later API
export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    answer: 'BEACH',
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1544336527-5bd1d45aef1e?w=300&h=300&fit=crop"
    ],
    hint: "A sandy place by the water",
    letters: ['B', 'E', 'A', 'C', 'H', 'S', 'U', 'N', 'D', 'O', 'W', 'T']
  },
  {
    id: 2,
    answer: 'MUSIC',
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    ],
    hint: "Sounds and melodies that create harmony",
    letters: ['M', 'U', 'S', 'I', 'C', 'N', 'O', 'T', 'E', 'L', 'R', 'P']
  },
  {
    id: 3,
    answer: 'COFFEE',
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&h=300&fit=crop"
    ],
    hint: "Popular morning drink that gives energy",
    letters: ['C', 'O', 'F', 'F', 'E', 'E', 'T', 'A', 'R', 'N', 'L', 'M']
  },
  {
    id: 4,
    answer: 'FLOWER',
    images: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=300&h=300&fit=crop"
    ],
    hint: "Beautiful bloom found in gardens",
    letters: ['F', 'L', 'O', 'W', 'E', 'R', 'T', 'A', 'N', 'S', 'M', 'P']
  },
  {
    id: 5,
    answer: 'SUNSET',
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=300&fit=crop"
    ],
    hint: "Beautiful sky colors when day ends",
    letters: ['S', 'U', 'N', 'S', 'E', 'T', 'R', 'A', 'I', 'L', 'O', 'P']
  }
];

export const GAME_CONFIG = {
  POINTS_PER_WIN: 20,
  DIAMONDS_PER_WIN: 3
};