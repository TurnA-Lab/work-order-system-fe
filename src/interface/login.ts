import { Roles } from "@/static-data/login";

export interface LoginData {
  roles: Roles[];
  name: string;
  department: string;
  worknum: string;
  token: string;
}
