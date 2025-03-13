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

export interface LecturerDetail {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
    awards?: Award[];
    department?: Department;
    languages?: Language[];
}