// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subUrl:String
  },
  /**
   * 组件的初始数据
   */
  data: {
    "isLshow":true,
    "isRshow":false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //自己调用的方法
    //可以被父标签捕获的方法 
    //点击父组件变成了点击子组件这个方法可以去掉
    addClassLeft:function(){
      // this.data.subUrl)
      this.setData({
        "isLshow":true,
        "isRshow": false,
      })
      this.testUrl('pages/index/index')
    },
    addClassRight: function () {
      this.setData({
        "isRshow": true,
        "isLshow": false
      })
    },
    testUrl: function (url){
      if (this.data.subUrl != url){
        var newUekl = url.split('/');
wx.navigateTo({
  url: newUekl[newUekl.length-1],
})
      }
    }
  }
})
