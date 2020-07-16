import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios/";

import store from "@/plugins/store";

/**
 * GET 获取列表
 * @param api string 接口链接
 * @param config AxiosResponse
 */
export const getData = (api: string, config: AxiosRequestConfig = {}) =>
  axios
    .get(
      api,
      Object.assign(
        {},
        {
          headers: { token: store.state.userInfo.token }
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
 * @param config AxiosResponse
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
          headers: { token: store.state.userInfo.token }
        },
        config
      )
    )
    .then((res: AxiosResponse) =>
      res.data.code === 0 ? res.data.data : Promise.reject(res.data.msg)
    );

/**
 * 获取部门列表
 *
 * 不接收任何参数
 */
export const fetchDepartmentList = getData.bind(
  null,
  "/api/common/department/list",
  {}
);

// 获取成果列表
/**
 * 获取成果列表
 *
 * 接受一个参数，类型为 AxiosResponse
 */
export const fetchKindList = getData.bind(null, "/api/common/kind/list");

/**
 * 获取级别列表
 *
 * 不接收任何参数
 */
export const fetchLevelList = getData.bind(null, "/api/common/level/list", {});

/**
 * 获取奖项列表
 *
 * 不接收任何参数
 */
export const fetchPrizeList = getData.bind(null, "/api/common/prize/list", {});
