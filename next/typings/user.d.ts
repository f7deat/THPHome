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
    dateOfBirth?: string;
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

export interface Book {
    id: string;
    name: string;
    authors: string;
    publisher: string;
    publishYear: number;
    ibsn: string;    
}

interface Achievement {
    id: string;
    name: string;
    year: number;
}

interface WorkingExperience {
    id: string;
    position: string;
    workplace: string;
    companyName: string;
    startDate: number;
    endDate: number;
    description: string;
}

interface Journal {
    id: string;
    name: string;
    issn: string;
    authorCount: number;
    volume: string;
    issue: string;
    page: string;
    publishYear: number;
}

interface TeachingExperience {
    id: string;
    courseCode: string;
    courseName: string;
    description: string;
    level: string;
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
    books?: Book[];
    achievements?: Achievement[];
    journals?: Journal[];
    workingExperiences?: WorkingExperience[];
    teachingExperiences?: TeachingExperience[];
    facebook: string;
    linkedin: string;
    website: string;
}