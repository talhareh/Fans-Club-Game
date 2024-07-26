/* eslint-disable react/prop-types */
const ModalAlert = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-end z-50"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-[#0040C2] rounded-t-[50px] w-full border-t-4 border-[#FF8812] h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-white text-2xl">&times;</button>
        </div> */}
        <div className="p-4 flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;