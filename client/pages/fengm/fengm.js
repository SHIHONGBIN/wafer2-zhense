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
    //上拉加载数组
    messageArray: [],
    page: 1,
    pullUpBool: true,
    //拖到底部提示加载完成
    texttips: '上拉加载更多',
    curPageTitle: '',
    iphonexcss: ''
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
      url: url +'fengm',
      method: 'GET',
      //请求成功的函数处理  
      success: function (res) {
        //获取数据
        that.getArrayData(res.data.data.res)
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


    //成功之后绑定数据
    // this.setData({
    //   arrayTimeLess: fastArr,
    //   arrayTimeMore: normalArr,
    //   arrayTimeControl: controlArr,
    //   arrayTimeZhen: fanjiZhen,
    //   bannerData: res.data.data.bannerdata
    // });
  },
  formateDate: function (contact) {
    var data = new Date();
    var y = data.getFullYear();
    var mo = data.getMonth() * 1 + 1;
    var d = data.getDate();
    var h = data.getHours();
    var mi = data.getMinutes();
    var s = data.getSeconds();
    return y + contact + mo + contact + d + ' ' + ' ' + h + ':' + mi + ':' + s
  },
  //监听子组件提交成功事件
  myEventListener: function (e) {
    var obj = {
      id: 0,
      name: e.detail.name.replace(/\w+/, ''),
      text: decodeURIComponent(e.detail.data),
      time: this.formateDate('-'),
      className: e.detail.className,
      userRepay: ''
    };
    var arr = this.data.messageArray;
    arr.unshift(obj);
    this.setData({
      messageArray: arr
    })
  },
  //上拉加载浏览
  onReachBottom: function () {
    let that = this;
    if (that.data.pullUpBool == true) {
      that.setData({
        pullUpBool: false
      });

      setTimeout(function () {
        that.setData({
          pullUpBool: true
        });
      }, 1000)
      // wx.stopReachBottom(); 
      var page = that.data.page;

      //根据实际情况定义请求的路径  
      let url = defalutUrl + 'fengm';

      wx.showLoading({
        title: '努力加载中'
      });

      // 发送请求  
      wx.request({
        url: url,
        method: 'GET',
        //请求成功的函数处理  
        success: function (res) {
          var newArray = res.data.data.commit;
          // console.log(newArray)
          // console.log(newArray.length)
          if (newArray.length < 5 && that.data.messageArray.length != 0) {
            wx.showLoading({
              title: '没有了。。。'
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 500)
            that.setData({
              texttips: '没有了'
            })
          } else {
            var messageArray = that.data.messageArray;
            if (newArray.length == 5) {
              that.setData({
                page: page + 1
              });
            }
            //防止重复加入数组 删除重复数据
            //第一次进去空的 所以全部加载循环
            if (messageArray.length == 0) {
              for (var i = 0; i < newArray.length; i++) {
                newArray[i].text = decodeURIComponent(newArray[i].text)
                newArray[i].name = newArray[i].name.replace(/\w+/, '')
                messageArray.push(newArray[i])
              }
              messageArray.reverse();
            } else {
              var newarr = [];
              for (var i = 0; i < newArray.length; i++) {
                var length = 0;
                for (var j = 0; j < messageArray.length; j++) {
                  if (newArray[i].id != messageArray[j].id) {
                    length++;
                  }
                }
                if (length == messageArray.length) {
                  newarr.push(newArray[i])
                }
              }
              if (newarr.length == 0) {
                wx.showLoading({
                  title: '没有了'
                });
                setTimeout(function () {
                  wx.hideLoading();
                }, 800)
              }
              newarr.reverse();
              for (var i = 0; i < newarr.length; i++) {
                newarr[i].text = decodeURIComponent(newarr[i].text)
                newArray[i].name = newArray[i].name.replace(/\w+/, '')
                messageArray.push(newarr[i])
              }
            }
            //成功之后绑定数据
            that.setData({
              messageArray: messageArray
            });

            wx.hideLoading();
          }
        },
        fail: function (res) {                             //请求失败的处理  
          console.log(res.data.msg);
        }
      })
    }
  }
})
