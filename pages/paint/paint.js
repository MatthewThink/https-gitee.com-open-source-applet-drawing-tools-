// pages/paint/paint.js
var ctx = wx.createCanvasContext('paint', this);
let interstitialAd = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    color:'red',
    colors: ['red','#d81e06', '#faea2a', '#ff9800', '#faf0aa', '#1afa29', '#1296db', '#13227a', '#d4237a', '#bfbfbf', '#8a8a8a', '#707070', '#515151', '#2c2c2c', "black"],
    width:6,
    iconWidths: ['../../image/circle-1.png', '../../image/circle-2.png', '../../image/circle-3.png', '../../image/circle-4.png'],
    widths:[6,12,18,24],
    offsetY:'320rpx',
    oldX:0,
    oldY:0
  },
  //触摸开始
  start: function(e){
    this.setData({
      oldX:e.touches[0].x,
      oldY:e.touches[0].y
    })
    ctx.setStrokeStyle(this.data.color);
    ctx.setLineWidth(this.data.width);
    ctx.setLineCap('round');
    ctx.moveTo(e.touches[0].x, e.touches[0].y);
  },
  //移动
  move: function(e){
    ctx.moveTo(this.data.oldX,this.data.oldY);
    ctx.lineTo(e.touches[0].x,e.touches[0].y);
    ctx.stroke();
    // ctx.draw();
    wx.drawCanvas({
      canvasId: "paint",
      actions: ctx.getActions(),
      reserve: true
    })
    this.setData({
      oldX: e.touches[0].x,
      oldY: e.touches[0].y
    })
  },
  //触摸结束
  end: function(e){
    // ctx.draw();
  },
  //选择粗细
  chooseWidth:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      width:this.data.widths[index]
    })
    wx.showToast({
      title: '当前粗细：'+this.data.width,
      icon: 'none',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //清空画布
  clean: function(){
    ctx.clearActions();
    wx.drawCanvas({
      canvasId: "paint",
      actions: ctx.getActions(),
      reserve: false
    })
  },
  //橡皮擦
  eraser: function(){
    this.setData({
      color:'white'
    })
  },
  //选择颜色
  chooseColor: function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      color:this.data.colors[index]
    })
  },
  save: function(){
    wx.showModal({
      title:'保存',
      content:'是否保存当前画布的内容？',
      success:function(res){
        if(res.confirm){
          wx.canvasToTempFilePath({
            canvasId: 'paint',
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success:function(res){
                  wx.showToast({
                    title: '保存成功',
                  })
                },
                fail:function(res){
                  wx.showToast({
                    title: '保存失败',
                    icon:'none'
                  })
                }
              })
            },
            fail:function(res){
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          }, this)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据设备动态获取画布高度
    var info = wx.getSystemInfoSync();
    this.setData({
      offsetY:info.windowHeight-80+"px"
    })

    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e088b048d2a709dc'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }

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
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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