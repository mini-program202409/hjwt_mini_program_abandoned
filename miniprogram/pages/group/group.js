Page({
  data: {
    groups: []  // 分组列表，将根据选择的赛事加载
  },

  onLoad(options) {
    const competitionId = options.competitionId;
    const competitionName = options.competitionName;
    this.setData({
      competitionId: competitionId,
      competitionName: competitionName
    });
    this.loadGroups(competitionId);  // 根据赛事ID加载对应的分组
  },

  loadGroups(competitionId) {
    // 模拟获取分组数据
    const groups = {
      1: [{ id: 1, name: '男子组' }, { id: 2, name: '女子组' }],
      2: [{ id: 3, name: '成年组' }, { id: 4, name: '青年组' }],
      3: [{ id: 5, name: '初级组' }, { id: 6, name: '高级组' }],
    };

    this.setData({
      groups: groups[competitionId] || []
    });
  },

  onSelectGroup(e) {
    const selectedGroupId = e.currentTarget.dataset.id;
    const selectedGroupName = this.data.groups.find(group => group.id === selectedGroupId).name;

    wx.navigateTo({
      url: `/pages/role/role?groupId=${selectedGroupId}&groupName=${selectedGroupName}&competitionId=${this.data.competitionId}&competitionName=${this.data.competitionName}`
    });
  }
});
