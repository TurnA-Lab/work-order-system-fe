import { AxiosResponse } from "axios/";
import disposition from "content-disposition";

/**
 * 解析 axios 返回 headers 中的 content-disposition 以获取 filename 。
 * @param res 接收 axios 的 response，解析 content-disposition 中的 filename。
 * @param fallback 接收一个字符串作为没有 content-disposition 时的可选值。
 */
const decodeFilename: (res: AxiosResponse, fallback: string) => string = (
  res,
  fallback
) => {
  if (res.headers["content-disposition"]) {
    return decodeURI(
      disposition.parse(res.headers["content-disposition"]).parameters.filename
    );
  } else {
    return fallback;
  }
};

export default decodeFilename;
