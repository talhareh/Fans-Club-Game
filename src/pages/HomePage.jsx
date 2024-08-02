/*eslint-disable no-unused-vars */
import { useEffect , useState, useRef,} from "react"
import { useSelector} from "react-redux"
import {  bunnyImage, sphereImage, energyIcon, btcLogo, usdtLogo, bfc        
} from "../assets"
import { updateTaps} from "../utils/services"

import { Circle } from 'rc-progress'; 
import ModalAlert from "../components/modalAlert"
import GlowingBtcCoin from "../components/GlowingBtcCoin"
import { btcCoin } from "../assets";

const HomePage = () => {
    
    const [energy, setEnergy] = useState(1500);
    const [currTaps, setCurrTaps] = useState(0);
    const [totalTaps, setTotalTaps] = useState(0)
    const [clicks, setClicks] = useState([]);
    const [bunnyScale, setBunnyScale] = useState(false);
    const accumulatedTapsRef = useRef(0); // New state variable for accumulated taps
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [eusdt, setEusdt] = useState(0)
    const [ebtc, setEbtc] = useState(0)
    const [ebfc, setEbfc] = useState(0)
    const userId = useSelector((state) => state.user.userId)
    const reduxTotalTaps = useSelector((state)=> state.user.totalTaps)
    const tapsToAdd = 1;
    const energyToReduce = 1;

    const tapping = (e) => {
        if (energy - energyToReduce < 0) {
            return;
        }
        setCurrTaps((prevTaps) => prevTaps + 1);
        setTotalTaps((prevTotal) => prevTotal + tapsToAdd);
        setBunnyScale(true)
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setTotalTaps(tapsToAdd+totalTaps)
        setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
        setClicks([...clicks, { id: Date.now(), x, y }]);
        setTimeout(() => {
            setBunnyScale(false);
        }, 1000);
        accumulatedTapsRef.current += tapsToAdd;
        // console.log('currTaps, ', currTaps)
        const newEbfc = (totalTaps + tapsToAdd+reduxTotalTaps) / 3;
        const newEusdt = newEbfc / 33333;
        const newEbtc = newEusdt / 65000;
        console.log({bfc:newEbfc, usdt: newEusdt, btc: newEbtc})
        setEbfc(newEbfc.toFixed(2));
        setEusdt(newEusdt.toFixed(5));
        setEbtc(newEbtc.toFixed(9));
    }

    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    //useEffect hook to restore energy over time
    useEffect(() => {
        //console.log('energy : ', energy)
        const interval = setInterval(() => {
            
            setEnergy((prevEnergy) => Math.min(prevEnergy + 3.33, 1500));
        }, 1000); 
    
        return () => clearInterval(interval); 
      }, []);

   

 // Update taps every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (accumulatedTapsRef.current > 0) {
                updateTaps(userId, accumulatedTapsRef.current);
                accumulatedTapsRef.current = 0; 
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [userId]);

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const handleModalAction = (action) => {
        // Handle the action from the modal
        console.log('Modal action:', action);
        closeModal();
    };
    return (
        
                <div className="playArea relative z-20 bg-[#0040C2] rounded-t-[50px] w-full col-span-4 border-t-[5px] border-[#F8922A] p-1 pb-6">

                    <div className="infoCards mt-8 flex justify-between  gap-1 text-sm">
                        <div className="earnRate bg-[#365ACB] rounded-[15px] py-2 px-2 flex flex-col items-center flex-1">
                            <div className="info text-[#F79626] font-bold">BTC</div>
                            <div className="flex items-center gap-2">
                                <GlowingBtcCoin width= {30} height ={30} src = {btcLogo}/>                                
                                <div className="ans text-white flex justify-center"> {parseFloat(ebtc)}</div>
                            </div>
                        </div>

                        <div className="earnRate bg-[#365ACB] rounded-[15px] py-2 px-2 flex flex-col items-center flex-1">
                            <div className="info text-[#54AE94] font-bold">USDT</div>
                            <div className="flex items-center gap-2">
                                <GlowingBtcCoin width= {30} height ={30} src = {usdtLogo}/>                                
                                <div className="ans text-white flex justify-center"> {parseFloat(eusdt)}</div>
                            </div>
                        </div>
                        
                        <div className="earnRate bg-[#365ACB] rounded-[15px] py-2 px-2 flex flex-col items-center flex-1">
                            <div className="info text-[#F79841] font-bold">BFC</div>
                            <div className="flex items-center gap-2">
                                <GlowingBtcCoin width= {30} height ={30} src = {bfc}/>                               
                                <div className="ans text-white flex justify-center"> {ebfc}</div>
                            </div>
                        </div>
                    </div>

                    <div className="score flex mt-8 justify-center ">
                        <GlowingBtcCoin width={50} height = {50} src = {btcCoin}/>
                        <div className="totalTaps px-2 pt-1 text-white text-5xl font-bold">
                            {reduxTotalTaps + totalTaps}
                        </div>
                    </div>

                    <div className="tapArea relative mt-2 h-[380px] flex justify-center items-center" 
                         onClick={tapping}
                    >
                        <div className="absolute z-10" style={{ height: '40vh', width: '40vh' }}>
                            <Circle
                            percent={energy}
                            strokeWidth={2}
                            strokeColor="#F8922A"
                            trailWidth={4}
                            trailColor="#365ACB00"
                            className="relative z-10"
                            />
                        </div>
                        <div className="sphere relative z-0">
                            <img src={sphereImage}/>
                        </div>
                        <div className="bunny absolute z-10" style={{  animation: bunnyScale ? 'bunny 0.5s ease-out' : 'none' }}>
                            <img 
                                src= {bunnyImage}
                                className="block mx-auto"
                            />
                        </div>
                        {clicks.map((click) => (
                            <div
                                key={click.id}
                                className="absolute text-3xl text-white font-bold opacity-0 z-20"
                                style={{
                                top: `${click.y - 42}px`,
                                left: `${click.x - 28}px`,
                                animation: `float 1.5s ease-out`
                                }}
                                onAnimationEnd={() => handleAnimationEnd(click.id)}
                            >
                                +{tapsToAdd}
                            </div>
                        ))}
                    </div> 
                    {/* end of Tap Area */}
                    
                    {/* Energy & Boost */}
                    {/* <div className="boostProgress text-center text-white text-sm mb-4 flex justify-between items-center px-2"> */}
                        <div className="flex items-center justify-center text-xl text-white mb-4">
                            <img src={energyIcon} alt="Icon" className="h-5 w-5 mr-2" />
                            <span>{Math.floor(energy)} / 1500</span>
                        </div>
                        {/* <span>Boost</span> */}
                    {/* </div> */}

                    
                    <ModalAlert isOpen={isModalOpen} onClose={closeModal} title="Card Details">
                        {modalContent}
                    </ModalAlert>
                </div> 
                

                
            
            
                 
        
    )
}

export default HomePage