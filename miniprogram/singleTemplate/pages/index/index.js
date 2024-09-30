const { webviewSrc, envId } = require("../../config");
import { getUrlWithOpenidToken } from "./openApi";
Page({
  data: {
    shareInfo: {},
    src: "",
  },
  onShareAppMessage() {
    return this.data.shareInfo;
  },
  // 使用 web-view 组件的页面不支持分享到朋友圈
  onShareTimeline() {
    return this.data.shareInfo;
  },
  // 接收 web-view 页面发送的消息
  bindmessage(event) {
    const details = event.detail.data || [];
    const length = details.length;
    if (length > 0) {
      const detail = details[length - 1]?.shareInfo || {};
      const { title = "", imageUrl = "" } = detail || {};
      const shareInfo = {
        title,
        imageUrl,
      };
      this.setData({ shareInfo });
    }
  },
  onReady: async function () {
    if (webviewSrc && envId) {
      // 获取 openid token 并拼接到 webview 的 url 中
      const newSRC = await getUrlWithOpenidToken(webviewSrc, envId, true);
      if (!newSRC) {
        // 暂不提示错误，如有需要可打开注释
        // wx.showToast({ title: '获取授权失败，请稍后再试', icon: 'none' });
        console.warn("获取登录态链接失败，临时使用原始链接");
        this.setData({ src: webviewSrc });
      } else {
        this.setData({ src: newSRC });
      }
    }
  },
});
