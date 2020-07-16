/* eslint-disable @typescript-eslint/camelcase */

import enum2List from "@/utils/enum2List";

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
