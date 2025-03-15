export interface User {
    _id: string;
    name: string;
    email: string;
    tel : string;
    adress: string;
pdf:String;
postal: string;
Fav : any,
estate: string;
ville: string;
gender: string;   
role?: string;
pts :  any // Optional role field if applicable
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }