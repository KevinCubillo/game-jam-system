export interface Site {
    _id: string;
    globalOrganizer: string;
    country: string;
    city: string;
    judges: string[];
    localOrganizers: string[];
    mentors: string[];
}