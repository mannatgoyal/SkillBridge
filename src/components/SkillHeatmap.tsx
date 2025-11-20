'use client';

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface Skill {
    name: string;
    proficiency: number;
}

export default function SkillHeatmap({ skills }: { skills: Skill[] }) {
    if (skills.length === 0) return null;

    const data = {
        labels: skills.map((s) => s.name),
        datasets: [
            {
                label: 'Skill Proficiency',
                data: skills.map((s) => s.proficiency),
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // Primary color with opacity
                borderColor: '#6366f1', // Primary color
                borderWidth: 2,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#6366f1',
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#94a3b8', // text-muted
                    font: {
                        size: 12,
                    },
                },
                ticks: {
                    display: false,
                    stepSize: 1,
                    max: 5,
                },
                suggestedMin: 0,
                suggestedMax: 5,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="h-[300px] w-full">
            <Radar data={data} options={options} />
        </div>
    );
}
