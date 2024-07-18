import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Splash } from '../assets';

const Loader = () => (
  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-10">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8812]"></div>
  </div>
);

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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