// app.js
App({
  globalData: {
    res_data:null,
    now:"",
    userInfo: null,
    data: "11",
    schedule: "",
    week: "",
    curriculum: null,
    userInfo: {},
  },
  parseJson(kb){
    console.log(kb)
    var week = ["一", "二", "三", "四", "五", "六", "七"]
    var color = [
      "#86ea63",
      "#fc9eda",
      "#8baffd",
      "#f7c45b",
      "#ab8ffe",
      "#8ae9eb",
      "#b1eb4b",
      "#f7c45b"
    ]
    var now = this.globalData.now
    var tem_tab = [];
    var tem_name = [];
    var tem_bg = [];
    var height = [];
    var tem_size = [];
    var tem_time_start_end = "";
    for(var i = 0; i < 14; i++){
      var tem_week = week[i<=6?i:i-7]
      var tem_count = i<=6 ? 0 : 4
      var element = 0
      var tem_kb = i <= 6 ? kb[tem_week].am : kb[tem_week].pm
      var random =Math.round(Math.random()*4);
      // console.log(kb)
      for(element in tem_kb){
        if (!(parseInt(tem_kb[element].start_TO_end_week[0]) <= now && now < parseInt(tem_kb[element].start_TO_end_week[1]))){
          continue;
        }else if((now%2) != parseInt(tem_kb[element].single_double) && tem_kb[element].single_double != "2"){
          continue;
        }
        var tem_start_end = tem_kb[element].start_end;
        var count = parseInt(tem_start_end[0]) - 1;
        for(var a = 0; a < (count - tem_count); a++){
          height.push("9.25vh")
          tem_bg.push("")
          tem_name.push("")
          tem_size.push(0)
        }
        tem_count = parseInt(tem_start_end[1])
        height.push(tem_kb[element].div)
        tem_size.push(parseInt(tem_kb[element].size))
        tem_name.push((tem_kb[element].course_name).slice(0,(parseInt(tem_kb[element].size))*2) +" @"+tem_kb[element].course_place)
        tem_bg.push(color[random + parseInt(element)])
        tem_time_start_end = tem_kb[element].time_start_end
      }
      var text = {
        size: tem_size,
        id: height.length,
        name : tem_name,
        bg: tem_bg,
        height: height,
        time_start_end: tem_time_start_end
      }
      tem_tab.push(text);
      tem_name =  [];
      tem_bg = [];
      height = [];
      tem_size = [];
    }
    this.globalData.curriculum = tem_tab;
    console.log(this.globalData.curriculum)
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    let that = this
    wx.showLoading({
      title: '登入中',
    })
    wx.login({
      success: res => {
        wx.request({
          url: 'https://wifi-express.com/getopenid?code='+res.code,
          method: 'GET',
          success(res){
            var data = res.data
            // console.log(res.data)
            if (data == "404"){
              wx.hideLoading()
              return;
            }
            wx.showLoading({
              title: '加载中',
              mask: true
            })
            that.globalData.now = res.data.now
            that.globalData.res_data = res.data
            that.nav_week(res.data.now)
            that.parseJson(res.data)
            wx.reLaunch({
              url: '../homepage/homepage'
            })
            console.log("完成")
            wx.hideLoading()
          },
          fail(){
            wx.hideLoading()
          }
        })
      }
    })

    //周几的设置
    var tem_int_to_str = [
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "日",
    ]
    var now = new Date();
    var tem_schedule = [];
    var tem_now = new Date(now.setDate(now.getDate()-(now.getDay() == 0 ? 6:now.getDay()-1)))
    var now_week = new Date();
    console.log(now_week.getDay())
    for(var i=1; i <= 7; i++){
      var tem = {
        week: "周"+tem_int_to_str[i-1],
        date: (tem_now.getMonth() + 1)+"\/"+tem_now.getDate(),
        color: (now_week.getDay()) == ((i)%7) ? "#dce6ef":"#fdfdfd"
      }
      var tem_now = new Date(now.setDate(now.getDate()+1))
      tem_schedule.push(tem);
    }
    this.globalData.schedule = tem_schedule
  },
  nav_week(now){
    var tem_week = [];
    console.log("第几周", now)
    for(var i=1; i < 21; i++){
      var tem_tab = {
        week:"",
        bg:"",
        id:null,
        color: "",

      };
      tem_tab.week = "第"+i+"周"
      tem_tab.id = String(i)
      tem_tab.color = parseInt(now) == i ? "#618fda":"#222848"
      // tem_week.push("第"+i+"周")
      tem_week.push(tem_tab)
      // tem_tab.bg = parseInt(this.globalData.now) == i ? "#182f4e":"#ffffff"
      // tem_week.push(tem_tab)
    }
    this.globalData.week = tem_week
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
        })
      }
    })
  },
})
