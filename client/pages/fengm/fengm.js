//index.js
//获取应用实例
const defalutUrl = require('../../utils/url.js').defalutUrl;
Page({
  data: {
    topNavtitle:'逢魔',
    curtitle:'',
    curUrl:'',
    //获取数据
    fengmTable:[],
    fengmId: '',
    fengmPepole: '',
    fengmYuhun1: '',
    fengmYuhun2: '',
    fengmSudu: '',
    fengmTips: ''
  },
  onLaunch: function () {
    wx.clearStorage();
  },
  onPageNotFound: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLoad: function (options) {
  //设置标题
    var that = this;
    //设置路由路径
    this.setData({
      curUrl: this.route,
      curtitle: that.data.topNavtitle
    })
    wx.request({
      url: defalutUrl+'fengm',
      header: {
        'content-type': 'application/json'
        // 默认值
      },
      data: {},
      success: function (res) {
        // console.log(res.data.data)
  //处理数据
        that.getArrayData(res.data.data.res)

        wx.setNavigationBarTitle({
          title: that.data.topNavtitle,
        });

      },
      error: function (a) {
        console.log(a);
      }
    })
  },
  //下拉刷新页面
  onPullDownRefresh: function () {
    //清除缓存
    wx.clearStorage();
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
  getArrayData: function (res) {
    var data = res;
    var fengmTable=[];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        id: i,
        name: data[i].name,
        pepole1: data[i].pepole1.split(','),
        pepole2:data[i].pepole2.split(','),
        yuhun1: data[i].yuhun1.split(','),
        yuhun2: data[i].yuhun2.split(','),
        sudu: data[i].sudu.split(','),
        tips: data[i].tips.split('。')
      }
      fengmTable.push(obj)
    };
    
    this.setData({
      fengmTable: fengmTable
    })

    console.log(this.data.fengmTable)
    //成功之后绑定数据
    // this.setData({
    //   arrayTimeLess: fastArr,
    //   arrayTimeMore: normalArr,
    //   arrayTimeControl: controlArr,
    //   arrayTimeZhen: fanjiZhen,
    //   bannerData: res.data.data.bannerdata
    // });
  }
})
