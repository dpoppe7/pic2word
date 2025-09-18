// Custom hook in react: 
// functions that use built-in hooks (like useSate, useEffect)
// to encapsulate and reuse stateful logic across components.
import { useState, useEffect } from "react";
import { UserStats, UserInfo, GameState } from "../types";
import { CHALLENGES, GAME_CONFIG } from "../data";

export const useGame = () => {
    const [userStats, setUserStats] = useState<UserStats>({
        score: 0,
        diamonds: 10
    });

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: null,
        loading: true
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/init'); //Reddit endpoint that gives the user info
                const data = await response.json();
                
                setUserInfo({ // update state with parsed data
                    username: data.username,
                    loading: false
                });
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                
                setUserInfo({
                    username: null,
                    loading: false
                });
            }
        };
        void fetchUserInfo();
    }, []);

    const [gameState, setGameState] = useState<GameState>({
        currentChallenge: CHALLENGES[0] || {id: 0, answer: "ERROR", images: [], hint: "No challenges found", letters: []},
        userAnswer: "",
        selectedLetters: [],
        gameWon: false,
        showHint: false,
    });

    //function to add letters
    const addLetter = (letter: string) => {
        setGameState(prev => ({ //"take the previous state"
            ...prev, //"keep everything else the same"
            userAnswer: prev.userAnswer + letter
        }))
    }

    const checkAnswer = () => {
        if (gameState.userAnswer == gameState.currentChallenge.answer) {
            setUserStats(prev => ({
                ...prev,
                score: prev.score + GAME_CONFIG.POINTS_PER_WIN,
                diamonds: prev.diamonds + GAME_CONFIG.DIAMONDS_PER_WIN
            }));
            setGameState(prev => ({
                ...prev,
                gameWon: true
            }))
        }
        else {
            console.log("Incorrect andser");
        }
    }

    const resetGame = () => {
        setGameState(prev => ({
            ...prev,
            userAnswer: "",
            selectedLetters: [],
            gameWon: false,
            showHint: false
        }));
    };

    const deleteLetter = () => {
        setGameState(prev => ({
            ...prev,
            userAnswer: prev.userAnswer.slice(0, -1) //removes las character
        }));
    };
    
    return {
        userStats,
        userInfo,
        gameState,
        addLetter,
        checkAnswer,
        resetGame,
        deleteLetter
    };
};