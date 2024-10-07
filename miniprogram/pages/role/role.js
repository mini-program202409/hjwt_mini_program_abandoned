Page({
  data: {
    roles: [
      { id: 1, name: '教练' },
      { id: 2, name: '队员' },
    ]
  },

  onLoad(options) {
    const groupId = options.groupId;
    const groupName = options.groupName;
    const competitionId = options.competitionId;
    const competitionName = options.competitionName;
    this.setData({
      groupId: groupId,
      groupName: groupName,
      competitionId: competitionId,
      competitionName: competitionName
    });
  },

  onSelectRole(e) {
    const selectedRoleId = e.currentTarget.dataset.id;
    const selectedRoleName = this.data.roles.find(role => role.id === selectedRoleId).name;

    wx.navigateTo({
      url: `/pages/successful_registration/successful_registration?competitionName=${this.data.competitionName}&groupName=${this.data.groupName}&role=${selectedRoleName}`
    });
  }
});
