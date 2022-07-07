const app = getApp()
Page({
  data: {
      index:0,
      num:null,
      list: [
        // {
        //   "text": "讨论",
        // "iconPath": "/src/me_active.png",
        // "selectedIconPath": "/src/me.png"
        //   // badge: 'New'
        // },
        {
          "text": "课表",
          "iconPath": "/src/kb_active.png",
          "selectedIconPath": "/src/kb.png"
          // dot: true
      },
      {
          "text": "我的",
        "iconPath": "/src/me_active.png",
        "selectedIconPath": "/src/me.png"
          // badge: 'New'
      },
      ],
      tabl: [],
      week: [],
      schedule: [],
      dialogShow: false,
      buttons: [{text: '确定'}],
      text: "",
      time_start_end:"",
      userInfo: {},
      show_scroll: false,
      now: ""
  },
  div_color(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      num: e.currentTarget.dataset.index
    })
  },
  change_week(e){
    app.globalData.now = e.currentTarget.dataset.id
    app.parseJson(app.globalData.res_data)
    this.to_load()
  },
  show_scroll(){
    if(this.data.show_scroll){
      console.log("显示")
      this.setData(
        {
          show_scroll: false
        }
      )
    }else{
      console.log("关闭")
      this.setData(
        {
          show_scroll: true
        }
      )
    }
  },
  tap_shut(){
    this.setData({
      dialogShow: false
    });
    
  },
  tap_dialog(e){
    if(e.currentTarget.dataset.name == ""){
      return
    }
    this.setData({
      dialogShow: true,
      text: e.currentTarget.dataset.name,
      time_start_end: e.currentTarget.dataset.t
    });
  },
  tabChange(e) {
    this.setData({
      index: e.detail.index
    });
      // console.log('tab change', e.detail.index)
  },
  onLoad(){
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
    this.setData({
      week: app.globalData.week,
      schedule: app.globalData.schedule,
      tabl: app.globalData.curriculum,
      userInfo: app.globalData.userInfo,
      now: app.globalData.now
    })
    // console.log(app.globalData.data)
  },
  to_load(){
    this.setData({
      week: app.globalData.week,
      schedule: app.globalData.schedule,
      tabl: app.globalData.curriculum,
      userInfo: app.globalData.userInfo,
    })
  },
  onReady(){
  },
  onShow(){
    
  }
});