import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Splash } from '../assets';
import { createNSave } from '../utils/services';
import {setUser} from '../store/userSlice'

const Loader = () => (
  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8812]"></div>
  </div>
);

const SplashScreen = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get('userId')
  console.log('userId , ', userId)


  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await createNSave({ telegramId: userId });
              //console.log("Spplash : ",response)  
              dispatch(setUser(response));
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };
      if (userId) {
          fetchData();
      }
  }, [userId, dispatch]);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/homepage');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen flex justify-center items-center bg-white">
      <img src={Splash} alt="Splash Screen" className="w-full h-full object-cover" />
      {loading && <Loader />}
    </div>
  );
};

export default SplashScreen;