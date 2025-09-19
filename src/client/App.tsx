
import { useState } from 'react';
import { navigateTo } from '@devvit/web/client';
import { useGame } from './hooks/useGame';
import { Screen } from './types';

export const App = () => {
  const { userStats, userInfo, gameState, addLetter, checkAnswer, resetGame, deleteLetter } = useGame();
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

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
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            🎮 Play Game
          </button>
          <button 
            onClick={() => setCurrentScreen('create')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            ➕ Create Puzzle
          </button>
          <button 
            onClick={() => setCurrentScreen('leaderboard')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>
    );
  }

  // Game Screen (your existing game with back button)
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

        {/* Game Title */}
        <h2 className="text-3xl font-bold text-white mb-4">Daily Challenge</h2>

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
            onClick={checkAnswer}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl"
          >
            Submit
          </button>
        </div>

        {/* Win Message */}
        {gameState.gameWon && (
          <div className="bg-green-500 text-white p-6 rounded-xl text-center max-w-sm">
            <h3 className="text-2xl font-bold mb-2">🎉 Correct!</h3>
            <p className="mb-4">You earned 3 diamonds and 20 points!</p>
            <div className="flex space-x-2">
              <button
                onClick={resetGame}
                className="bg-white text-green-500 font-bold py-2 px-4 rounded hover:bg-gray-100"
              >
                Play Again
              </button>
              <button
                onClick={() => setCurrentScreen('menu')}
                className="bg-green-700 text-white font-bold py-2 px-4 rounded hover:bg-green-800"
              >
                Menu
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Create Screen (simple placeholder)
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
          <p className="text-purple-300 mt-4">Create your own 4 Pics 1 Word puzzles</p>
        </div>
      </div>
    );
  }

  // Leaderboard Screen (simple placeholder)
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
          <h2 className="text-4xl font-bold text-white mb-4">Leaderboard</h2>
          <p className="text-yellow-200 text-xl">Top Players Coming Soon!</p>
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6">
            <div className="text-white">
              <p className="mb-2">🥇 Player 1 - 1,250 pts</p>
              <p className="mb-2">🥈 Player 2 - 980 pts</p>
              <p className="mb-2">🥉 Player 3 - 750 pts</p>
              <p className="text-yellow-300 font-bold">🏆 You - {userStats.score} pts</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
};
