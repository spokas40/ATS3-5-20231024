import React, { useState } from 'react';
import useGameActions from '../hooks/useGameActions.js';
import {useWallet} from "../WalletProvider.js";

const BusinessBoard = ({ playerBalance }) => {
    const { buyBusiness: gameBuyBusiness, sellBusiness: gameSellBusiness, ownedBusinesses } = useGameActions();
    const [currentBusiness, setCurrentBusiness] = useState(null);
    const { balance, deductFromWallet, depositToBank } = useWallet();


    const [businessData, setBusinessData] = useState([
        {id:1,
            cellValue: 2, // langelio reikšmė žaidimo lentoje
           name: 'Seaport', // pavadinimas
           description: 'Passenger and cargo transportation', // Verslo aprašymas
           buyPrice: 1000, // pirkimo kaina
           sellPrice: 800, // pardavimo kaina
           taxToTheTreasury: 1}, // mokestis iždui
        // kitos savybės, jei reikia
        {id:2,
            cellValue: 3, // langelio reikšmė žaidimo lentoje
            name: 'Railway',
            description: 'Passenger and cargo transportation', // Verslo aprašymas
            buyPrice: 1000, // pirkimo kaina
            sellPrice: 800, // pardavimo kaina
            taxToTheTreasury: 1}, // mokestis iždui
        // kitos savybės, jei reikia
        {id:3,
            cellValue: 4, // langelio reikšmė žaidimo lentoje
            name: 'Warehouse',
            description: 'Wholesale of products and raw materials', // Verslo aprašymas
            buyPrice: 1000, // pirkimo kaina
            sellPrice: 800, // pardavimo kaina
            taxToTheTreasury: 1} // mokestis iždui
        // kitos savybės, jei reikia
    ]);

    const handleBuyBusiness = (business) => {
        if (playerBalance >= business.buyPrice) {
            deductFromWallet(business.buyPrice);
            depositToBank(business.buyPrice);
            setCurrentBusiness({
                ...businessData,
                owned: true
            });
            // atnaujinamas sąrašas su nuosavybe, jei taikoma
        } else {
            // pranešimas žaidėjui, dėl lėšų nepakankamumo
        }
    };

    const handleSellBusiness = () => {
        depositToBank(currentBusiness.sellPrice);
        setCurrentBusiness({
            ...businessData,
            owned: false
        });
        // atnaujinamas sąrašą su nuosavybe, jei taikoma
    };

    return (
        <div>
            {currentBusiness ? (
                <>
                    <p>The business is sold for: {currentBusiness.value} Travelons.</p>
                    <p>The business owner pays {currentBusiness.feePercentage}% of the income for the guests.</p>
                    {currentBusiness.owned ? (
                        <button onClick={() => handleSellBusiness(currentBusiness.value)}>I want to sell the business</button>
                    ) : (
                        <button onClick={() => handleBuyBusiness(currentBusiness.value)}>Buy this business</button>
                    )}
                </>
            ) : <p>Select a business to view details.</p>}
        </div>
    );
}

export default BusinessBoard;