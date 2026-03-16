export interface Student {
    id: number;
    key: string;
    name: string;
    costume: string;
    school: string;
    affiliation: string;
    image?: string; // For backward compatibility or temp storage
    imageId: string; // Key for IndexedDB
    owned: boolean;
    level: number;
    affection: number;
    stars: string; // e.g., 'blue4', 'yellow3'
    
    // Equipment & Skills
    skill1?: number;
    skill2?: number;
    skill3?: number;
    skill4?: number;
    equip1?: number;
    equip2?: number;
    equip3?: number;
    loveItem?: string;
}

export interface SchoolEntry {
    school: string;
    affiliation: string;
}

export type FilterType = 'all' | 'owned' | 'unowned';
export type SortType = 'default' | 'name' | 'level' | 'yellowStars' | 'bondLevel';

export interface StudentGroup {
    school: string;
    affiliations: {
        affiliation: string;
        students: Student[];
    }[];
}

export interface SchoolMap {
    [key: string]: SchoolEntry;
}