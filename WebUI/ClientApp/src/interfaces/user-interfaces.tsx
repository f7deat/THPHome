interface UserInterface {
    id: string;
    email: string;
    emailConfirmed: boolean;
    accessFailedCount: number;
    userName: string;
    phoneNumber?: string;
    phoneNumberConfirmed: string;
    lockoutEnabled: boolean;
    lockoutEnd?: Date;
    name: string;
    jobTitle: string;
    avatar: string;
}

export type { UserInterface }