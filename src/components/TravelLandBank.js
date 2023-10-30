import React, { useState } from "react";

let globalBankBalance = 0;

const internalDepositToBank = (amount) => {
    globalBankBalance += amount;
}

function TravelLandBank({ balance }) {
    const [bankBalance, setBankBalance] = useState(globalBankBalance);

    // Funkcija skirta pridėti Travelonus į banką
    const addToBank = (amount) => {
        setBankBalance(prevBalance => prevBalance + amount);
    }

    return (
        <div className="travelLandBank">
            TravelLand Bank: {balance} Travelons
        </div>
    );
}

export { internalDepositToBank as depositToBank };
export default TravelLandBank;
