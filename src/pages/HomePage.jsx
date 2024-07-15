import { useEffect , useState} from "react"
import { useDispatch } from "react-redux"
import { useLocation, } from "react-router-dom"
import {Logo , bitsBunny, btcCoin, bunnyImage, sphereImage, energyIcon,
        playicon, buyicon, friendsicon, earnicon, airdropicon
        
} from "../assets"
import { createNSave , updateTaps} from "../utils/services"
import { setUser, } from "../store/userSlice"
import { Circle } from 'rc-progress'; 

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

        console.log('currTaps, ', currTaps)
    }

    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
    };

    // useEffect hook to restore energy over time
    useEffect(() => {
        const interval = setInterval(() => {
          setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 6500));
        }, 100); // Restore 10 energy points every second
    
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);


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

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrTaps((prevTaps) => {
            if (prevTaps > 0) {
              updateTaps(userId, prevTaps);
              return 0;  // Reset currTaps
            }
            return prevTaps;
          });
        }, 5000);
    
        return () => clearInterval(interval);
      }, [userId]);


    return (
        <div className="flex items-center justify-center bg-gray-100 ">
            <div className="container grid grid-cols-4 w-full max-w-md  h-full bg-white pt-2  ">
                <div className="col-span-4 flex justify-center mt-4">
                    <img
                        src={Logo} 
                        width={220}
                        height={200}
                        alt="Bitcoin Fans Club"
                        className="h-16" 
                    />
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

                <div className="playArea bg-[#0040C2] h-[752px] rounded-t-[50px] w-full col-span-4 border-t-[5px] border-[#FF8812] p-1">
                    
                    <div className="infoCards mt-8 flex gap-3 px-2">
                        
                        <div className="earnRate bg-[#365ACB] rounded-[15px] py-2 px-2">
                            <div className="info text-[#F79841]">Earn per tap</div>
                            <div className="ans text-white flex justify-center"> +12</div>
                        </div>

                        <div className="cionsNeeded bg-[#365ACB] rounded-[15px] py-2 px-2">
                            <div className="info text-[#8D90FE]">Coins to level up</div>
                            <div className="ans text-white flex justify-center"> 10 M</div>
                        </div>
                        
                        <div className="cionsNeeded bg-[#365ACB] rounded-[15px] py-2 px-2">
                            <div className="info text-[#84CB69]">Profit per hour</div>
                            <div className="ans text-white flex justify-center"> +636.31K</div>
                        </div>
                    </div>


                    <div className="score flex mt-8 justify-center ">
                        <img src= {btcCoin} width={50} height = {50}/>
                        <div className="totalTaps px-2 pt-1 text-white text-5xl font-bold">
                            {totalTaps}
                        </div>
                    </div>

                    <div className="tapArea relative mt-2 h-[400px] flex justify-center items-center" 
                         onClick={tapping}
                    >
                        <div className="absolute z-0" style={{ height: '30vh', width: '30vh' }}>
                            <Circle
                            percent={energy}
                            strokeWidth={4}
                            strokeColor="#FF8812"
                            trailWidth={4}
                            trailColor="#365ACB00"
                            className="relative z-10"
                            />
                            <div
                            className="absolute inset-0 flex items-center justify-center rounded-full"
                            style={{
                                width: 'calc(100% - 8px)',
                                height: 'calc(100% - 8px)',
                                background: 'radial-gradient(circle at 50% 40%, #FFFFFF 0%, #35389E 40%, #1C2848 100%)'
                            }}
                            ></div>
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
                                className="absolute text-3xl text-white font-bold opacity-0"
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
                    <div className="boostProgress text-center text-white text-sm mb-4 flex justify-between items-center px-2">
                        <div className="flex items-center">
                            <img src={energyIcon} alt="Icon" className="h-5 w-5 mr-2" />
                            <span>500 / 500</span>
                        </div>
                        <span>Boost</span>
                    </div>

                    {/* footer meu */}
                    <div className="navBar flex justify-around p-2 bg-[#365ACB] rounded-[20px] w-full">
                        <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20">
                            <img src={playicon} alt="Icon" className="h-10" />
                            Play
                        </button>
                        <button className="bg-[#FF881200] text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20">
                            <img src={buyicon} alt="Icon" className="h-10" />
                            Buy
                        </button>
                        <button className="bg-[#FF881200] text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20">
                            
                            <img src={friendsicon} alt="Icon" className="h-10" />
                            Friends
                        </button>
                        <button className="bg-[#FF881200] text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20">
                            <img src={earnicon} alt="Icon" className="h-10" />
                            Earn
                        </button>
                        <button className="bg-[#FF881200] text-white px-4 py-2 rounded-[12px] text-sm font-regular flex flex-col items-center w-20">
                            <img src={airdropicon} alt="Icon" className="h-10" />
                            Airdrop
                        </button>
                        </div>
                </div> 
                {/* {End of play Area} */}

                
            </div>
        </div>          
        
    )
}

export default HomePage