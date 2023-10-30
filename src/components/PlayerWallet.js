import React, { useState, useEffect, useCallback } from "react";
import { useWallet } from "../WalletProvider.js";

function PlayerWallet({ balance, onBalanceChange, children }) {
    const { playerBalance, setPlayerBalance, deductFromWallet } = useWallet();

    // Šis efektas reaguoja į išorinius balanso pakeitimus ir atnaujina vietinę būseną
    useEffect(() => {
        setPlayerBalance(balance);
    }, [balance, setPlayerBalance]);

    return (
        <div className="playerWallet">
            {/* Atvaizduojame dabartinį balansą */}
            In the Wallet: {playerBalance} Travelons
            {/* Perduodame `deductFromWallet` funkciją visiems vaikams, kurie yra tinkami React elementai */}
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { deductFromWallet });
                }
                return child;
            })}
        </div>
    );
}

// Eksportuojame PlayerWallet, kad galėtume jį naudoti kitose dalyse programos
export default PlayerWallet;
