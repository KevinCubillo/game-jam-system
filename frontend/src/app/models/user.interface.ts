export interface User {
  email: string;
  password: string;
  nombre: string;
  lastname: string;
  role: string[]; 
  gender?: string;
  timezone?: string;
  phoneNumber?: string;
  birthdate?: Date;
}