// components/component-tag-name.js
const defalutUrl = require('../../../utils/url.js').defalutUrl;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLeft:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    subText11: '小小黑暴力阵容',
    subText12: '天狗荒稳定阵容',
    subText13: '兵勇阎魔头铁控制阵容',
    subText14:'鸩阵容 New',
    isleft: false,
    isshow:false,
    arrayTimeLess: [],
    arrayTimeMore: [],
    arrayTimeControl:[],
    arrayTimeZhen:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //自己调用的方法
    slideLeft: function (event) {
      this.setData({
        isleft: true,
        isshow:true
      })
    },
    //可以被父标签捕获的方法 
    //点击父组件变成了点击子组件这个方法可以去掉
    dataInit:function(){
      this.setData({
        isleft: false
      })
    },
    textBoxhide:function(){
      this.setData({
        isshow:false,
        isleft: false
      })
    },
    preventTouchMove:function(e){
      
    }
  },
  ready: function () {
    var that = this;
    //如果有缓存则调用缓存数据
    wx.getStorage({
      key: 'componetData',
      success: function (res) {
        that.setData({
          arrayTimeLess: res.data.fastArr,
          arrayTimeMore: res.data.noramlArr,
          arrayTimeControl: res.data.controlArr,
          arrayTimeZhen: res.data.fanjiZhen
        });
      },
      //如果没有缓存 那么就重新调用接口
      fail: function () {
        wx.request({
          url: defalutUrl,
          data: {},
          success: function (res) {
            var data = res.data.data.res;
            var fastArr = [];
            var normalArr = [];
            var controlArr = [];
            var fanjiZhen = [];
            for (var i = 0; i < data.length; i++) {
              data[i].image1 = '../' + data[i].image1;
              data[i].image2 = '../' + data[i].image2;
              if (data[i].name == 'fast') {
                fastArr.push(data[i])
              } else if (data[i].name == 'control') {
                controlArr.push(data[i])
              } else if (data[i].name == 'zhen') {
                fanjiZhen.push(data[i])
              }else {
                normalArr.push(data[i])
              }
            };
            //成功之后绑定数据
            that.setData({
              arrayTimeLess: fastArr,
              arrayTimeMore: normalArr,
              arrayTimeControl: controlArr,
              arrayTimeZhen:fanjiZhen
            });
            //没有缓存 调用数据 保存到缓存里面 10M上限
            wx.setStorage({
              key: 'componetData',
              data: {
                fastArr: fastArr,
                noramlArr: normalArr,
                controlArr: controlArr,
                fanjiZhen: fanjiZhen
              },
            })
          },
          error: function (a) {
            console.log(a);
          }
        })
      }
    })
  },
})
