import * as config from "../../package.json";

interface InfoStyleConfig {
  color?: string;
  backgroundColor?: string;
}

interface JoyUserData {
  startingTime: number;
  userHit: number;
}

export default class Console {
  public static readonly defaultStyle: InfoStyleConfig = {
    color: "#d3dbe2",
    backgroundColor: "#333333"
  };

  public static snapShot(infoStyle?: InfoStyleConfig): void {
    infoStyle = Object.assign({}, this.defaultStyle, infoStyle);
    this.getAppInfo(infoStyle);
    this.getLoadTime(infoStyle);
    this.getJoyUser(infoStyle);
  }

  // 打印应用信息
  public static getAppInfo(
    infoStyle: InfoStyleConfig = this.defaultStyle
  ): void {
    console.log(
      `\n%c ${this.phraseToUpperCase(config.name)} | @${config.author} | v${
        config.version
      } | ${config.license} \n%c Repository: ${config.repository.url} \n`,
      `color: ${infoStyle.color}; background-color: ${infoStyle.backgroundColor}; padding: 2px 0px;`,
      `color: ${infoStyle.backgroundColor}; background-color: ${infoStyle.color}; padding: 2px 0px;`
    );
  }

  // 打印响应时间
  public static getLoadTime(
    infoStyle: InfoStyleConfig = this.defaultStyle
  ): void {
    console.log(
      `%c Load time: ${(
        Math.round(performance.now() * 100) /
        100 /
        1000
      ).toFixed(2)}s `,
      `color: ${infoStyle.color}; padding: 2px 0px;`
    );
  }

  // 打印访问次数，local storage
  public static getJoyUser(infoStyle: InfoStyleConfig = this.defaultStyle) {
    let joyUserData: JoyUserData;
    let time: number;
    let hit: number;

    if (!localStorage.getItem("joyUser")) {
      time = new Date().getTime();
      hit = 0;
    } else {
      joyUserData = JSON.parse(localStorage.getItem("joyUser") as string);
      time = joyUserData.startingTime;
      hit = joyUserData.userHit;
    }

    const formatedTime = new Date(time);
    hit++;
    joyUserData = {
      startingTime: time,
      userHit: hit
    };

    localStorage.setItem("joyUser", JSON.stringify(joyUserData));
    console.log(
      `%c You visited here ${hit} time${
        hit > 1 ? "s" : ""
      } since ${formatedTime.getFullYear()}.${formatedTime.getMonth()}.${formatedTime.getDate()} ${formatedTime.getHours()}:${formatedTime.getMinutes()}. `,
      `color: ${infoStyle.color}; padding: 2px 0px;`
    );
  }

  // 每个单词首字母大写
  private static phraseToUpperCase(sentence: string): string {
    return sentence
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
      .join("-");
  }
}
