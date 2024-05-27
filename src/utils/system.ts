
/**
 * 
 * @returns 
 * system：系统
 * platform：平台
 * supporter：载体
 * shell：外壳
 */
export const getShowVideo = () => {
  const ua = navigator.userAgent.toLowerCase();
  const testUa = regexp => regexp.test(ua);

  // 系统
  let system = "unknown";
  if (testUa(/android|adr/ig)) {
    system = "android"; // android系统
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/ig)) {
    system = "ios"; // ios系统
  }

  let platform = "unknow";
  if (system === "windows" || system === "osx" || system === "linux") {
    platform = "desktop"; // 桌面端
  } else if (system === "android" || system === "ios" || testUa(/mobile/ig)) {
    platform = "mobile"; // 移动端
  }

  let shell = "none";

  if (testUa(/applewebkit/ig) && testUa(/safari/ig)) {
    if (testUa(/chrome/ig)) {
      shell = "chrome"; // chrome浏览器
    } else {
      shell = "safari"; // safari浏览器
    }
  }

  if (testUa(/micromessenger/ig)) {
    shell = "wechat";
  } else if (testUa(/qqbrowser/ig)) {
    shell = "qq";
  } else if (testUa(/ucbrowser/ig)) {
    shell = "uc";
  } else if (testUa(/vivobrowser/ig)) {
    shell = "vivo";
  } else if (testUa(/baiduboxapp/ig)) {
    shell = "baidu";
  } else if (testUa(/huaweibrowser/ig)) {
    shell = "huawei";
  } else if (testUa(/quark/ig)) {
    shell = "quark";
  }

  let show = false
  if (platform === 'mobile') {
    if (system === 'ios') {
      if (['safari', 'chrome'].includes(shell)) {
        show = true
      }
    }
    if (system === 'android') {
      if (['quark', 'huawei', 'baidu', 'wechat', 'uc', 'chrome'].includes(shell)) {
        show = true
      }
    }
  } else {
    show = true
  }

  return {
    shell,
    platform,
    system,
    show
  }
}