import { airdropicon } from "../assets"
import GlowingBtcCoin from "../components/GlowingBtcCoin"
import { btcCoin } from "../assets"

const Vault = () => {
  return (
    <div className="playArea relative z-20 bg-[#0040C2] text-white rounded-t-[50px] w-full col-span-4 border-t-[5px] border-[#F8922A] p-1 px-2">
        <div className="btc-img col-span-4 flex justify-center items-center mt-8">
            <GlowingBtcCoin width={150} height={150} src = {btcCoin}/>
        </div>
        <h1 className="text-2xl mt-8 font-bold mb-4 justify-center flex">Connect Your Wallet</h1>
        <div className="info flex justify-center px-8 mb-8 ">
            Transaction List 
        </div>
        
        <div className="bg-[#365ACB] rounded-lg p-3">
            <h2 className="font-semibold mb-2">Earnings</h2>
            <div className="flex flex-col  items-center rounded-lg p-2 cursor-pointer">
                <div className="w-full bg-[#055C9D] flex items-center justify-between mb-2 ">
                    <span className="text-sm">0x78236876....</span>
                    <div className="flex items-center">
                        <span className="text-[#F8922A] mr-1">2,000</span>
                        <GlowingBtcCoin width={20} height={20} src={btcCoin}/>
                    </div>
                </div>
                
                <div className="w-full flex items-center justify-between bg-[#055C9D]">
                    <span className="text-sm">0xAE2f236876....</span>
                    <div className="flex items-center">
                        <span className="text-[#F8922A] mr-1">1,500</span>
                        <GlowingBtcCoin width={20} height={20} src = {btcCoin} />
                    </div>
                </div>
            </div>
        </div>
 
        <div className="walletConnect mb-8 mt-8">
        <button 
            className="w-full bg-[#F8922A] text-white py-2 rounded-lg flex items-center justify-center"
        >
            <img src={airdropicon} alt="MetaMask" className="w-6 h-6 mr-2" />
            Connet Your MetaMask Wallet
        </button>
        </div> 
    </div>
  )
}

export default Vault