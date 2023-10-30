import React, { createContext, useContext, useState, useCallback } from 'react';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [playerBalance, setPlayerBalance] = useState(100); // keiskite pradinę reikšmę pagal jūsų poreikius

    const deductFromWallet = useCallback((amount) => {
        const newBalance = playerBalance - amount;
        setPlayerBalance(newBalance);
    }, [playerBalance]);

    return (
        <WalletContext.Provider value={{ playerBalance, setPlayerBalance, deductFromWallet }}>
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
