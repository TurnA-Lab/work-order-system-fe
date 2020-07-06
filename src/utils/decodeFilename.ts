import { AxiosResponse } from "axios/";
import disposition from "content-disposition";

/**
 * 解析 axios 返回 headers 中的 content-disposition 以获取 filename 。
 * @param res 接收 axios 的 response，解析 content-disposition 中的 filename。
 * @param fallbackFilename 接收一个字符串作为没有 content-disposition 时的可选值。
 */
const decodeFilename: (res: AxiosResponse, fallback: string) => string = (
  res,
  fallbackFilename
) =>
  typeof res.headers["content-disposition"] === "undefined"
    ? decodeURI(
        disposition.parse(res.headers["content-disposition"]).parameters
          .filename
      )
    : fallbackFilename;

export default decodeFilename;
