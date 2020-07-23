import enum2List, { LabelList } from "@/utils/enum2List";

export enum Roles {
  "user",
  "college_admin",
  "office_admin",
  "root"
}

export const rolesObject = {
  user: "普通用户",
  college_admin: "学院管理员",
  office_admin: "科室管理员",
  root: "Root 管理员"
};

export const rolesList = enum2List(Roles, rolesObject);

// 唉，随便写写好了
export const rolesListForUserManager = (() => {
  const rolesArr = [];
  for (let index = 0, length = rolesList.length; index < length; index++) {
    const role = rolesList[index];
    rolesArr.push(
      Object.assign({}, role, {
        disabled: role.key === Roles.user || role.key === Roles.root
      })
    );
  }

  return rolesArr;
})();
