export interface UserListItem {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatar: string;
    userName: string;
    department: string;
    position: string;
    academicDegree?: string;
    academicTitle?: string;
}

interface Award {
    id: string;
    name: string;
    year: number;
}

interface Department {
    name: string;
    code: number;
}

export interface Language {
    id: string;
    certificate: string;
    level: string;
    language: string;
}

export interface AcademicTitle {
    id: string;
    name: string;
    shortName: string;
}

export interface EducationHistory {
    id: string;
    degree: string;
    major: string;
    institution: string;
    graduationYear: number;
}

export interface ResearchProject {
    id: string;
    name: string;
    startYear: number;
    endYear: number;
}

export interface LecturerDetail {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    awards?: Award[];
    department?: Department;
    languages?: Language[];
    educationHistories?: EducationHistory[];
    address?: string;
    email?: string;
    phoneNumber?: string;
    academicTitle?: AcademicTitle;
    researchProjects?: ResearchProject[];
    city?: string;
}