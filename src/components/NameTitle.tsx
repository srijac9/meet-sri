import srijaImage from "@/assets/srija-name.png";

const NameTitle = () => {
  return (
    <div className="flex items-center justify-center md:justify-start">
      <img 
        src={srijaImage} 
        alt="SRIJA" 
        className="h-auto w-auto max-w-full object-contain"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
};

export default NameTitle;
