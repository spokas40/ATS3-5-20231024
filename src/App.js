import React, { useState } from 'react';
import Login from './components/Login.js';
import GameBoard from './components/GameBoard.js';
import PlayerWallet from './components/PlayerWallet.js';
import { WalletProvider } from './WalletProvider.js';
import './App.css';

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [playerBalance, setPlayerBalance] = useState(100);

    const handleBalanceChange = (newBalance) => {
        console.log(newBalance);
    };

    return (
        <WalletProvider>
            <div className="app-container">
                {!gameStarted ? (
                    <Login onStartGame={() => setGameStarted(true)} />
                 ) : (
                    <>
                         <PlayerWallet balance={playerBalance} onBalanceChange={handleBalanceChange}>
                             <GameBoard />
                        </PlayerWallet>
                    </>
                )}
             </div>
        </WalletProvider>
    );
};

export default App;
