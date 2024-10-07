Page({
  data: {
    competitions: [
      { id: 1, name: '篮球比赛' },
      { id: 2, name: '足球比赛' },
      { id: 3, name: '羽毛球比赛' },
    ]
  },

  onSelectCompetition(e) {
    const selectedCompetitionId = e.currentTarget.dataset.id;
    const selectedCompetitionName = this.data.competitions.find(comp => comp.id === selectedCompetitionId).name;

    wx.navigateTo({
      url: `/pages/group/group?competitionId=${selectedCompetitionId}&competitionName=${selectedCompetitionName}`
    });
  },

  onDownload() {
    wx.navigateTo({
      url: '/pages/competition_document/competition_document'
    });
  }
});
