import { navigateTo } from '@devvit/web/client';
//import { useCounter } from './hooks/useCounter';
import { useGame } from './hooks/useGame';
import { GAME_CONFIG } from './data';

export const App = () => {
  const { userStats, userInfo, gameState, addLetter, checkAnswer } = useGame();

  //const { count, username, loading, increment, decrement } = useCounter();
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-4">
      <img className="object-contain w-1/2 max-w-[250px] mx-auto" src="/snoo.png" alt="Snoo" />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold text-center text-gray-900 ">
          {userInfo.username ? `Hey ${userInfo.username} 👋` : ''}
        </h1>
      </div>

      {/* Answer */}
      <div className="flex items-center justify-center mt-5">
        <div className='flex space-x-2'>
          {Array.from({ length: gameState.currentChallenge.answer.length }).map((_, index) => (
            <div
              key={index}
              className='w-12 h-12 border-2 border-white rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-md'
            >

            </div>
          ))}
        </div>
      </div>

      <span className="text-[1.8em] font-medium mx-5 min-w-[50px] text-center leading-none text-gray-900">
        Answer: "{gameState.userAnswer}" | 💎 {userStats.diamonds}
      </span>
       
      {/* letters */}
      <div className="mt-8">
          <h3 className="text-white text-center">Available Letters:</h3>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {gameState.currentChallenge.letters.map((letter, index) => (
              <button
                key={index}
                onClick={() => addLetter(letter)}
                className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200"
              >
                {letter}
              </button>
            ))}
          </div>
      </div>

      <div>
        <button
          onClick={checkAnswer}
          className='mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl'
        >
          Submit Answer
        </button>
      </div>

      {/* Win */}
      {gameState.gameWon && (
        <div className="mt-6 bg-green-500 text-white p-4 rounded-xl text-center">
          <h2 className="text-2xl font-bold">🎉 Correct!</h2>
          <p>You earned {GAME_CONFIG.DIAMONDS_PER_WIN} diamonds and {GAME_CONFIG.POINTS_PER_WIN} points!</p>
        </div>
      )}


      <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 text-[0.8em] text-gray-600">
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://developers.reddit.com/docs')}
        >
          Docs
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
        >
          r/Devvit
        </button>
        <span className="text-gray-300">|</span>
        <button
          className="cursor-pointer"
          onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}
        >
          Discord
        </button>
      </footer>
    </div>
  );
};
