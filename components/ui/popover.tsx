// components/ui/popover.tsx
import React, { useState, ReactNode } from 'react';

interface PopoverProps {
    className?: string;
    renderPopover: ReactNode;
    children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ className, renderPopover, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative ${className}`} onClick={togglePopover}>
            {children}
            {isOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow-lg z-10">
                    {renderPopover}
                </div>
            )}
        </div>
    );
};

export default Popover;
