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
  userData: {
    username: string
    id: string
  }
}

export interface Title {
  Title: string;
}

export interface DataItem {
  date: string;
  count: number;
}
