import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { bitsBunny, playicon, buyicon, friendsicon, earnicon, airdropicon, usdtLogo, btcLogo, btcCoin } from '../assets';
import { AnimatedTooltip } from './AnimatedToolTip';

const iconData = [
  {
    id: 1,
    name: "btcFans",
    designation: "Enabled",
    image: btcCoin,
  },
  {
    id: 2,
    name: "BTC",
    designation: "Opens at level 15",
    image: btcLogo,
  },
  {
    id: 3,
    name: "usdt",
    designation: "Starts at level 10",
    image: usdtLogo,
  },
];

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="grid grid-cols-4">
      <header className="header col-span-4 sticky top-0 z-0">
        <div className="chooseT flex flex-col justify-center items-center mt-10">
          <div className="choo text-[#0040C2] font-bold text-2xl">Choose Reward Token</div>
          <div className="tokIcon flex gap-6">
          <AnimatedTooltip items={iconData} />
          </div>
        </div>
        
        <div className="col-span-4 flex justify-between items-center py-2 rounded-lg mt-4 px-3">
          <div className="flex items-center">
            <img src={bitsBunny} alt="Bits Bunny" className="h-8 w-8 rounded-lg bg-white p-1" />
            <div className="text-[#0040C2] font-bold">Bits Bunny</div>
          </div>
          <div className="webButton mr-2 m-1">
            <button className="bg-[#0040C2] text-white px-2 py-1 rounded-[12px]">Website</button>
          </div>
        </div>
      </header>

      <main className="main-content col-span-4">
        <div className="flex items-center justify-center bg-gray-100 ">
          <div className="container grid grid-cols-4 w-full max-w-md h-full bg-white">
            <Outlet />
          </div>
        </div>

        {/* Footer Menu */}
        <div className="navBar sticky bottom-0 flex justify-around p-2 bg-[#365ACB] w-full">
          <button
            className={`text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20 ${location.pathname === '/homepage' ? 'bg-[#FF8812]' : 'bg-[#FF881200]'}`}
            onClick={() => navigate('/homepage')}
          >
            <img src={playicon} alt="Icon" className="h-10" />
            Play
          </button>
          <button
            className={`text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20 ${location.pathname === '/buy' ? 'bg-[#FF8812]' : 'bg-[#FF881200]'}`}
            onClick={() => navigate('/buy')}
          >
            <img src={buyicon} alt="Icon" className="h-10" />
            Buy
          </button>
          <button
            className={`text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20 ${location.pathname === '/ref' ? 'bg-[#FF8812]' : 'bg-[#FF881200]'}`}
            onClick={() => navigate('/ref')}
          >
            <img src={friendsicon} alt="Icon" className="h-10" />
            Friends
          </button>
          <button
            className={`text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20 ${location.pathname === '/earn' ? 'bg-[#FF8812]' : 'bg-[#FF881200]'}`}
            onClick={() => navigate('/earn')}
          >
            <img src={earnicon} alt="Icon" className="h-10" />
            Earn
          </button>
          <button
            className={`text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20 ${location.pathname === '/airdrop' ? 'bg-[#FF8812]' : 'bg-[#FF881200]'}`}
            onClick={() => navigate('/airdrop')}
          >
            <img src={airdropicon} alt="Icon" className="h-10" />
            Vault
          </button>
        </div>
      </main>
    </div>
  );
};

export default Layout;
