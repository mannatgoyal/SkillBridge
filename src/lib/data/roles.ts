import { JobRole } from '../gapAnalysis';

export const JOB_ROLES: JobRole[] = [
    {
        id: 'frontend-dev',
        title: 'Frontend Developer',
        category: 'Engineering',
        requiredSkills: [
            { name: 'HTML', category: 'Frontend', proficiency: 4 },
            { name: 'CSS', category: 'Frontend', proficiency: 4 },
            { name: 'JavaScript', category: 'Frontend', proficiency: 4 },
            { name: 'React', category: 'Frontend', proficiency: 3 },
            { name: 'TypeScript', category: 'Frontend', proficiency: 3 },
            { name: 'Git', category: 'Tools', proficiency: 3 },
        ],
    },
    {
        id: 'backend-dev',
        title: 'Backend Developer',
        category: 'Engineering',
        requiredSkills: [
            { name: 'Node.js', category: 'Backend', proficiency: 4 },
            { name: 'Python', category: 'Backend', proficiency: 3 },
            { name: 'SQL', category: 'Database', proficiency: 3 },
            { name: 'API Design', category: 'Backend', proficiency: 4 },
            { name: 'Docker', category: 'DevOps', proficiency: 2 },
            { name: 'Git', category: 'Tools', proficiency: 3 },
        ],
    },
    {
        id: 'fullstack-dev',
        title: 'Full Stack Developer',
        category: 'Engineering',
        requiredSkills: [
            { name: 'JavaScript', category: 'Frontend', proficiency: 4 },
            { name: 'React', category: 'Frontend', proficiency: 3 },
            { name: 'Node.js', category: 'Backend', proficiency: 3 },
            { name: 'SQL', category: 'Database', proficiency: 3 },
            { name: 'Git', category: 'Tools', proficiency: 3 },
            { name: 'System Design', category: 'Architecture', proficiency: 3 },
        ],
    },
];
