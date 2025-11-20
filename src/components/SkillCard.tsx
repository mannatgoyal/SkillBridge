'use client';

interface SkillCardProps {
    name: string;
    category: string;
    level: number; // 1-5
}

export default function SkillCard({ name, category, level }: SkillCardProps) {
    const percentage = (level / 5) * 100;

    return (
        <div className="flex-shrink-0 w-[220px] bg-surface border border-border rounded-xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-1 truncate">{name}</h3>
            <p className="text-sm text-text-muted mb-4 font-medium">{category}</p>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="w-full h-2 bg-surface-hover rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <p className="text-xs text-text-muted text-right font-semibold">Level {level}/5</p>
            </div>
        </div>
    );
}
