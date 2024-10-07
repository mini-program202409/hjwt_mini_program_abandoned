Page({
  data: {
    files: []
  },

  onLoad() {
    // 假设从服务器获取文件数据
    wx.request({
      url: 'https://example.com/api/files', // 后台API地址
      success: (res) => {
        const files = res.data.files;
        // 将文件按上传日期倒序排列
        files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        this.setData({ files });
      },
      fail: () => {
        wx.showToast({
          title: '获取文件失败',
          icon: 'none'
        });
      }
    });
  },

  onDownload(e) {
    const url = e.currentTarget.dataset.url;
    wx.downloadFile({
      url: url, 
      success: (res) => {
        if (res.statusCode === 200) {
          // 文件下载成功，打开下载的文件
          wx.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              console.log('文件打开成功');
            },
            fail: () => {
              wx.showToast({
                title: '打开文件失败',
                icon: 'none'
              });
            }
          });
        }
      },
      fail: () => {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        });
      }
    });
  }
});
