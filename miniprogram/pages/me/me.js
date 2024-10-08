Page({
  data: {
    openid: '',
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

  onLoad() {
    //获取openid
    var that = this
    wx.cloud.callFunction({
      // 云函数名称
      name: 'login',
      // 云函数获取结果
      success: function(res) {
        console.log("云函数调用成功！",res)
        
        //抓取数据
        that.setData({
          openid: res.result.userInfo.openId
        })
        //将数据缓存到本地
        wx.setStorage({
          data: that.data.openid,
          key: 'openid',
        })
        //
        let opid = wx.getStorageSync('openid')
        console.log(opid)
      },
      fail: function(error) {
        console.log("云函数调用失败！",error)
      },
    })

    //从数据库获取用户信息
    // 获取 openid
const openid = wx.getStorageSync('openid');

if (openid) {
  // 云开发的数据库
  const db = wx.cloud.database();
  const collection = db.collection('mp_register_user');

  // 根据 openid 查询用户信息
  collection.where({
    _openid: openid
  }).get().then(res => {
    if (res.data.length > 0) {
      // 获取到用户信息
      const user = res.data[0];

      // 将用户信息存储到本地数据对象 userInfo 中
      const userInfo = {
        name: user.name,
        idNumber: user.idNumber,
        gender: user.gender,
        age: user.age,
        organization: user.organization,
        phone: user.phone,
        photo: user.photo
      };

      // 将 userInfo 存储到本地缓存中（可选）
      wx.setStorageSync('userInfo', userInfo);

      // 打印 userInfo 以供调试
      console.log('User Info:', userInfo);
    } else {
      console.log('User not found');
    }
  }).catch(err => {
    console.error('Failed to get user info:', err);
  });
} else {
  console.log('Openid not found');
}
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
