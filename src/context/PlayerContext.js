import React, { createContext, useState, useContext } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState(null);

    return (
        <PlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};