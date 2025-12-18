
import React from 'react';

export const GameCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '', disabled = false, ...props }) => {
  const baseStyle = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md",
    secondary: "bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100",
    outline: "border-2 border-gray-100 text-gray-600 hover:border-green-200 hover:bg-green-50",
    ghost: "bg-transparent text-gray-500 hover:text-green-600 hover:bg-green-50",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} {...props}>
      {children}
    </button>
  );
};
