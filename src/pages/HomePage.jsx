import { useEffect , useState} from "react"
import { useDispatch } from "react-redux"
import { useLocation, } from "react-router-dom"
import {Logo , bitsBunny, btcCoin, bunnyImage, sphereImage, energy} from "../assets"

const HomePage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')

    let currTaps = 0
    const [totalTaps, setTotalTaps] = useState(0)
    const [clicks, setClicks] = useState([]);
    const [bunnyScale, setBunnyScale] = useState(false);
    const tapsToAdd = 1;


    const tapping = (e) => {
        let taps = currTaps +1
        setTotalTaps(taps)
        setBunnyScale(true)
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setTotalTaps(tapsToAdd+totalTaps)
        setClicks([...clicks, { id: Date.now(), x, y }]);
        setTimeout(() => {
            setBunnyScale(false);
        }, 1000);
    }

    const handleAnimationEnd = (id) => {
        setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
      };

    useEffect(() =>{
        console.log('Hello Player!!')
    }, [userId, dispatch])

    return (
        
        <div className="flex items-center justify-center bg-gray-100 ">
            <div className="container grid grid-cols-4 w-full max-w-md  h-full bg-white border border-black rounded-[50px] pt-2 m-1 ">
                <div className="col-span-4 flex justify-center mt-4">
                    <img
                        src={Logo} 
                        alt="Bitcoin Fans Club"
                        className="h-16" 
                    />
                </div>
                <div className="col-span-4 flex justify-between items-center py-2 rounded-lg mt-4">
                    <div className="flex items-center space-x-2">
                        <img src={bitsBunny} alt="Bits Bunny" className="h-8 w-8 rounded-lg bg-white p-1" />
                        <div className="text-[#0040C2] font-bold">Bits Bunny</div>
                    </div>
                    <div className="webButton mr-2 m-1">
                        <button className="bg-[#0040C2] text-white px-2 py-1 rounded-[12px]">Website</button>
                    </div>
                    
                </div>
                <div className="playArea bg-[#0040C2] h-[690px] rounded-t-[50px] rounded-b-[50px] w-full col-span-4 border-t-[5px] border-[#FF8812] p-1">
                    
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
                        <div className="totalTaps px-2 pt-2 text-white text-5xl font-bold">
                            {totalTaps}
                        </div>
                    </div>

                    <div className="tapArea relative mt-2 h-[400px] flex justify-center items-center" 
                         onClick={tapping}
                    >
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
                                +1
                            </div>
                        ))}
                    </div> 
                    {/* end of Tap Area */}
                    
                    {/* Energy & Boost */}
                    <div className="boostProgress text-center text-white text-sm mb-4 flex justify-between items-center px-2">
                        <div className="flex items-center">
                            <img src={energy} alt="Icon" className="h-5 w-5 mr-2" />
                            <span>6500 / 6500</span>
                        </div>
                        <span>Boost</span>
                    </div>
                    <div className="navBar flex justify-around p-2 bg-[#365ACB] rounded-[20px] w-full">
                    <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text-sm font-bold flex flex-col items-center w-20">
                        <svg width="60" height="30" viewBox="10 0 14 30" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" className="mb-1 mt-1">
                        <path d="M21.7356 3.55505L18.3561 4.12561L18.166 2.99911L15.913 3.37949L15.3424 0L13.0894 0.380375L13.66 3.75986L11.407 4.14024L11.5972 5.26673L8.21768 5.8373C3.25452 6.68217 -0.114001 11.4259 0.723556 16.3817C1.56111 21.3412 6.30483 24.7098 11.2643 23.8722L24.786 21.5826C29.7455 20.7451 33.114 16.0014 32.2764 11.0419C31.4389 6.08235 26.6951 2.71383 21.7356 3.55139V3.55505ZM13.0272 15.4601L10.7742 15.8404L11.1546 18.0934L8.90162 18.4738L8.52125 16.2208L6.26826 16.6012L5.88788 14.3482L8.14087 13.9678L7.7605 11.7148L10.0135 11.3345L10.3939 13.5874L12.6469 13.2071L13.0272 15.4601ZM24.1166 15.9026C22.2586 16.2172 20.4775 14.9517 20.1629 13.0937C19.8484 11.2357 21.1139 9.45452 22.9719 9.13998C24.8298 8.82544 26.611 10.0909 26.9256 11.9489C27.2401 13.8069 25.9746 15.5881 24.1166 15.9026Z"/>
                        </svg>
                        Play
                    </button>
                    <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text- font-bold flex flex-col items-center w-20">
                        <svg width="30" height="30" viewBox="3 0 14 20" fill="#ffffffaa" xmlns="http://www.w3.org/2000/svg" className="mb-1 mt-1" >
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.9979 5.99952V5.0012C14.9979 2.23902 12.7589 0 9.99907 0C7.2393 0 5.00027 2.23902 5.00027 5.0012V5.99952H2.99883C2.50927 5.99952 2.09411 6.35229 2.01251 6.83465L0.0134727 18.8337C-0.0345235 19.1241 0.04707 19.4192 0.236655 19.6448C0.42624 19.8704 0.704618 20 0.999794 20H18.9984C19.2935 20 19.5719 19.8704 19.7615 19.6448C19.9511 19.4216 20.0327 19.1241 19.9847 18.8337L17.9856 6.83465C17.904 6.35229 17.4889 5.99952 16.9993 5.99952H14.9979ZM6.99932 5.99952H12.9988V5.0012C12.9988 3.34293 11.6549 2.00144 9.99907 2.00144C8.34321 2.00144 6.99932 3.34293 6.99932 5.0012V5.99952ZM6.99932 10C6.99932 9.44804 6.55055 8.99928 5.99859 8.99928C5.44664 8.99928 5.00027 9.44804 5.00027 10V11.0007C5.00027 11.5527 5.44664 11.999 5.99859 11.999C6.55055 11.999 6.99932 11.5527 6.99932 11.0007V10ZM13.9972 8.99928C14.5491 8.99928 14.9955 9.44804 14.9955 10V11.0007C14.9955 11.5527 14.5491 11.999 13.9972 11.999C13.4452 11.999 12.9964 11.5527 12.9964 11.0007V10C12.9964 9.44804 13.4452 8.99928 13.9972 8.99928Z"/>
                        </svg>
                        Buy
                    </button>
                    <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text-sm font-bold flex flex-col items-center w-20">
                        <svg width="50" height="30" viewBox="10 0 14 20" fill="#ffffffaa" xmlns="http://www.w3.org/2000/svg" className="mb-1 mt-1">
                        <path d="M5.09901 7.01112C6.50706 7.01112 7.64851 5.86967 7.64851 4.46162C7.64851 3.05356 6.50706 1.91211 5.09901 1.91211C3.69095 1.91211 2.5495 3.05356 2.5495 4.46162C2.5495 5.86967 3.69095 7.01112 5.09901 7.01112Z" />
                        <path d="M8.5026 8.79579C7.841 9.29385 7.30426 9.93892 6.9348 10.6801C6.56534 11.4212 6.37327 12.2381 6.37376 13.0662V13.3849H0.956065C0.433416 13.3849 0 12.9515 0 12.4288V11.7915C0 9.85383 1.56795 8.28589 3.50557 8.28589H6.69245C7.35532 8.28589 7.97995 8.4771 8.5026 8.79579Z"/>
                        <path d="M25.4951 7.01112C26.9031 7.01112 28.0446 5.86967 28.0446 4.46162C28.0446 3.05356 26.9031 1.91211 25.4951 1.91211C24.087 1.91211 22.9456 3.05356 22.9456 4.46162C22.9456 5.86967 24.087 7.01112 25.4951 7.01112Z" />
                        <path d="M30.5941 11.7915V12.4288C30.5941 12.9515 30.1607 13.3849 29.638 13.3849H24.2203V13.0662C24.2203 11.3198 23.379 9.7646 22.0915 8.79579C22.6141 8.4771 23.2388 8.28589 23.9016 8.28589H27.0885C29.0261 8.28589 30.5941 9.85383 30.5941 11.7915Z"/>
                        <path d="M15.297 7.64852C17.4091 7.64852 19.1213 5.93634 19.1213 3.82426C19.1213 1.71218 17.4091 0 15.297 0C13.185 0 11.4728 1.71218 11.4728 3.82426C11.4728 5.93634 13.185 7.64852 15.297 7.64852Z"/>
                        <path d="M18.8026 9.56067H11.7915C10.8619 9.56134 9.97067 9.9309 9.31339 10.5882C8.65612 11.2454 8.28656 12.1367 8.28589 13.0662V14.9784C8.28589 15.5061 8.71421 15.9344 9.24195 15.9344H21.3521C21.6057 15.9344 21.8489 15.8337 22.0281 15.6544C22.2074 15.4751 22.3082 15.2319 22.3082 14.9784V13.0662C22.3075 12.1367 21.9379 11.2454 21.2807 10.5882C20.6234 9.9309 19.7321 9.56134 18.8026 9.56067Z"/>
                        </svg>
                        Friends
                    </button>
                    <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text-sm font-bold flex flex-col items-center w-20">
                        <svg width="40" height="30" viewBox="5 0 14 20" fill="#ffffffaa" xmlns="http://www.w3.org/2000/svg" className="mb-1 mt-1">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.80097 16.7678C8.18038 16.2903 7.81125 15.719 7.81125 15.0577V11.5433C7.81517 11.5159 7.82142 11.4888 7.82991 11.4625C7.82022 11.4174 7.81399 11.3716 7.81125 11.3256C7.81125 9.01797 12.1902 7.81128 16.5193 7.81128C20.8485 7.81128 25.2274 9.01797 25.2274 11.3256C25.2247 11.3716 25.2185 11.4174 25.2088 11.4625C25.2173 11.4888 25.2235 11.5159 25.2274 11.5433V15.0577C25.2247 15.2975 25.1739 15.5344 25.0782 15.7543C25.0811 15.7561 25.0841 15.758 25.087 15.7598C23.6614 17.7021 20.8471 19.0074 16.8304 19.0074C13.5565 19.0074 10.7124 18.1402 8.80097 16.7678ZM17.1414 14.8275C18.61 14.8011 20.0708 14.607 21.4954 14.2491V16.6873C20.0647 17.0845 18.5887 17.2956 17.104 17.3155C17.126 17.2599 17.1386 17.2011 17.1414 17.1414V14.8275ZM15.9347 17.3155C14.45 17.2956 12.974 17.0845 11.5433 16.6873V14.2491C12.9679 14.607 14.4287 14.8011 15.8973 14.8275V17.1414C15.9001 17.2011 15.9127 17.2599 15.9347 17.3155ZM22.7083 13.8634C23.1553 13.6966 23.5828 13.4818 23.9834 13.2227V15.0577C23.9834 15.4184 23.5418 15.8414 22.7394 16.2208V14.0314C22.7351 13.9744 22.7247 13.9181 22.7083 13.8634ZM10.2993 16.2208C9.49689 15.8414 9.05526 15.4184 9.05526 15.0577V13.2227C9.45587 13.4818 9.88341 13.6966 10.3304 13.8634C10.314 13.9181 10.3036 13.9744 10.2993 14.0314V16.2208Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.35766 9.30446C1.35916 9.30056 1.36067 9.29667 1.3622 9.29279L1.39952 9.23681C0.534926 8.7081 0 8.04255 0 7.24638V3.73204C0.00392595 3.70461 0.0101688 3.67756 0.0186606 3.65118C0.00897609 3.60611 0.00273756 3.56036 0 3.51434C0 1.20669 4.37893 0 8.7081 0C13.0373 0 17.4162 1.20669 17.4162 3.51434C17.4135 3.56036 17.4072 3.60611 17.3975 3.65118C17.406 3.67756 17.4123 3.70461 17.4162 3.73204V7.24638C17.4135 7.48624 17.3627 7.72311 17.2669 7.94303C17.5268 8.10351 17.7407 8.2666 17.9159 8.42894C15.9451 10.103 12.6949 11.1962 9.0191 11.1962C6.03128 11.1962 3.32461 10.4739 1.35766 9.30446ZM9.33011 7.01624C10.7987 6.98982 12.2596 6.79574 13.6842 6.43777V8.87604C12.2534 9.27319 10.7775 9.48434 9.29279 9.50427C9.31471 9.44866 9.32732 9.38982 9.33011 9.33011V7.01624ZM8.12341 9.50427C6.63872 9.48434 5.16278 9.27319 3.73204 8.87604V6.43777C5.15663 6.79574 6.61745 6.98982 8.08609 7.01624V9.33011C8.08889 9.38982 8.10149 9.44866 8.12341 9.50427ZM14.8971 6.05213C15.344 5.88533 15.7716 5.67052 16.1722 5.41146V7.24638C16.1722 7.60715 15.7306 8.03011 14.9282 8.40954V6.22007C14.9238 6.16314 14.9134 6.10684 14.8971 6.05213ZM2.48803 8.40954C1.68564 8.03011 1.24401 7.60715 1.24401 7.24638V5.41146C1.64462 5.67052 2.07216 5.88533 2.51913 6.05213C2.50278 6.10684 2.49235 6.16314 2.48803 6.22007V8.40954Z"/>
                        </svg>
                        Earn
                    </button>
                    <button className="bg-[#FF8812] text-white px-4 py-2 rounded-[12px] text-sm font-bold flex flex-col items-center w-20">
                        <svg width="30" height="30" viewBox="0 0 14 20" fill="#ffffffaa" xmlns="http://www.w3.org/2000/svg" className="mb-1 mt-1">
                        <path d="M10.658 11.7842H7.75166H6.70999H5.67039V11.7822H2.76404C2.52064 11.7822 2.32262 11.9802 2.32262 12.2215V19.5606C2.32262 19.802 2.52064 20 2.76404 20H10.658C10.9014 20 11.0994 19.7999 11.0994 19.5586V12.2236C11.0994 11.9802 10.9014 11.7842 10.658 11.7842Z"/>
                        <path d="M6.70998 0C3.00949 0 0 2.7269 0 6.08086C0 6.22319 0.0103135 6.36345 0.0247525 6.52847C0.0288779 6.57178 0.0391914 6.61304 0.0618812 6.65017L2.69802 11.3284H3.38284L0.643564 6.46865C0.812706 5.92409 1.30776 5.54868 1.88531 5.54868C2.60726 5.54868 3.19513 6.13655 3.19513 6.8585C3.19513 6.88119 3.20338 6.90182 3.20751 6.92451H3.20132L4.22649 11.3263H4.83705L3.79125 6.83375C3.80363 6.12211 4.38531 5.54662 5.09901 5.54662C5.81271 5.54662 6.40883 6.13449 6.40883 6.85644V11.3243H7.00495V6.85644C7.00495 6.13449 7.59282 5.54662 8.31477 5.54662C9.03672 5.54662 9.60809 6.12211 9.62253 6.83375L8.57673 11.3263H9.18729L10.2125 6.92451H10.2063C10.2125 6.89975 10.2186 6.87913 10.2186 6.85644C10.2186 6.13449 10.8045 5.54662 11.5285 5.54662C12.106 5.54662 12.6011 5.92203 12.7702 6.46659L10.0309 11.3263H10.7158L13.3519 6.6481C13.3725 6.61097 13.387 6.54291 13.3911 6.50165C13.4014 6.36139 13.4138 6.22319 13.4138 6.08086C13.4179 2.7269 10.4105 0 6.70998 0Z"/>
                        </svg>
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