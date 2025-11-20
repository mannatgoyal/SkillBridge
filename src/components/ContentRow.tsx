'use client';

import { useRef } from 'react';

interface ContentRowProps {
    title: string;
    children: React.ReactNode;
}

export default function ContentRow({ title, children }: ContentRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -window.innerWidth / 2 : window.innerWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="py-8 space-y-4 group">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-100 px-4 md:px-12 hover:text-white transition-colors cursor-pointer">
                {title}
                <span className="text-sm font-normal text-primary ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore All &gt;
                </span>
            </h2>

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/70 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Scroll Container */}
                <div
                    ref={rowRef}
                    className="flex gap-4 overflow-x-auto px-4 md:px-12 no-scrollbar pb-8 pt-4"
                >
                    {children}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 w-12 bg-black/50 hover:bg-black/70 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
