export interface Skill {
    name: string;
    category: string;
    proficiency: number; // 1-5
}

export interface JobRole {
    id: string;
    title: string;
    category: string;
    requiredSkills: Skill[];
}

export interface LearningResource {
    title: string;
    url: string;
    type: 'course' | 'article' | 'video';
}

export interface RoadmapItem {
    skillName: string;
    currentProficiency: number;
    targetProficiency: number;
    priority: 'High' | 'Medium' | 'Low';
    resources: LearningResource[];
}

export interface LearningRoadmap {
    roleTitle: string;
    items: RoadmapItem[];
}

export const calculateGap = (userSkills: Skill[], targetRole: JobRole): LearningRoadmap => {
    const roadmapItems: RoadmapItem[] = [];

    targetRole.requiredSkills.forEach((reqSkill) => {
        const userSkill = userSkills.find((s) => s.name.toLowerCase() === reqSkill.name.toLowerCase());
        const currentProficiency = userSkill ? userSkill.proficiency : 0;

        if (currentProficiency < reqSkill.proficiency) {
            roadmapItems.push({
                skillName: reqSkill.name,
                currentProficiency,
                targetProficiency: reqSkill.proficiency,
                priority: reqSkill.proficiency - currentProficiency >= 3 ? 'High' : 'Medium',
                resources: [], // To be populated
            });
        }
    });

    return {
        roleTitle: targetRole.title,
        items: roadmapItems.sort((a, b) => (a.priority === 'High' ? -1 : 1)),
    };
};
