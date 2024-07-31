import { useEffect } from 'react';
import {FaGift, FaSyncAlt, FaUser}  from 'react-icons/fa'

const Referral = () => {

  useEffect(() => {
    // Ensure the Telegram WebApp is ready
    const webApp = window.Telegram.WebApp;
    webApp.ready();
  }, []);

  const handleInvite = () => {
    const inviteText = `https://t.me/bitcoinfansbot

                          Join the revolution, and start earning right away`;
    navigator.clipboard.writeText(inviteText).then(() => {
      
      console.log('Invite text copied to clipboard');

      // Minimize the Web App
      const webApp = window.Telegram.WebApp;
      webApp.close();

      // Open the forward screen
      webApp.switchInlineQuery(inviteText);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="playArea relative z-20 bg-[#0040C2] text-white rounded-t-[50px] w-full col-span-4 border-t-[5px] border-[#F8922A] p-1 px-2">
      
      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold text-center mb-2">Invite friends!</h1>
        <p className="text-center text-gray-300">You and your friend will receive bonuses</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-[#365ACB] rounded-lg p-4 flex items-center">
          <FaGift className='text-[#F8922A] text-xl mr-4'/>
          <div>
            <h2 className="font-semibold">Invite a friend</h2>
            <p className="text-yellow-400 flex items-center">
              <span className="bg-yellow-400 rounded-full h-2 w-2 mr-2"></span>
              <span className="text-white"><span className='text-[#F8922A] font-semibold'>+5,000</span> for you and your friend</span>
            </p>
          </div>
        </div>

        <div className="bg-[#365ACB] rounded-lg p-4 flex items-center">
          <FaGift className='text-[#F8922A] mr-4 text-3xl'/>
          <div>
            <h2 className="font-semibold">Invite a friend with Telegram Premium</h2>
            <p className="text-yellow-400 flex items-center">
              <span className="bg-yellow-400 rounded-full h-2 w-2 mr-2"></span>
              <span className="text-white"><span className='text-[#F8922A] font-semibold'>+25,000</span> for you and your friend</span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <a href="#" className="text-blue-500 font-semibold">More bonuses</a>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-semibold">List of your friends (2)</h2>
        <FaSyncAlt  className='text-xl mr-2'/>
      </div>

      <div className="space-y-4 mb-8">
        {['Vihanga', 'Farhan Shahid'].map((friend, index) => (
          <div key={index} className="bg-[#365ACB] rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaUser className='text-[#F8922A] mr-4'/>
              <div>
                <h3 className="font-semibold">{friend}</h3>
                <p className="text-gray-400 text-sm flex items-center">
                  Silver • <span className="text-yellow-400 mx-1">0</span> (6.86K)
                </p>
              </div>
            </div>
            <div className="text-yellow-400 font-semibold">+25K</div>
          </div>
        ))}
      </div>

      <button className="bg-[#F8922A] text-white w-full py-3 rounded-full font-semibold"
              onClick={handleInvite}
      >
        Invite a friend
      </button>

      
    </div>
  );
};

export default Referral;