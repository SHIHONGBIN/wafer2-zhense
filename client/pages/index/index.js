//index.js
//获取应用实例
const defalutUrl = require('../../utils/url.js').defalutUrl;
Page({
    data: {
      text: '阵容大全',
      subText1: '小小黑暴力阵容',
      subText2: '天狗荒稳定阵容',
      subText3: '兵勇阎魔头铁控制阵容',
      subText4: '鸩阵容（New）',
      isleft:false,
      //公告
      notice:[],
      arrayTimeLess: [],
      arrayTimeMore: [],
      arrayTimeControl:[],
      arrayTimeZhen:[],
      bannerData:[],
      topNavtitle:'真蛇大师-首页',
      //上拉加载数组
      messageArray:[],
      page:1,
      pullUpBool:true,
      //url
      curUrl:''
  },
    onLaunch:function(){
    wx.clearStorage();
    },
  gotonewPage: function () {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  changeIsLeft: function(){
    this.setData({
      isleft:false
    }); 
    //可以调用子组件的时间，动态修改子组件的值 
    this.obj.dataInit(); 
  },
  onReady:function() {
    //选择当前的标签
    this.obj = this.selectComponent("#isLeft");
    wx.hideLoading();
  },
  onPageNotFound:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function(){
    this.setData({
      curUrl:this.route
    })
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: defalutUrl,
      header: {
        'content-type': 'application/json' 
        // 默认值
      },
      data:{},
      success:function(res){
        // console.log(res.data.data)
        //获取数据
        that.getArratData(res)
        wx.setNavigationBarTitle({
          title: that.data.topNavtitle,
        })
        wx.hideLoading()
      },
      error:function(a){
        console.log(a);
      }
    })
  },
  //下拉刷新页面
  onPullDownRefresh: function () {
    //清除缓存
    wx.clearStorage();
    //init data
    this.initArrData();
    // 动态设置导航条标题  
    wx.setNavigationBarTitle({
      title: '正在加载'
    });
    //在标题栏中显示加载图标  
    wx.showNavigationBarLoading(); 
    //根据实际情况定义请求的路径  
    let url = defalutUrl;                      
    let that = this;
    // 发送请求  
    wx.request({
      url: url,
      method: 'GET', 
      //请求成功的函数处理  
      success: function (res) {
        //获取数据
        that.getArratData(res)
      },
      fail: function (res) {                             //请求失败的处理  
        console.log(res.data.msg);
      },
      complete: function () {
        wx.hideNavigationBarLoading();                   //完成停止加载  
        // 动态设置导航条标题  
        wx.setNavigationBarTitle({
          title: that.data.topNavtitle,
        })
        wx.stopPullDownRefresh();                       //停止下拉刷新  
      } 
    })
  },
  initArrData:function(){
    this.setData({
      arrayTimeLess: [],
      arrayTimeMore: [],
      arrayTimeControl: [],
      arrayTimeZhen: [],
      bannerData: [],
      notice:[]
    });
  },
  getArratData: function(res){
    var data = res.data.data.res;
    var fastArr = [];
    var normalArr = [];
    var controlArr = [];
    var fanjiZhen = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].name == 'fast') {
        fastArr.push(data[i])
      } else if (data[i].name == 'control') {
        controlArr.push(data[i])
      } else if (data[i].name == 'zhen') {
        fanjiZhen.push(data[i])
      } else {
        normalArr.push(data[i])
      }
    };
    //增加notice 只增加最后一条
    var notices = res.data.data.notice;
    //成功之后绑定数据
    this.setData({
      arrayTimeLess: fastArr,
      arrayTimeMore: normalArr,
      arrayTimeControl: controlArr,
      arrayTimeZhen: fanjiZhen,
      bannerData: res.data.data.bannerdata,
      notice: notices[notices.length - 1].text
    });

  }
})
