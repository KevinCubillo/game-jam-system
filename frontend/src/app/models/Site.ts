import { User } from './user.interface';
export interface Site {
    _id: string;
    jamId: string;
    country: string;
    city: string;
    judges: User[];
    localOrganizers: User[];
    mentors: User[];
}