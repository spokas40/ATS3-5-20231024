import React, { createContext, useContext, useState } from 'react';
import { deductFromWallet } from './components/PlayerWallet.js';
import { depositToBank } from './components/TravelLandBank.js'

export const WalletContext = createContext();
export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(100); // keiskite pradinę reikšmę pagal jūsų poreikius

    return (
        <WalletContext.Provider value={{ balance, setBalance, deductFromWallet, depositToBank }}>
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
export { deductFromWallet, depositToBank };
