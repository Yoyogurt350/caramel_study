//index.js
const util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: 1,
    mtime: 30000,
    rate: null,
    timer: null,
    isShow: false,
    activenum: 0,
    timeStr: '05:00',
    okShow: false,
    stopShow: true,
    continuedownShow: false,
    continueShow: false,
    downShow: false,
    taskArr: [{
      icon: 'work.png',
      text: 'Homework'
    }, {
      icon: 'study.png',
      text: 'Study'
    }, {
      icon: 'think.png',
      text: 'Meditate'
    }, {
      icon: 'write.png',
      text: 'Write'
    }, {
      icon: 'sport.png',
      text: 'Exercise'
    }, {
      icon: 'read.png',
      text: 'Read'
    },
    ]
  },
  sliderChange(e) {
    // console.log(e);
    this.setData({
      time: e.detail.value,
      mtime: e.detail.value * 60 * 1000
    })
  },
  changtask(e) {
    // console.log(e.currentTarget.dataset.index);
    this.setData({
      activenum: e.currentTarget.dataset.index,
    })
  },
  start() {
    this.setData({
      isShow: true,
      timeStr: this.data.time > 10 ? this.data.time + ':00' : '0' + this.data.time + ':00',
      stopShow: true
    })
    this.drawbg()
    this.drawactive()
  },
  drawbg() {
    var lineWidth = 6 / this.data.rate //px
    var ctx = wx.createCanvasContext('proess_bg')
    ctx.setStrokeStyle("#000000")
    ctx.setLineWidth(lineWidth)
    ctx.setLineCap('round')
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false)
    ctx.stroke()
    ctx.draw()
  },

  drawactive() {
    var _this = this
    var timer = setInterval(function () {
      var currentTimer = _this.data.mtime - 100
      var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mtime)
        / (_this.data.time * 60 * 1000)
      _this.setData({
        mtime: currentTimer
      })

      if (angle < 3.5) {
        if (currentTimer % 1000 == 0) {
          var timeStr1 = currentTimer / 1000          //s
          var timeStr2 = parseInt(timeStr1 / 60)//min
          var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60)
          var timeStr2 = timeStr2 > 10 ? timeStr2 : "0" + timeStr2
          _this.setData({
            timeStr: timeStr2 + ':' + timeStr3
          })

        }
        var lineWidth = 6 / _this.data.rate //px
        var ctx = wx.createCanvasContext('proess_active')
        ctx.setStrokeStyle("#ffffff")
        ctx.setLineWidth(lineWidth)
        ctx.setLineCap('round')
        ctx.beginPath()
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth,
          1.5 * Math.PI, angle * Math.PI, false)
        ctx.stroke()
        ctx.draw()
      } else {
        var logs =wx.getStorageSync('logs')
        logs.unshift({
          date:util.formatTime(new Date),
          time:_this.data.time,
        })
        wx.setStorageSync('logs', logs)
        _this.setData({
          timeStr: '00:00',
          okShow: true,
          stopShow: false,
          continuedownShow: false
        })
        clearInterval(timer)
      }
    }, 100);
    _this.setData({
      timer: timer
    })
  },

  stop() {
    clearInterval(this.data.timer)
    this.setData({
      continuedownShow: true,
      stopShow: false,
      continueShow: true,
      downShow: true,
      okShow: false
    })
  },
  continue() {
    this.drawactive()
    this.setData({
      continuedownShow: false,
      stopShow: true,
      okShow: false
    })
  },
  down() {
    clearInterval(this.data.timer)
    this.setData({
      continuedownShow: false,
      stopShow: false,
      okShow: false,
      isShow: false
    })
  },
  ok() {
    clearInterval(this.data.timer)
    this.setData({
      continuedownShow: false,
      stopShow: true,
      isShow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getSystemInfoSync()
    let rate = 750 / res.windowWidth
    // console.log(res);
    this.setData({
      rate: rate
    })

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