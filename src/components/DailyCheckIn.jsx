
import {  FaCalendarAlt,  FaDollarSign } from 'react-icons/fa';

const DailyCheckIn = () => {
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

  return (
    <div className="flex flex-col items-center p-4 text-white">
      <div className=" p-4 mb-4">
        <FaCalendarAlt size={40} className="text-[#F8922A]" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Daily reward</h2>
      <p className="text-center mb-4">Win coins for logging into the game daily without skipping</p>
      <div className="grid grid-cols-4 gap-2 w-full mb-4">
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              day.active ? 'bg-green-500' : 'bg-[#365ACB]'
            }`}
          >
            <span className="text">Day {day.day}</span>
            <FaDollarSign className="text-yellow-400" />
            <span className="text">{day.reward}</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-[#F8922A] text-white py-2 rounded-lg">
        Claim
      </button>
    </div>
  );
};

export default DailyCheckIn;