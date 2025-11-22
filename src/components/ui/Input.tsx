import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-text-muted mb-2">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full px-4 py-3 rounded-lg bg-background border 
          focus:outline-none focus:ring-2 transition-all duration-200
          placeholder-text-muted/50 text-text-main
          ${error
                        ? 'border-error focus:border-error focus:ring-error/20'
                        : 'border-border focus:border-primary focus:ring-primary/20 hover:border-primary/50'
                    }
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-error">{error}</p>
            )}
        </div>
    );
};
