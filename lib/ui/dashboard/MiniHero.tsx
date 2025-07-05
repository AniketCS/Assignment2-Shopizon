interface MiniHeroProps {
  title: string;
  backgroundImage: string;
}

export default function MiniHero({ title, backgroundImage }: MiniHeroProps) {
  return (
    // DaisyUI: hero component with background image
    <div
      className="hero min-h-48 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay to obscure the image */}
      <div className="hero-overlay bg-black bg-opacity-50"></div>

      {/* Hero content */}
      <div className="hero-content text-center text-white relative z-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold drop-shadow-lg">{title}</h1>
        </div>
      </div>
    </div>
  );
}
