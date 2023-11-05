import React, { useState } from 'react';
import Login from './components/Login.js';
import GameBoard from './components/GameBoard.js';
import TravelLandBank from './components/TravelLandBank.js';
import { WalletProvider } from './WalletProvider.js';
import './App.css';

const App = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [playerBalance, setPlayerBalance] = useState(100);

    const handleBalanceChange = (newBalance) => {
        console.log(newBalance);
    };

    const handleStartGame = () => {
        console.log("Before starting game, gameStarted:", gameStarted);
        setGameStarted(true);
        console.log("After starting game, gameStarted:", gameStarted);
    };

    return (
        <WalletProvider>
            <TravelLandBank>
                <div className="app-container">
                    {!gameStarted ? (
                        <Login onStartGame={handleStartGame} />
                    ) : (
                        <GameBoard />
                    )}
                </div>
            </TravelLandBank>
        </WalletProvider>
    );
};

export default App;
