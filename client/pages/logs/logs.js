//logs.js
const util = require('../../utils/util.js')
const defalutUrl = require('../../utils/url.js').defalutUrl;
Page({
  data: {
    isleft: false,
    title:'',
    //阵容数据
    isLshow:true,
    isRshow:false,
    ArryListYYS: [],
  ArryListSS: [],
  //打法数据
  floorArry:[],
  //上拉加载数组
  messageArray: [],
  page: 1,
  pullUpBool: true,
  //拖到底部提示加载完成
  texttips:'上拉加载更多',
  curPageTitle:'',
  iphonexcss:''
},
  onLoad: function (options) {
    //iphonex适配
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.model == 'iPhone X') {
          that.setData({
            iphonexcss: 'iphonexcss'
          })
        }
      }
    })
      //获取url的title信息
    that.setData({
        title: '阵容:'+options.title,
        curPageTitle: options.title
      })  
      //传值给内页的标题
      wx.setNavigationBarTitle({
        title: that.data.title,
      });
      // console.log(this.data.title.replace('阵容:', ''))
        wx.request({
          url: defalutUrl+'pages/logs/logs?title=' + that.data.title.replace('阵容:', ''),
          data: {},
          success: function (res) {
            var data = res.data.data.res;
            var fastArr = [];
            var normalArr = [];
            for (var i = 0; i < data.length; i++) {
              if (data[i].id < 2 ) {
                fastArr.push(data[i])
              } else {
                normalArr.push(data[i])
              }
            }
            that.setData({
              ArryListYYS: fastArr,
              ArryListSS: normalArr
            });
            // 选项卡页面数据
            var data2 = res.data.data.res2;
            that.setData({
              floorArry: data2})
          },
          error: function (a) {
            console.log(a);
          }
        })

  },
  onReady: function () {
    //选择当前的标签
    this.obj = this.selectComponent("#isLeft");
  },
  //可以被父标签捕获的方法
  dataInit: function () {
    this.setData({
      isleft: false
    })
  },
  changeIsLeft: function () {
    this.setData({
      isleft: false
    });
    //可以调用子组件的时间，动态修改子组件的值 
    this.obj.dataInit();
  },
  lshow: function () {
    this.setData({
      isLshow: true,
      isRshow: false
    })
  },
  rshow: function () {
    this.setData({
      isLshow: false,
      isRshow: true
    })
  },
  //下拉刷新页面
  onPullDownRefresh: function () {
    //清除缓存 这里不能清除 清除了可以灌水评论了
    // wx.clearStorage();
    // 动态设置导航条标题  
    wx.setNavigationBarTitle({
      title: '正在加载'
    });
    //init data
    this.initArrData();
    //在标题栏中显示加载图标  
    wx.showNavigationBarLoading();
    //根据实际情况定义请求的路径  
    let that = this;
    // 发送请求  
    wx.request({
      url: defalutUrl+'/pages/logs/logs?title=' + that.data.title.replace('阵容:',''),
      data: {},
      success: function (res) {
        var data = res.data.data.res;
        var fastArr = [];
        var normalArr = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].id < 2) {
            fastArr.push(data[i])
          } else {
            normalArr.push(data[i])
          }
        }
        that.setData({
          ArryListYYS: fastArr,
          ArryListSS: normalArr
        });
        // 选项卡页面数据
        var data2 = res.data.data.res2;
        that.setData({
          floorArry: data2
        });
      },
      error: function (a) {
        console.log(a);
      },
      fail: function (res) {                             //请求失败的处理  
        console.log(res.data.msg);
      },
      complete: function () {
        wx.hideNavigationBarLoading();                   //完成停止加载  
        // 动态设置导航条标题  
        wx.setNavigationBarTitle({
          title: that.data.title,
        })
        wx.stopPullDownRefresh();                       //停止下拉刷新  
      }
    })
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
  //初始化数据
  initArrData: function () {
    this.setData({
      ArryListYYS: [],
      ArryListSS: [],
      floorArry:[]
    });
  },
  //监听子组件提交成功事件
  myEventListener: function (e) {
    var obj = {
      id: 0,
      name: e.detail.name.replace(/\w+/,''),
      text: decodeURIComponent(e.detail.data),
      time: this.formateDate('-'),
      className:e.detail.className,
      userRepay:''
    };
    var arr = this.data.messageArray;
    arr.unshift(obj);
    this.setData({
      messageArray: arr
    })
  },
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
      let url = defalutUrl+'/textaresSubmit?name=' + that.data.title.replace('阵容:', '')+'&&page=' + page;

      wx.showLoading({
        title: '努力加载中'
      });

      // 发送请求  
      wx.request({
        url: url,
        method: 'GET',
        //请求成功的函数处理  
        success: function (res) {
          var newArray = res.data.data.res;
          // console.log(newArray.length)
          if (newArray.length < 5 && that.data.messageArray.length!=0) {
            wx.showLoading({
              title: '没有了。。。'
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 500)
            that.setData({
              texttips : '没有了'
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
