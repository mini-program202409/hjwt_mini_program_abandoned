Page({
  data: {
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
    const { name, idNumber, gender, age, organization, phone, photo } = this.data;
    if (!name || !idNumber || !age || !organization || !phone || !photo) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
      });
      return;
    }

    // 保存信息到本地缓存
    wx.setStorageSync('userInfo', { name, idNumber, gender, age, organization, phone, photo });

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
