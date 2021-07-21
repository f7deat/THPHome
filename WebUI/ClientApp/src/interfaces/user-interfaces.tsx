interface UserInterface {
    id: string;
    email: string;
    emailConfirmed: boolean;
    accessFailedCount: number;
    userName: string;
    phoneNumber?: string;
    phoneNumberConfirmed: string;
    lockoutEnabled: boolean;
    lockoutEnd?: Date
}

export type { UserInterface }