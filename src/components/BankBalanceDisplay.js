import React from 'react';
import { useBank } from './TravelLandBank.js';

const BankBalanceDisplay = () => {
    const { bankBalance } = useBank();

    return (
        <div className="travelLandBank">
            TravelLand Bank: {bankBalance} Travelons
        </div>
    );
};

export default BankBalanceDisplay;