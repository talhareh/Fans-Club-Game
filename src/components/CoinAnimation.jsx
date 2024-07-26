/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import GlowingBtcCoin from './GlowingBtcCoin';
import "../App.css"

const CoinAnimation = ({ isAnimating, onAnimationComplete }) => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (isAnimating) {
      const newCoins = Array(100).fill().map((_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1}s`
      }));
      setCoins(newCoins);

      const timer = setTimeout(() => {
        setCoins([]);
        onAnimationComplete();
      }, 2000); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating, onAnimationComplete]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute animate-coin"
          style={{
            left: coin.left,
            bottom:'-15px',
            animationDelay: coin.delay
          }}
        >
          <GlowingBtcCoin width={15} height={15} />
        </div>
      ))}
    </div>
  );
};

export default CoinAnimation;