// components/component-tag-name.js
const defalutUrl = require('../../../utils/url.js').defalutUrl;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  /**
   * 组件的初始数据
   */
  data: {
    isdiabled: true,
    placeholder: '留下点脚印',
    placeholderValue: '',
    data: '',
    name: '',
    words: '',
    nameArray: ['ssr面灵气', 'ssr鬼灯', 'ssr卖药郎', 'ssr山风', 'ssr御馔津', 'ssr奴良陆生', 'ssr玉藻前', 'ssr雪童子', 'ssr彼岸花', 'ssr荒', 'ssr辉夜姬', 'ssr茨木童子', 'ssr一目连', 'ssr妖刀姬', 'ssr花鸟卷', 'ssr青行灯', 'ssr大天狗', 'ssr犬夜叉', 'ssr杀生丸', 'ssr阎魔', 'ssr小鹿男', 'ssr酒吞童子', 'ssr荒川之主', 'ssr两面佛', 'sr猫掌柜', 'sr阿香', 'sr熏', 'sr奕', 'sr日和坊', 'sr追月神', 'sr百目鬼', 'sr书翁', 'sr小松丸', 'sr闸中少女', 'sr鸩', 'sr以津真天', 'sr金鱼姬', 'sr万年竹', 'sr般若', 'sr妖琴师', 'sr镰鼬', 'sr桃花妖', 'sr吸血姬', 'sr雪女', 'sr惠比寿', 'sr姑获鸟', 'sr烟烟罗', 'sr白童子', 'sr黑童子', 'sr夜叉', 'sr青坊主', 'sr桃花妖', 'sr络新妇', 'sr食梦貘', 'sr判官', 'sr孟婆', 'sr傀儡师', 'sr海坊主', 'sr鬼使黑', 'sr鬼使白', 'sr骨女', 'sr凤凰火', 'sr二口女', 'sr鬼女红叶', 'sr妖狐', 'sr白狼', 'sr跳跳哥哥', 'sr犬神', 'sr清姬', 'r蜜桃&芥子', 'r虫师', 'r小袖之手', 'r数珠', 'r兔丸', 'r椒图', 'r座敷童子', 'r雨女', 'r山兔', 'r独眼小僧', 'r兵勇', 'r狸猫', 'r莹草', 'r食发鬼', 'r古龙火', 'r丑时之女', 'r首无', 'r恶鬼', 'r武士之灵', 'r巫蛊师', 'r童女', 'r铁鼠', 'r跳跳妹妹', 'r跳跳弟弟', 'r蝴蝶精', 'r鲤鱼精', 'r童男', 'r九命猫', 'r管狐', 'r三尾狐', 'r青蛙瓷器', 'r觉', 'r山童', 'r鸦天狗', 'r河童', 'n灯笼鬼', 'n提灯小僧', 'n赤蛇', 'n盗墓小鬼', 'n寄生魂', 'n唐纸伞妖', 'n天邪鬼绿', 'n天邪鬼赤', 'n天邪鬼青', 'n天邪鬼黄', 'n帚神', 'n涂壁', 'ssn大天狗呱', 'ssn阎魔呱', 'ssn荒川呱', 'ssn酒吞呱', 'ssn两面佛呱', 'ssn茨木呱', 'ssn青行灯呱', 'ssn妖刀姬呱', 'ssn一目连呱', 'ssn花鸟卷呱', 'ssn辉夜姬呱', 'ssn荒呱', 'ssn彼岸花呱', 'ssn小鹿男呱'],
    // 隐藏textarea
    isDisabled:false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //自己调用的方法
    //可以被父标签捕获的方法 
    //点击父组件变成了点击子组件这个方法可以去掉
    formSubmit: function (e) {
      var that = this;
      var data = encodeURIComponent(e.detail.value.textarea1);
      var name = that.data.nameArray[Math.floor(Math.random() * that.data.nameArray.length)];
      var re = /\w+/gi;
      var words = re.exec(name)[0];
      that.setData({
        data: data,
        name: name,
        words: words
      })

      // console.log(data)
      // console.log(that.data.proTitle)
      //防止过快刷评论
      // wx.getStorage({
      //   key: that.data.proTitle,
      //   success: function (res) {
      //     // console.log(res.data)
      //     //10分钟之后才能继续留言
      //     if ((Date.now() - res.data) / 1000 / 60 <= 10) {
      //       wx.showLoading({
      //         title: '请休息一下！'
      //       });
      //       setTimeout(function () {
      //         wx.hideLoading()
      //       }, 600)
      //     } else {
      //       that.requestFn();
      //     }
      //   },
      //   fail: function () {
      //     wx.setStorage({
      //       key: that.data.proTitle,
      //       data: Date.now()
      //     })
      //     that.requestFn();
      //   }
      // })
    },
    requestFn() {
      var that = this;
      // wx.showLoading({
      //   title: '正在提交'
      // });
      wx.request({
        url: defalutUrl + '/textaresSubmit?name=' + that.data.proTitle,
        header: {
          'Content-Type': 'application/json'
        },
        data: { id: 0, name: that.data.name, text: that.data.data, time: that.formateDate('-'), className: that.data.words + '-box' },
        method: 'POST',
        success: function (res) {
          that.setData({
            placeholderValue: ''
          })
          that.setData({
            isdiabled: true
          })

          // // console.log(res.data.data.res)
          // wx.showToast({
          //   title: '提交成功'
          // })
          // setTimeout(function () {
          //   wx.hideToast();
          //   wx.hideLoading()
          // }, 500)
          //子组件给父组件传值
          var myEventDetail = { data: that.data.data, name: that.data.name, className: that.data.words + '-box' } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)
        },
        error: function () {
          wx.showToast({
            title: '提交失败'
          })

          setTimeout(function () {
            wx.hideToast();
            wx.hideLoading()
          }, 500)
        }
      });
    },
    //输入有效字符（不为空，不为空格才会提交）
    checklength: function (e) {
      // console.log(e.detail.value)
      if (e.detail.value.trim().length > 0) {
        this.setData({
          isdiabled: false
        })
      } else {
        this.setData({
          isdiabled: true
        })
      }
    },
    default2: function(){
      //子组件给父组件传值
      var myEventDetail = { data: this.data.isDisabled} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
