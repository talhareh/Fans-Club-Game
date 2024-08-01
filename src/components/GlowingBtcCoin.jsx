/* eslint-disable react/prop-types */

const GlowingBtcCoin = ({ width, height, src }) => {
    return (
      <div className="relative flex justify-center items-center" style={{ width, height }}>
        <img 
          src={src} 
          width={width} 
          height={height} 
          className="relative z-10"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))',
          }}  
        />
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
            filter: 'blur(15px)',
            transform: 'scale(1.2)',
            zIndex: 5,
          }}
        ></div>
      </div>
    );
  };
  
  export default GlowingBtcCoin;