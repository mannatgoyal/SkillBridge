'use client';

interface SkillCardProps {
    name: string;
    category: string;
    level: number; // 1-5
}

export default function SkillCard({ name, category, level }: SkillCardProps) {
    const percentage = (level / 5) * 100;

    return (
        <div className="flex-shrink-0 w-[200px] bg-surface border border-border rounded-lg p-4 hover:border-primary transition-colors">
            <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
            <p className="text-xs text-text-muted mb-3">{category}</p>

            {/* Progress Bar */}
            <div className="space-y-1">
                <div className="w-full h-1.5 bg-surface-hover rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <p className="text-xs text-text-muted text-right">Level {level}/5</p>
            </div>
        </div>
    );
}
