import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios/";

import { Department, Kind, Level, Prize } from "@/interface/list-data";
import store from "@/plugins/store";
import { Class1 } from "@/static-data/work-order";

/**
 * GET 获取列表
 * @param api string 接口链接
 * @param config AxiosRequestConfig
 */
export const getData = (api: string, config: AxiosRequestConfig = {}) =>
  axios
    .get(
      api,
      Object.assign(
        {},
        {
          headers: { token: store.getters.token }
        },
        config
      )
    )
    .then((res: AxiosResponse) =>
      res.data.code === 0 ? res.data.data : Promise.reject(res.data.msg)
    );

/**
 * POST 获取数据
 * @param api string 接口链接
 * @param config AxiosRequestConfig
 */
export const postData = (
  api: string,
  body: any,
  config: AxiosRequestConfig = {}
) =>
  axios
    .post(
      api,
      body,
      Object.assign(
        {},
        {
          headers: { token: store.getters.token }
        },
        config
      )
    )
    .then((res: AxiosResponse) =>
      res.data.code === 0 ? res.data.data : Promise.reject(res.data.msg)
    );

/**
 * 获取成果列表
 *
 *
 */
export const fetchKindList = (config: AxiosRequestConfig) =>
  new Promise<Kind[]>(resolve => {
    const kind = (store.getters[
      Class1.get(config.params.class1) as string
    ] as unknown) as Kind[];

    resolve(
      kind.length > 0
        ? kind
        : getData("/api/common/kind/list", config).then(data => {
            store.commit("setOption", {
              name: Class1.get(config.params.class1) as string,
              data: data
            });
            return data;
          })
    );
  });

/**
 * 获取部门列表
 *
 * 不接收任何参数
 */
export const fetchDepartmentList = () =>
  new Promise<Department[]>(resolve => {
    const department = (store.getters.department as unknown) as Department[];

    resolve(
      department.length > 0
        ? department
        : getData("/api/common/department/list").then(data => {
            store.commit("setOption", {
              name: "department",
              data: data
            });
            return data;
          })
    );
  });

/**
 * 获取级别列表
 *
 * 不接收任何参数
 */
export const fetchLevelList = () =>
  new Promise<Level[]>(resolve => {
    const level = (store.getters.level as unknown) as Level[];

    resolve(
      level.length > 0
        ? level
        : getData("/api/common/level/list").then(data => {
            store.commit("setOption", {
              name: "level",
              data: data
            });
            return data;
          })
    );
  });

/**
 * 获取奖项列表
 *
 * 不接收任何参数
 */
export const fetchPrizeList = () =>
  new Promise<Prize[]>(resolve => {
    const prize = (store.getters.prize as unknown) as Prize[];

    resolve(
      prize.length > 0
        ? prize
        : getData("/api/common/prize/list").then(data => {
            store.commit("setOption", {
              name: "prize",
              data: data
            });
            return data;
          })
    );
  });
