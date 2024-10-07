Page({
  data: {
    competitionName: '',
    groupName: '',
    role: ''
  },

  onLoad(options) {
    this.setData({
      competitionName: options.competitionName,
      groupName: options.groupName,
      role: options.role
    });
  },

  // 返回我的信息页面，查看已报名赛事
  onBackToMe() {
    wx.switchTab({
      url: '/pages/me/me'
    });
  }
});
