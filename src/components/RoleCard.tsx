'use client';

import { JobRole } from '@/lib/gapAnalysis';

interface RoleCardProps {
    role: JobRole;
    matchScore?: number;
}

export default function RoleCard({ role, matchScore = 0 }: RoleCardProps) {
    return (
        <div className="group relative flex-shrink-0 w-[250px] md:w-[300px] aspect-video bg-surface rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10 border border-transparent hover:border-border">
            {/* Placeholder Image Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-hover to-background" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {role.title}
                </h3>

                {/* Hidden Details (Reveal on Hover) */}
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    <div className="pt-2 flex items-center gap-2 text-xs text-green-400 font-semibold">
                        <span>{matchScore}% Match</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full" />
                        <span className="text-gray-300">{role.requiredSkills.length} Skills</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                        {role.requiredSkills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-gray-200">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
