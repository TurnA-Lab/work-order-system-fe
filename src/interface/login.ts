export enum Roles {
  "user",
  "college_admin",
  "office_admin",
  "root",
}

export interface LoginData {
  roles: Roles[];
  name: string;
  department: string;
  worknum: string;
  token: string;
}
