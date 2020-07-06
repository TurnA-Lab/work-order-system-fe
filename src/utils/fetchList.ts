import { AxiosRequestConfig, AxiosResponse } from "axios/";
import axios from "axios";
import store from "@/plugins/store";

/**
 * 获取列表
 * @param listApi string 接口链接
 * @param config AxiosResponse
 */
export const fetchList = (listApi: string, config: AxiosRequestConfig) =>
  axios
    .get(
      listApi,
      Object.assign(
        {
          headers: {
            token: store.state.userInfo.token,
          },
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
export const fetchDepartmentList = fetchList.bind(
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
export const fetchKindList = fetchList.bind(null, "/api/common/kind/list");

/**
 * 获取级别列表
 *
 * 不接收任何参数
 */
export const fetchLevelList = fetchList.bind(
  null,
  "/api/common/level/list",
  {}
);

/**
 * 获取奖项列表
 *
 * 不接收任何参数
 */
export const fetchPrizeList = fetchList.bind(
  null,
  "/api/common/prize/list",
  {}
);
