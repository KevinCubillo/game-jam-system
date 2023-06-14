export interface User {
  _id: string;
  email: string;
  password: string;
  nombre: string;
  lastname: string;
  roles: string[]; 
  sites: string[];
  gender?: string;
  timezone?: string;
  phoneNumber?: string;
  birthdate?: Date;
}