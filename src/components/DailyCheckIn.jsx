import { useState } from 'react';
import GlowingBtcCoin from './GlowingBtcCoin';
import { btcCoin } from '../assets';
import CoinAnimation from './CoinAnimation';
import {  FaCalendarAlt } from 'react-icons/fa';

const DailyCheckIn = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const days = [
        { day: 1, reward: 500, active: true },
        { day: 2, reward: '1K', active: true },
        { day: 3, reward: '2.5K', active: false },
        { day: 4, reward: '5K', active: false },
        { day: 5, reward: '15K', active: false },
        { day: 6, reward: '25K', active: false },
        { day: 7, reward: '100K', active: false },
        { day: 8, reward: '500K', active: false },
        { day: 9, reward: '1M', active: false },
        { day: 10, reward: '5M', active: false },
    ];
    
    const handleClaim = () => {
        setIsAnimating(true);
    };

    return (
        <div className="flex flex-col items-center text-white">
        <div className=" p-2 mb-4">
            <FaCalendarAlt size={40} className="text-[#F8922A]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Daily Reward</h2>
        <p className="text-center mb-4">Win coins for logging into the game daily without skipping</p>
        <div className="grid grid-cols-4 gap-2 w-full mb-4">
            {days.map((day, index) => (
            <div 
                key={index} 
                className={`flex flex-col justify-center items-center p-2 rounded-lg ${
                day.active ? 'bg-green-500' : 'bg-[#365ACB]'
                }`}
            >
                <span className="text">Day {day.day}</span>
                <GlowingBtcCoin width={15} height={15} src= {btcCoin}/>
                <span className="text">{day.reward}</span>
            </div>
            ))}
        </div>
        <button 
            onClick={handleClaim}
            className="w-full bg-[#F8922A] text-white py-2 rounded-lg"
        >
            Claim
        </button>

        <CoinAnimation 
            isAnimating={isAnimating} 
            onAnimationComplete={() => setIsAnimating(false)} 
      />
        </div>
    );
    };

export default DailyCheckIn;