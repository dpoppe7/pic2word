import { Challenge } from "./types";

// stores all game content, will be hardcoded for now later API
export const CHALLENGES : Challenge[] = [
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
    }
];

export const GAME_CONFIG = {
  POINTS_PER_WIN: 20,
  DIAMONDS_PER_WIN: 3
};