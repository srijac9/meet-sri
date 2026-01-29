import Heart from "./Heart";

const FloatingHearts = () => {
  return (
    <>
      {/* Hearts scattered around the page */}
      <Heart 
        className="absolute top-16 right-1/4 text-heart/60 animate-float" 
        size={18} 
      />
      <Heart 
        className="absolute top-32 left-1/3 text-heart/50 animate-float-delayed" 
        size={14} 
      />
      <Heart 
        className="absolute bottom-24 right-1/3 text-heart/70 animate-float-delayed-2" 
        size={16} 
      />
      <Heart 
        className="absolute bottom-40 left-1/4 text-heart/40 animate-float" 
        size={12} 
      />
      <Heart 
        className="absolute top-1/2 right-12 text-heart/50 animate-float-delayed" 
        size={15} 
      />
    </>
  );
};

export default FloatingHearts;
