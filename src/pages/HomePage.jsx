/*eslint-disable no-unused-vars */
import { useEffect , useState, useRef,} from "react"
import { useDispatch } from "react-redux"
import { useLocation, } from "react-router-dom"
import {  bunnyImage, sphereImage, energyIcon        
} from "../assets"
import { createNSave , updateTaps} from "../utils/services"
import { setUser, } from "../store/userSlice"
import { Circle } from 'rc-progress'; 
import ModalAlert from "../components/modalAlert"
import GlowingBtcCoin from "../components/GlowingBtcCoin"

const HomePage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')
    const [energy, setEnergy] = useState(100);
    const [currTaps, setCurrTaps] = useState(0);
    const [totalTaps, setTotalTaps] = useState(0)
    const [clicks, setClicks] = useState([]);
    const [bunnyScale, setBunnyScale] = useState(false);
    const accumulatedTapsRef = useRef(0); // New state variable for accumulated taps
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

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
    }

    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    //useEffect hook to restore energy over time
    useEffect(() => {
        //console.log('energy : ', energy)
        const interval = setInterval(() => {
            // if(energy === 100)
            //     return
            setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 100));
        }, 1000); 
    
        return () => clearInterval(interval); 
      }, []);

    // Regiter User and bring existing user info
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await createNSave({ telegramId: userId });  
                dispatch(setUser(response.data));
                setTotalTaps(response.data.totalTaps)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        if (userId) {
            fetchData();
        }
    }, [userId, dispatch]);

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
                    
                    <div className="infoCards mt-8 flex gap-3 pl-6">
                        <div className="earnRate bg-[#365ACB] rounded-[15px] py-2 px-2" 
                            onClick={() => openModal(
                                <div>
                                    <p className="text-white mb-4">Choose your earn rate:</p>
                                    <select className="w-full p-2 rounded" onChange={(e) => handleModalAction(e.target.value)}>
                                        <option value="10">10 per tap</option>
                                        <option value="20">20 per tap</option>
                                        <option value="30">30 per tap</option>
                                    </select>
                                </div>
                            )}>
                            <div className="info text-[#F79841]">Earn per tap</div>
                            <div className="ans text-white flex justify-center"> +12</div>
                        </div>

                        <div className="cionsNeeded bg-[#365ACB] rounded-[15px] py-2 px-2"
                            onClick={() => openModal(
                                <div>
                                    <p className="text-white mb-4">Set coins needed to level up:</p>
                                    <input type="number" className="w-full p-2 rounded" placeholder="Enter coin amount" 
                                            onChange={(e) => handleModalAction(e.target.value)} />
                                </div>
                            )}>
                            <div className="info text-[#8D90FE]">Coins to level up</div>
                            <div className="ans text-white flex justify-center"> 10 M</div>
                        </div>
                        
                        <div className="cionsNeeded bg-[#365ACB] rounded-[15px] py-2 px-2"
                            onClick={() => openModal(
                                <div>
                                    <p className="text-white mb-4">Adjust profit per hour:</p>
                                    <button className="bg-[#F8922A] text-white px-4 py-2 rounded w-full" 
                                            onClick={() => handleModalAction('increase_profit')}>
                                        Increase Profit
                                    </button>
                                </div>
                            )}>
                            <div className="info text-[#84CB69]">Profit per hour</div>
                            <div className="ans text-white flex justify-center"> +636.31K</div>
                        </div>
                    </div>

                    <div className="score flex mt-8 justify-center ">
                        <GlowingBtcCoin width={50} height = {50}/>
                        <div className="totalTaps px-2 pt-1 text-white text-5xl font-bold">
                            {totalTaps}
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
                            {/* <div
                            className="absolute inset-0 flex items-center justify-center rounded-full"
                            style={{
                                width: 'calc(100% - 8px)',
                                height: 'calc(100% - 8px)',
                                background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #35389E 40%, #1C2848 100%)'
                            }}
                            ></div> */}
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
                            <span>{energy} / 100</span>
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