import React from 'react';

interface SkillCardProps {
    name: string;
    category: string;
    level: number; // 1-5
}

export default function SkillCard({ name, category, level }: SkillCardProps) {
    // Dynamic color mapping based on level
    const getLevelColor = (lvl: number) => {
        switch (lvl) {
            case 1: return 'from-level-1 to-emerald-600 shadow-level-1/20 border-level-1/30';
            case 2: return 'from-level-2 to-cyan-600 shadow-level-2/20 border-level-2/30';
            case 3: return 'from-level-3 to-indigo-600 shadow-level-3/20 border-level-3/30';
            case 4: return 'from-level-4 to-fuchsia-600 shadow-level-4/20 border-level-4/30';
            case 5: return 'from-level-5 to-amber-600 shadow-level-5/20 border-level-5/30';
            default: return 'from-gray-500 to-gray-700';
        }
    };

    const getLevelLabel = (lvl: number) => {
        switch (lvl) {
            case 1: return 'Beginner';
            case 2: return 'Elementary';
            case 3: return 'Intermediate';
            case 4: return 'Advanced';
            case 5: return 'Expert';
            default: return 'Unknown';
        }
    };

    const colorClass = getLevelColor(level);

    return (
        <div className={`
      relative min-w-[200px] p-5 rounded-2xl 
      bg-gradient-to-br ${colorClass}
      border border-white/10
      hover:scale-105 hover:-translate-y-1 transition-all duration-300
      shadow-lg cursor-pointer group overflow-hidden
    `}>
            {/* Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] transform skew-x-12"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80 bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
                        {category}
                    </span>
                    <span className="text-lg font-bold text-white">{level}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{name}</h3>
                <p className="text-sm text-white/90 font-medium">{getLevelLabel(level)}</p>

                {/* Progress Bar */}
                <div className="mt-4 h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white/90 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(level / 5) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
