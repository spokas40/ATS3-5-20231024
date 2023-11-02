import React, { createContext, useContext, useState, useCallback } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [playerBalance, setPlayerBalance] = useState(100);

    const deductFromWallet = (amount) => {
        setPlayerBalance((prevBalance) => prevBalance - amount);
    };

    const depositToWallet = (amount) => {
        setPlayerBalance((prevBalance) => prevBalance + amount);
    };

    return (
        <WalletContext.Provider value={{ playerBalance, setPlayerBalance, deductFromWallet, depositToWallet }}>
            {children}
        </WalletContext.Provider>
    );
};


export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
