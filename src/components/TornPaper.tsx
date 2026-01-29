import Heart from "./Heart";

const TornPaper = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-1/3 max-w-xs">
      {/* Main torn paper */}
      <div 
        className="h-full bg-paper paper-texture torn-edge-right relative"
        style={{
          boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Red margin line */}
        <div 
          className="absolute left-8 top-0 bottom-0 w-px"
          style={{ backgroundColor: 'hsl(0 60% 30% / 0.3)' }}
        />
        
        {/* Scattered hearts on the paper */}
        <Heart 
          className="absolute top-8 left-4 text-heart animate-float" 
          size={16} 
        />
        <Heart 
          className="absolute top-24 right-12 text-heart animate-float-delayed" 
          size={14} 
        />
        <Heart 
          className="absolute top-40 left-12 text-heart animate-float-delayed-2" 
          size={12} 
        />
        <Heart 
          className="absolute bottom-32 left-6 text-heart animate-float" 
          size={15} 
        />
        <Heart 
          className="absolute bottom-48 right-8 text-heart animate-float-delayed" 
          size={13} 
        />
      </div>
    </div>
  );
};

export default TornPaper;
