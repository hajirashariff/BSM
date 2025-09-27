import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 48, className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <img
        src="/logo.png"
        alt="BSM Logo"
        width={size}
        height={size}
        className="drop-shadow-xl"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

export default Logo;
