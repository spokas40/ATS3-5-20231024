import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/styles.css';
import DiceRoller from './DiceRoller.js';
import CardMover from './CardMover.js';
import BusinessBoard from './BusinessBoard.js';
import horseImage from '../images/horse.png';
import elephantImage from '../images/elephant-on-a-ball.png';
import carriageImage from '../images/carriage.png';
import ballonImage from '../images/ballon.png';
import { calculateNewPosition } from './CardMover.js';
import PlayerWallet from "./PlayerWallet.js";
import TravelLandBank, { useBank } from './TravelLandBank.js';
import BankBalanceDisplay from './BankBalanceDisplay.js';
import { usePlayer } from '../context/PlayerContext.js';
import { useWallet } from "../WalletProvider.js";
import { WalletContext } from '../WalletProvider.js';

const GameBoard = () => {
    console.log('GameBoard component is being rendered');
    const [playerPosition, setPlayerPosition] = useState(0); // Initial player card position
    const [diceValue, setDiceValue] = useState(0);
    const [ownedBusinesses, setOwnedBusinesses] = useState([]);
    const [currentBusiness, setCurrentBusiness] = useState(null);
    const selectedCard = localStorage.getItem('selectedCard');
    const { playerBalance, deductFromWallet, depositToWallet } = useWallet();
    const { depositToBank } = useBank();
    const { currentPlayer, setCurrentPlayer } = usePlayer();


    const handleBackToHome = () => {
        localStorage.removeItem('selectedCard');
        window.location.reload();
    };

    const renderSelectedCardImage = (selectedCard) => {
        const cardStyle = {
            width: '70px',
            height: '50px',
            borderRadius: '25%',
        };

        switch (selectedCard) {
            case 'hors':
                return <img className="cardsPicture" src={horseImage} alt="horse" style={cardStyle} />;
            case 'elephant':
                return <img className="cardsPicture" src={elephantImage} alt="elephant" style={cardStyle} />;
            case 'carriage':
                return <img className="cardsPicture" src={carriageImage} alt="carriage" style={cardStyle} />;
            case 'ballon':
                return <img className="cardsPicture" src={ballonImage} alt="ballon" style={cardStyle} />;
            default:
                return null;
        }
    };

    const handleDiceRollFinish = (diceValue) => {
        const result = calculateNewPosition(playerPosition, diceValue);
        const newPosition = result.position;

        if (result.passedGo) {
            depositToWallet(50); // Pridedame 50 Travelon'ų
        }

        moveCardToNewPosition(newPosition);
    };

    const businessProperties = {
        "2": { name: "Seaport", purchasePrice: 200, tax: 0.2 , sellPrice: 160, ownedBy: null },
        "3": { name: "Railway Station", purchasePrice: 300, tax: 0.3 , sellPrice: 240, ownedBy: null },
        "4": { name: "Warehouse", purchasePrice: 2000, tax: 2, sellPrice: 1600, ownedBy: null },
        "5": { name: "Camping Equipment", purchasePrice: 1000, tax: 1, sellPrice: 800, ownedBy: null },
        "6": { name: "Free space for your ideas", purchasePrice: 1000, tax: 1, sellPrice: 800, ownedBy: null },
        "7": { name: "Museum of History", purchasePrice: 500, tax: 0.5, sellPrice: 400, ownedBy: null },
        "8": { name: "Free space for your ideas", purchasePrice: 1000, tax: 1, sellPrice: 800, ownedBy: null },
        "9": { name: "Goldmine", purchasePrice: 10000, tax: 1, sellPrice: 8000, ownedBy: null },
        "10": { name: "Goldmine", purchasePrice: 1000, tax: 1, sellPrice: 8000, ownedBy: null },
        "11": { name: "Railway Station", purchasePrice: 300, tax: 0.3 , sellPrice: 240, ownedBy: null },
        "12": { name: "Arab Bazar", purchasePrice: 2000, tax: 2 , sellPrice: 1600, ownedBy: null },
        "13": { name: "Seaport", purchasePrice: 200, tax: 0.2 , sellPrice: 160, ownedBy: null },
        "14": { name: "Free space for your ideas", purchasePrice: 1000, tax: 1, sellPrice: 800, ownedBy: null },
        "15": { name: "Repair Shop", purchasePrice: 2000, tax: 2, sellPrice: 1600, ownedBy: null },
        "16": { name: "Free space for your ideas", purchasePrice: 1000, tax: 1, sellPrice: 800, ownedBy: null },
        "17": { name: "Metal Factory", purchasePrice: 500, tax: 0.5, sellPrice: 400, ownedBy: null },

    };

    function handleCardLanding(cellValue) {
        const business = businessProperties[cellValue];
        if (business) {
            if (business.ownedBy === null) {
                // Logika pirkti verslą
            } else if (business.ownedBy === currentPlayer) {
                // Logika parduoti verslą
            } else {
                // Mokėti mokestį verslo savininkui
                deductFromWallet(business.tax);
                depositToBank(business.tax, business.ownedBy); // Čia reikėtų pridėti logiką, kaip pervesti mokestį verslo savininkui
            }
        } else {
            // Esama logika, kuri buvo prieš tai
            switch (cellValue) {
                case "2":
                case "13":
                    // Seaport
                    deductFromWallet(2);
                    depositToBank(2);
                    break;

                case "4":
                    // Warehouse
                    deductFromWallet(20);
                    depositToBank(20);
                    break;

                case "5":
                    // campingEquipment
                    deductFromWallet(10);
                    depositToBank(10);
                    break;

                case "7":
                    // museumOfHistory
                    deductFromWallet(5);
                    depositToBank(5);
                    break;

                case "9":
                    // Goldmine
                    deductFromWallet(10);
                    depositToBank(10);
                    break;

                case "10":
                    // Hotel
                    deductFromWallet(10);
                    depositToBank(10);
                    break;

                case "12":
                    // arabBazar
                    deductFromWallet(20);
                    depositToBank(20);
                    break;

                case "3":
                case "11":
                    // Railway Station
                    deductFromWallet(3);
                    depositToBank(3);
                    break;

                case "15":
                    // remoteWorkshop
                    deductFromWallet(20);
                    depositToBank(20);
                    break;

                case "17":
                    // Metallurgy
                    deductFromWallet(5);
                    depositToBank(5);
                    break;

                default:
                    break;
            }
        }
    }

    const moveCardToNewPosition = (newPosition) => {
        handleCardLanding(newPosition.toString());
        if (newPosition >= 18 && playerPosition < 18) {
            depositToWallet(50); // Pridedame 50 Travelon'ų kai žaidėjas baigia ratą
        }
        setPlayerPosition(newPosition);

        const oldPositionElement = document.querySelector(`[data-value="${playerPosition}"]`);
        if (oldPositionElement) {
            oldPositionElement.innerHTML = '';
        }

        const gameBoardElement = document.querySelector(`[data-value="${newPosition}"]`);

        // Sukuriame naują div elementą, kuriame yra CardMover komponentas
        const cardMoverContainer = document.createElement("div");
        const root = createRoot(cardMoverContainer); // Sukurkite šaknį naudodami createRoot
        root.render(
            <CardMover
                selectedCard={selectedCard}
                diceValue={diceValue}
                currentPosition={newPosition}
                onCardMove={moveCardToNewPosition}
                renderSelectedCardImage={renderSelectedCardImage}
            />
        );



        // Išvalome senąjį turinį žaidimo lentoje ir įterpiame naują kortelės turinį
        gameBoardElement.innerHTML = '';
        gameBoardElement.appendChild(cardMoverContainer);
    };

    return (
        <div className="game-board-container">
            <h2>Game board</h2>
            <div className="game-board">
                <div className="grid">
                    {/* 1st row */}
                    <div className="cell cell-with-border government" data-value="1"></div>
                    <div className="cell cell-with-border seaPort" data-value="2"></div>
                    <div className="cell cell-with-border rialWayStation" data-value="3"></div>
                    <div className="cell cell-with-border warehouse" data-value="4"></div>
                    <div className="cell cell-with-border campingEquipment" data-value="5"></div>
                    <div className="cell cell-with-border" data-value="6"></div>
                    <div className="cell cell-with-border museumOfHistory" data-value="7"></div>

                    {/* 2nd row */}
                    <div className="cell cell-with-border bankBuild" data-value="18"></div>
                    <div className="cell" data-value="100">
                        <BankBalanceDisplay />
                    </div>
                    <div className="cell" data-value="101">
                        <PlayerWallet balance={playerBalance} />
                    </div>
                    <div className="cell" data-value="102">
                        <BusinessBoard
                            playerBalance={playerBalance}
                            deductFromWallet={deductFromWallet}
                            depositToBank={depositToBank}
                            businessType={currentBusiness}
                        />
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell cell-with-border" data-value="8"></div>

                    {/* 3rd row */}
                    <div className="cell cell-with-border metalurgy" data-value="17"></div>
                    <div className="cell" data-value="0"></div>
                    <div className="cell">
                        <div className="cell dice-cell">
                            <DiceRoller onFinish={handleDiceRollFinish} diceValue={diceValue} />
                        </div>
                    </div>
                    <div className="cell">
                    </div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                    <div className="cell cell-with-border goldmine" data-value="9"></div>

                    {/* 4th row */}
                    <div className="cell cell-with-border" data-value="16"></div>
                    <div className="cell cell-with-border repairWorkshop" data-value="15"></div>
                    <div className="cell cell-with-border" data-value="14"></div>
                    <div className="cell cell-with-border seaPort" data-value="13"></div>
                    <div className="cell cell-with-border arab-bazar" data-value="12"></div>
                    <div className="cell cell-with-border rialWayStation" data-value="11"></div>
                    <div className="cell cell-with-border hotel" data-value="10"></div>
                </div>
            </div>
            <button className="backToHome" onClick={handleBackToHome}>Back to Home</button>
        </div>
    );
};

export default GameBoard;