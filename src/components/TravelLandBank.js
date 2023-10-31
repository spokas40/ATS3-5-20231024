import React, { useState, useContext, createContext } from "react";

const BankContext = createContext();

function TravelLandBank({ children }) {
    const [bankBalance, setBankBalance] = useState(0);

    // Funkcija skirta pridėti Travelonus į banką
    const depositToBank = (amount) => {
        setBankBalance(prevBalance => prevBalance + amount);
    }

    return (
        <BankContext.Provider value={{ bankBalance, depositToBank }}>
            <div className="travelLandBank">
                TravelLand Bank: {bankBalance} Travelons
            </div>
            {children}
        </BankContext.Provider>
    );
}

export const useBank = () => {
    const context = useContext(BankContext);
    if (!context) {
        throw new Error("useBank must be used within TravelLandBank");
    }
    return context;
};

export default TravelLandBank;
