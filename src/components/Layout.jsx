
import { Outlet } from 'react-router-dom';
import {Logo , bitsBunny} from '../assets'

const Layout = () => {
    return (
        <div>
            
            <header className="header">
            <div className="sticky top-0 z-0 col-span-4 flex justify-center mt-4" style={{ minHeight: '15vh' }}>
                    <img
                        src={Logo} 
                        width={200}
                        height={200}
                        alt="Bitcoin Fans Club"
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
            </header>
            
        
            <main className="main-content">
                <div className="flex items-center justify-center bg-gray-100 ">
                    <div className="container grid grid-cols-4 w-full max-w-md  h-full bg-white  ">
                        <Outlet />
                    </div>
                </div>

                
            </main>
        </div>
    );
};

export default Layout;
