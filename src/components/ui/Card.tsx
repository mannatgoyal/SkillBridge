import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = false }) => {
    return (
        <div
            className={`
        bg-surface border border-border rounded-xl p-6
        ${hoverEffect ? 'hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
