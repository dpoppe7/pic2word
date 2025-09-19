import { useState, useEffect } from "react";
import { UserStats, UserInfo, GameState } from "../types";
import { CHALLENGES, GAME_CONFIG } from "../data";

export const useGame = () => {
  // User stats and info
  const [userStats, setUserStats] = useState<UserStats>({
    score: 0,
    diamonds: 10
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: null,
    loading: true
  });

  // Game state
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: CHALLENGES[0] || {id: 0, answer: "ERROR", images: [], hint: "No challenges found", letters: []},
    userAnswer: "",
    selectedLetters: [],
    gameWon: false,
    showHint: false,
  });

  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  // Fetch user info from Reddit API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/init');
        const data = await response.json();
        setUserInfo({
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

  // Get today's challenge based on date
  const getTodaysChallenge = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const challengeIndex = dayOfYear % CHALLENGES.length;
    return CHALLENGES[challengeIndex] || CHALLENGES[0];
  };

  // Load daily challenge
  const loadDailyChallenge = () => {
    const dailyChallenge = getTodaysChallenge();
    setGameState(prev => ({
      ...prev,
      currentChallenge: dailyChallenge!,
      userAnswer: "",
      selectedLetters: [],
      gameWon: false,
      showHint: false
    }));
  };

  // Check if user already played today (simplified - in real app, store in Reddit data)
  const checkDailyStatus = () => {
    const today = new Date().toDateString();
    const lastPlayed = localStorage.getItem('lastPlayedDate'); // Temporary - use Reddit storage later
    setHasPlayedToday(lastPlayed === today);
  };

  // Initialize daily challenge on load
  useEffect(() => {
    loadDailyChallenge();
    checkDailyStatus();
  }, []);

  // Game actions
  const addLetter = (letter: string) => {
    setGameState(prev => {
      if (prev.userAnswer.length >= prev.currentChallenge.answer.length) {
        return prev;
      }
      return {
        ...prev,
        userAnswer: prev.userAnswer + letter
      };
    });
  };

  const deleteLetter = () => {
    setGameState(prev => ({
      ...prev,
      userAnswer: prev.userAnswer.slice(0, -1)
    }));
  };

  const checkAnswer = () => {
    if (gameState.userAnswer === gameState.currentChallenge.answer) {
      setGameState(prev => ({ ...prev, gameWon: true }));
      setUserStats(prev => ({
        score: prev.score + GAME_CONFIG.POINTS_PER_WIN,
        diamonds: prev.diamonds + GAME_CONFIG.DIAMONDS_PER_WIN
      }));

      // Mark as played today
      const today = new Date().toDateString();
      localStorage.setItem('lastPlayedDate', today);
      setHasPlayedToday(true);

      console.log('🎉 Daily challenge completed!');
    } else {
      console.log("❌ Try again!");
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      userAnswer: "",
      selectedLetters: [],
      gameWon: false,
      showHint: false
    }));
  };

  // Buy hint function
  const buyHint = () => {
    if (userStats.diamonds >= 1 && !gameState.showHint) {
      setUserStats(prev => ({ ...prev, diamonds: prev.diamonds - 1 }));
      setGameState(prev => ({ ...prev, showHint: true }));
    }
  };

  return {
    userStats,
    userInfo,
    gameState,
    addLetter,
    checkAnswer,
    resetGame,
    deleteLetter,
    buyHint,
    hasPlayedToday,
    loadDailyChallenge
  };
};