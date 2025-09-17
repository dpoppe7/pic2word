// types are like blueprints or contracts. Types define what shape the data should have
// Types prevent bugs by ensuring data has the right structure

export type Screen = 'menu' | 'game' | 'leaderboard' | 'tutorial';

export interface Challenge {
    id: number;
    answer: string;
    images: string[];
    hint: string;
}

export interface UserStats {
    score: number;
    diamonds: number;
}

export interface GameState {
    currentChallenge: Challenge;
    userAnswer: string;
    selectedLetterd: number[];
    gameWon: boolean;
    showHint: boolean;
}