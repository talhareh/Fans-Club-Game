import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useLocation, } from "react-router-dom"
import { setUser } from "../store/userSlice"
import Logo from '../assets/logo.png'
import bitsBunny from '../assets/BitsBunny.png'
const HomePage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    

    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')

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
                    <div className="infoCards ml-4 mt-8">
                        <div className="earnRate">
                            <div className="info">Earn per tap</div>
                            <div className="ans"> +12</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>          
        
    )
}

export default HomePage