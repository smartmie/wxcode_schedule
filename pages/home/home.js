// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"请输出学号",
    password:"请输入密码",
    security_code:"请输出验证码",
    src: "https://wifi-express.com/img"
  },
  id: function(e){
    this.data.id = e.detail.value
  },
  password: function(e){
    this.data.password = e.detail.value
  },
  security_code: function(e){
    this.data.security_code = e.detail.value
  },
  get_img: function(){
    console.log("11")
    this.setData({
      src: "https://wifi-express.com/img?"+Math.random()/999
    })
    
  },
  img_error: function(){
    this.setData({
      src: "/src/error.jpg"
    })
    wx.showToast({
      title: '连接错误',
      icon: "error",
      duration: 1500,
      mask:true
    })
  },
  tap: function(event){
    console.log(this.data.id)
    console.log(this.data.password)
    console.log(this.data.security_code)
    if(this.data.id == "请输出学号" || this.data.password == "请输入密码" || this.data.security_code == "请输出验证码")
    {
      wx.showToast({
        title: '输入正确内容',
        icon: 'error',
        duration: 1500,
        mask:true
    });
    return 0;
    }
    wx.showLoading({
      title: '登入中',
    })
    let that = this
    wx.request({
      url:'https://wifi-express.com/login?id='+this.data.id+"&password="+this.data.password+"&yzm="+this.data.security_code,
      data: {
      },
      method: 'GET',
      success(res){
        console.log(res.data)
        var kb = res.data
        if(res.data == "404"){
          console.log(404)
          wx.showToast({
            title: '登入错误',
            icon: 'error'
          });
          that.setData({
            src: "https://wifi-express.com/img?"+Math.random()/999
          });
          return 0;
        }
        app.globalData.now = res.data.now
        app.globalData.res_data = res.data
        app.parseJson(kb);
        app.nav_week(res.data.now);
        wx.reLaunch({
        url: '../homepage/homepage'
        })
        wx.hideLoading()
      },
      fail(){
        wx.hideLoading()
        wx.showToast({
          title: '连接错误',
          icon: "error",
          duration: 1500,
          mask:true
        })
        that.setData({
          src: "https://wifi-express.com/img?"+Math.random()/999
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})