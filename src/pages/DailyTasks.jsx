import { useState } from 'react';
import { FaCalendarAlt, FaCommentDots, FaTwitter, FaPiggyBank } from 'react-icons/fa';
import GlowingBtcCoin from '../components/GlowingBtcCoin';
import { btcCoin } from '../assets';
import ModalAlert from '../components/modalAlert';
import DailyCheckIn from '../components/DailyCheckIn';
const DailyTasks = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="playArea relative z-20 bg-[#0040C2] text-white rounded-t-[50px] w-full col-span-4 border-t-[5px] border-[#F8922A] p-1 px-2">
      <div className="btc-img col-span-4 flex justify-center items-center mt-8">
      <GlowingBtcCoin width={150} height={150} src = {btcCoin}/>
      </div>
      <h1 className="text-2xl mt-8 font-bold mb-4 justify-center flex">Earn more coins</h1>
      
      <div className="space-y-4">
        

      <div className="bg-[#365ACB] rounded-lg p-3">
          <h2 className="font-semibold mb-2">Daily tasks</h2>
          <div 
            className="flex bg-[#055C9D] items-center justify-between rounded-lg p-2 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="flex items-center">
              <FaCalendarAlt className="text-[#F8922A] mr-2" />
              <span className="text-sm">Daily Reward</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#F8922A] mr-1">+6,649,000</span>
            </div>
          </div>
        </div>

        <div className="bg-[#365ACB] rounded-lg p-3">
          <h2 className="font-semibold mb-2">Tasks list</h2>
          <div className="space-y-2">
            <div className="flex bg-[#055C9D] items-center justify-between rounded-lg p-2">
              <div className="flex items-center ">
                <FaCommentDots className= "text-[#F8922A] mr-2" />
                <span className="text-sm">Join our TG channel</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#F8922A] mr-1">+5,000</span>
                {/* <div className="w-5 h-5 bg-[#F8922A] rounded-full flex items-center justify-center">
                  ✓
                </div> */}
              </div>
            </div>
            <div className="flex bg-[#055C9D] items-center justify-between rounded-lg p-2">
              <div className="flex items-center">
                <FaTwitter className="text-[#F8922A] mr-2" />
                <span className="text-sm">Follow our X account</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#F8922A] mr-1">+5,000</span>
                {/* <div className="w-5 h-5 bg-[#F8922A] rounded-full flex items-center justify-center">
                  ✓
                </div> */}
              </div>
            </div>
            <div className="flex bg-[#055C9D] items-center justify-between rounded-lg p-2">
              <div className="flex items-center">
                <FaPiggyBank className="text-[#F8922A] mr-2" />
                <span className="text-sm">Choose your Mission</span>
              </div>
              <div className="flex items-center">
                <span className="text-[#F8922A] mr-1">+5,000</span>
                {/* <div className="w-5 h-5 bg-[#F8922A] rounded-full flex items-center justify-center">
                  ✓
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAlert 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Daily Reward"
      >
        <DailyCheckIn />
      </ModalAlert>
    </div>
    
  );
};

export default DailyTasks;