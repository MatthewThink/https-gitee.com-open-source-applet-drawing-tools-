//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '画图工具v1.0',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(11);
      wx.redirectTo({url: '../paint/paint'})
    }

    // else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

    // setTimeout(function(){
    //   wx.redirectTo({
    //     url: '../paint/paint',
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }.bind(this),3000)

  },
  onShow:function(){

  },
  onGotUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
    setTimeout(function () {
      wx.redirectTo({
        url: '../paint/paint',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }.bind(this), 1500)
  }
})
