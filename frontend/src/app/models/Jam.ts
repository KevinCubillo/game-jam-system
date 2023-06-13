import { Site } from './Site';
export interface Jam {
  _id: string;
  categories: string[][];
  name: string;
  endDate: string;
  startDate: string;
  theme: string;
  experiences: string[];
  sites: string[]; 
}