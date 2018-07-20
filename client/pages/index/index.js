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
      pullUpBool:true
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
  },
  onPageNotFound:function(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  // formateDate:function(contact){
  //     var data = new Date();
  //     var y = data.getFullYear();
  //     var mo = data.getMonth() * 1 + 1;
  //     var d = data.getDate();
  //     var h = data.getHours();
  //     var mi = data.getMinutes();
  //     var s = data.getSeconds();
  //     return y + contact + mo + contact + d + ' ' + ' ' + h + ':' + mi + ':' + s
  // },
  // myEventListener: function (e) {
  //   // console.log(e.detail)
  //   var obj = {
  //     id:0,
  //     name:'张三',
  //     text:e.detail.data,
  //     time: this.formateDate('-')
  //   };
  //   var arr = this.data.messageArray;
  //   arr.unshift(obj);
  //   this.setData({
  //     messageArray: arr
  //   })
  // },
  onLoad: function(){
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
        var data = res.data.data.res;
        var fastArr = [];
        var normalArr = [];
        var controlArr = [];
        var fanjiZhen = [];
        for(var i = 0; i < data.length; i++){
          if(data[i].name == 'fast'){
            fastArr.push(data[i])
          } else if (data[i].name == 'control'){
            controlArr.push(data[i])
          } else if (data[i].name == 'zhen'){
            fanjiZhen.push(data[i])
          }else{
            normalArr.push(data[i])
          }
        };
        //成功之后绑定数据
        that.setData({
          arrayTimeLess: fastArr,
          arrayTimeMore: normalArr,
          arrayTimeControl: controlArr,
          arrayTimeZhen: fanjiZhen,
          bannerData: res.data.data.bannerdata
        });
        //增加notice 只增加最后一条
        var notices = res.data.data.notice;
        that.setData({
          notice: notices[notices.length - 1].text
        })
        wx.setNavigationBarTitle({
          title: that.data.topNavtitle,
        })
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
      // data: {
      //   user_id: user_id,
      // },
      method: 'GET', 
      //请求成功的函数处理  
      success: function (res) {
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
        //成功之后绑定数据
        that.setData({
          arrayTimeLess: fastArr,
          arrayTimeMore: normalArr,
          arrayTimeControl: controlArr,
          arrayTimeZhen: fanjiZhen,
          bannerData: res.data.data.bannerdata
        });
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
  //上拉加载
  // onReachBottom: function () {
  //   let that = this;
  //   if (that.data.pullUpBool == true) {
  //     that.setData({
  //       pullUpBool: false
  //     });
      
  //     setTimeout(function () {
  //       that.setData({
  //         pullUpBool: true
  //       });
  //     }, 1000)
  //   // wx.stopReachBottom(); 
  //     var page = that.data.page;
    
  //   //根据实际情况定义请求的路径  
  //   let url = 'https://qe9zcrno.qcloud.la/weapp/textaresSubmit?page=' + page;
    
  //   wx.showLoading({
  //     title:'努力加载中'
  //   });
    
  //   // 发送请求  
  //   wx.request({
  //     url: url,
  //     method: 'GET',
  //     //请求成功的函数处理  
  //     success: function (res) {
  //       var newArray = res.data.data.res;
  //         if (newArray.length == 0) {
  //           wx.showLoading({
  //             title: '没有了。。。'
  //           });
  //           setTimeout(function () {
  //             wx.hideLoading();
  //           }, 500)
  //         } else {
  //           var messageArray = that.data.messageArray;
  //           if (newArray.length == 5){
  //             that.setData({
  //               page: page + 1
  //             });
  //           }
  //           //防止重复加入数组 删除重复数据
  //           //第一次进去空的 所以全部加载循环
  //           if (messageArray.length==0){
  //             for (var i = 0; i < newArray.length; i++) {
  //                   messageArray.push(newArray[i])
  //             }
  //             messageArray.reverse();
  //           }else{
  //             var newarr = [];
  //             for (var i = 0; i < newArray.length; i++) {
  //               var length = 0;
  //               for (var j = 0; j < messageArray.length; j++) {
  //                 if (newArray[i].id != messageArray[j].id) {
  //                   length++;
  //                 }
  //               }
  //               if (length == messageArray.length){
  //                 newarr.push(newArray[i])
  //               }
  //             }
  //             if (newarr.length == 0) {
  //               wx.showLoading({
  //                 title: '没有了'
  //               });
  //               setTimeout(function () {
  //                 wx.hideLoading();
  //               }, 800)
  //             }
  //             newarr.reverse();
  //             for (var i = 0; i < newarr.length; i++) {
  //               messageArray.push(newarr[i])
  //             }
  //           }
  //           //成功之后绑定数据
  //           that.setData({
  //             messageArray: messageArray
  //           });

  //           wx.hideLoading();
  //         }  
  //     },
  //     fail: function (res) {                             //请求失败的处理  
  //       console.log(res.data.msg);           
  //     }
  //   })
  //   }
  // }
})
