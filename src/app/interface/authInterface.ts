export interface SignInData {
    username: string;
    password: string;
  }
  
  export interface User {
      id?: number;
      first_name?: string;
      last_name?: string;
      email?: string;
      username: string;
      role?: string;
      gender?: string;
    };
  
  export interface userResponse {
    token: string;
    user: User;
  }
  
  export interface Title {
    title: string;
  }
  