// FORMS

export type LoginFormType = {
  email: string;
  password: string;
};
export type SignUpFormType = {
  email: string;
  password: string;
  full_name: string;
};

export interface IUser {
  _id: string;
  email: string;
  full_name: string;
  signature?: string;
  password: string;
  type: "admin" | "employee";
}


export interface IColumn {
  name: string;
  uid: string;
}



export interface Result<T> {
  data?: T;
  error?: string;
  meta?: IMeta;
}

export interface IMeta {
  currentPage: number;
  pageItems: number;
  totalItems: number;
  totalPages: number;
}


