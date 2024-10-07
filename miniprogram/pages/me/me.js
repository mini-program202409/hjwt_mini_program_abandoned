Page({
  data: {
    name: '张三',
    idNumber: '123456789012345678',
    gender: '男',
    age: '30',
    organization: 'XX大学',
    phone: '13812345678',
    photo: 'https://example.com/photo.jpg',
    registeredCompetitions: [
      {
        competitionName: '篮球比赛',
        group: '男子组',
        role: '队员'
      },
      {
        competitionName: '足球比赛',
        group: '青年组',
        role: '教练'
      }
    ]
  },

  onShow() {
    // 从本地存储获取最新的用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        name: userInfo.name,
        idNumber: userInfo.idNumber,
        gender: userInfo.gender,
        age: userInfo.age,
        organization: userInfo.organization,
        phone: userInfo.phone,
        photo: userInfo.photo,
      });
    }
  },

  onEdit() {
    wx.navigateTo({
      url: `/pages/info_modification/info_modification?name=${this.data.name}&idNumber=${this.data.idNumber}&gender=${this.data.gender}&age=${this.data.age}&organization=${this.data.organization}&phone=${this.data.phone}&photo=${this.data.photo}`
    });
  }
});
