import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'User avatar', 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`
      relative rounded-full overflow-hidden flex items-center justify-center
      bg-primary-100 text-neutral-900 font-medium
      ${sizeClasses[size]} ${className}
    `}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // On error, fallback to initials
            (e.target as HTMLImageElement).style.display = 'none';
          }} 
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;