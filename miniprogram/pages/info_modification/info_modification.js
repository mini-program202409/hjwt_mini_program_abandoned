Page({
  data: {
    openid: '',
    name: '',
    idNumber: '',
    gender: '男',
    age: '',
    organization: '',
    phone: '',
    photo: '',
  },

  onLoad(options) {
    this.setData({
      name: options.name || '',
      idNumber: options.idNumber || '',
      gender: options.gender || '男',
      age: options.age || '',
      organization: options.organization || '',
      phone: options.phone || '',
      photo: options.photo || '',
    });

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
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value,
    });
  },

  onGenderChange(e) {
    this.setData({
      gender: e.detail.value,
    });
  },

  onUploadPhoto() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          photo: tempFilePaths[0],
        });
      },
    });
  },

  onSave() {
    const {
      name,
      idNumber,
      gender,
      age,
      organization,
      phone,
      photo
    } = this.data;
    if (!name || !idNumber || !age || !organization || !phone || !photo) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    // 保存信息到本地缓存
    wx.setStorageSync('userInfo', {
      name,
      idNumber,
      gender,
      age,
      organization,
      phone,
      photo
    });


     // 保存信息到数据库
     const db = wx.cloud.database()
     const _ = db.command
     
     // 假设 openid 是你要检测的字段
     const openid = this.data.openid
     console.log(openid)

     // 查询数据库中是否存在相同 openid 的数据
     db.collection('mp_register_user').where({
       _openid: openid
     }).get({
       success: res => {
         if (res.data.length > 0) {
           // 如果存在相同 openid 的数据，则更新数据
           db.collection('mp_register_user').doc(res.data[0]._id).update({
             data: {
               name: name,
               idNumber: idNumber,
               gender: gender,
               age: age,
               organization: organization,
               phone: phone,
               photo: photo,
               updatedAt: db.serverDate(), // 更新时间
             },
             success: res => {
               console.log('数据更新成功', res)
               wx.showToast({
                 title: '更新成功',
               })
             },
             fail: err => {
               console.error('数据更新失败', err)
               wx.showToast({
                 title: '更新失败',
                 icon: 'none',
               })
             }
           })
         } else {
           // 如果不存在相同 openid 的数据，则添加数据
           db.collection('mp_register_user').add({
             data: {
               openid: openid, // 添加 openid 字段
               name: name,
               idNumber: idNumber,
               gender: gender,
               age: age,
               organization: organization,
               phone: phone,
               photo: photo,
               createdAt: db.serverDate(),
             },
             success: res => {
               console.log('数据上传成功', res)
               wx.showToast({
                 title: '上传成功',
               })
             },
             fail: err => {
               console.error('数据上传失败', err)
               wx.showToast({
                 title: '上传失败',
                 icon: 'none',
               })
             }
           })
         }
       },
       fail: err => {
         console.error('查询数据库失败', err)
         wx.showToast({
           title: '查询失败',
           icon: 'none',
         })
       }
     })

    wx.showToast({
      title: '已保存',
      icon: 'success',
    });

    // 返回上一个页面并更新数据
    const pages = getCurrentPages();
    const previousPage = pages[pages.length - 2]; // 获取上一个页面
    previousPage.onShow(); // 调用上一个页面的 onShow 方法更新数据

    wx.navigateBack(); // 返回上一个页面
  },
});