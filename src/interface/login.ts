export enum Roles {
  "user",
  "college_admin",
  "office_admin",
  "root",
}

export const rolesObject = {
  user: "普通用户",
  college_admin: "学院管理员",
  office_admin: "科室管理员",
  root: "Root 管理员",
};

const rolesArr: Array<{ value: string; label: string }> = [];
for (const key in Roles) {
  if (Roles.hasOwnProperty(key) && !isNaN(parseInt(key, 10))) {
    rolesArr.push({
      value: key,
      label: Roles[key],
    });
  }
}

export interface LoginData {
  roles: Roles[];
  name: string;
  department: string;
  worknum: string;
  token: string;
}
