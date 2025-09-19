import { useState } from 'react';
import { navigateTo } from '@devvit/web/client';
import { useGame } from './hooks/useGame';
import { Screen } from './types';

export const App = () => {
  const { 
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
  } = useGame();
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  // Get today's date for display
  const getTodayString = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Menu Screen
  if (currentScreen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-800 flex flex-col justify-center items-center">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Pic2Word</h1>
          <p className="text-xl text-purple-200">Daily puzzles & community creations</p>
          <p className="text-purple-300 mt-2">
            {userInfo.username ? `Welcome, ${userInfo.username}! 👋` : 'Loading...'}
          </p>
          <p className="text-purple-400 text-sm mt-2">{getTodayString()}</p>
        </div>

        <div className="flex items-center justify-center mb-8 bg-white/10 backdrop-blur-md rounded-xl p-4">
          <span className="text-cyan-300 mr-2">💎</span>
          <span className="text-white font-semibold">{userStats.diamonds} Diamonds</span>
          <span className="text-yellow-300 ml-6 mr-2">🏆</span>
          <span className="text-white font-semibold">{userStats.score} Points</span>
        </div>

        <div className="space-y-4 w-full max-w-sm px-6">
          <button 
            onClick={() => setCurrentScreen('game')}
            className={`w-full font-bold py-4 px-6 rounded-xl transition-colors text-lg relative ${
              hasPlayedToday 
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            disabled={hasPlayedToday}
          >
            <span className="text-2xl mr-2">🌅</span>
            {hasPlayedToday ? 'Daily Challenge Completed!' : "Today's Challenge"}
            {hasPlayedToday && (
              <div className="absolute top-2 right-2">
                <span className="text-green-300 text-xl">✅</span>
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setCurrentScreen('create')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            <span className="text-xl mr-2">➕</span>
            Create Puzzle
          </button>
          
          <button 
            onClick={() => navigateTo('https://www.reddit.com/r/pic2word')} // Replace with actual subreddit
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            <span className="text-xl mr-2">🧩</span>
            Community Puzzles
          </button>
          
          <button 
            onClick={() => setCurrentScreen('leaderboard')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            <span className="text-xl mr-2">🏆</span>
            Leaderboard
          </button>
        </div>
      </div>
    );
  }

  // Game Screen (Daily Challenge)
  if (currentScreen === 'game') {
    return (
      <div className="flex relative flex-col justify-center items-center min-h-screen gap-4 bg-gradient-to-br from-blue-600 to-purple-800">
        {/* Back Button */}
        <button 
          onClick={() => setCurrentScreen('menu')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-xl text-white font-bold"
        >
          ← Menu
        </button>

        {/* Challenge Info */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-white">Daily Challenge</h2>
          <p className="text-purple-200">Challenge #{gameState.currentChallenge.id}</p>
        </div>

        {/* 4 Images Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-lg mx-auto">
          {gameState.currentChallenge.images.map((image, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-lg">
              <img 
                src={image} 
                alt={`Clue ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hint */}
        {gameState.showHint && (
          <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-xl mx-4 max-w-sm">
            <p className="text-yellow-800 font-medium">{gameState.currentChallenge.hint}</p>
          </div>
        )}

        {/* Answer Slots */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {Array.from({ length: gameState.currentChallenge.answer.length }).map((_, index) => (
              <div 
                key={index} 
                className="w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-md"
              >
                <span className="text-white text-xl font-bold">
                  {gameState.userAnswer[index] || ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Display */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-cyan-300">💎 {userStats.diamonds}</span>
          <span className="text-yellow-300">🏆 {userStats.score}</span>
        </div>

        {/* Letters */}
        <div className="max-w-sm mx-auto mb-6">
          <div className="grid grid-cols-4 gap-2">
            {gameState.currentChallenge.letters.map((letter, index) => (
              <button
                key={index}
                onClick={() => addLetter(letter)}
                className="h-12 rounded-lg font-bold text-lg transition-colors bg-white text-gray-800 hover:bg-gray-100"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={deleteLetter}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl"
          >
            Delete
          </button>
          <button
            onClick={buyHint}
            disabled={gameState.showHint || userStats.diamonds < 1}
            className={`font-bold py-3 px-4 rounded-xl ${
              gameState.showHint 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : userStats.diamonds >= 1
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
          >
            💡 {gameState.showHint ? 'Used' : '1💎'}
          </button>
          <button
            onClick={checkAnswer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl"
          >
            Submit
          </button>
        </div>

        {/* Win Message */}
        {gameState.gameWon && (
          <div className="bg-green-500 text-white p-6 rounded-xl text-center max-w-sm">
            <h3 className="text-2xl font-bold mb-2">🎉 Daily Challenge Complete!</h3>
            <p className="mb-4">You earned 3 diamonds and 20 points!</p>
            <p className="mb-4 text-green-100">Come back tomorrow for a new challenge!</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentScreen('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Puzzle
              </button>
              <button
                onClick={() => setCurrentScreen('menu')}
                className="bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-gray-100"
              >
                Menu
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Create Screen (placeholder for now)
  if (currentScreen === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 flex flex-col justify-center items-center">
        <button 
          onClick={() => setCurrentScreen('menu')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-xl text-white font-bold"
        >
          ← Menu
        </button>
        
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Create Puzzle</h2>
          <p className="text-purple-200 text-xl">Coming Soon!</p>
          <p className="text-purple-300 mt-4">Create puzzles that post to r/pic2word</p>
        </div>
      </div>
    );
  }

  // Leaderboard Screen (placeholder)
  if (currentScreen === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-orange-800 flex flex-col justify-center items-center">
        <button 
          onClick={() => setCurrentScreen('menu')}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md hover:bg-white/30 p-3 rounded-xl text-white font-bold"
        >
          ← Menu
        </button>
        
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Daily Leaderboard</h2>
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="text-white space-y-2">
              <p className="mb-4 text-yellow-200">Today's Top Solvers:</p>
              <p>🥇 Player 1 - Completed in 2:30</p>
              <p>🥈 Player 2 - Completed in 3:15</p>
              <p>🥉 Player 3 - Completed in 4:02</p>
              <hr className="my-4 border-white/20" />
              <p className="text-yellow-300 font-bold">
                🏆 You - {userStats.score} total points
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};