var postsData = require("../../../data/posts-data.js")
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // var globalData = app.globalData;
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    // console.log(postData);
    this.setData({
      postData: postData
    })
    var postsCollected = wx.getStorageSync('posts_Collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_Collected', postsCollected);
    };
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      // this.data.isPlayingMusic=true;这句话实现不了数据赋值，只能用下面的语句进行数据绑定
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  onShareAppMessage: function () {
    var sPostId = this.data.currentPostId;
    var postData = postsData.postList[sPostId];
    return {
      title: postData.title,
      desc: postData.content,
      path: postData.postId
    }
  },
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_Collected')
  },
  onShareTap: function (event) {
    var itemList = [
      "分享到朋友圈",
      "分享给微信好友",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#000",
      success: function (res) {
        // res.cancel
        // res.tapIndex
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],

        })
      }
    })
  },
  onMusicTap: function (event) {
    var cPostId = this.data.currentPostId;
    //和上面定义的postId不重复，上面的指this.data.currentPostId赋值到postId中，上面这句话指的是cPost等于this.data.currentPostId
    var postData = postsData.postList[cPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      // this.data.isPlayingMusic = false;
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })
      this.setData({
        isPlayingMusic: true
      })
      // this.data.isPlayingMusic = true;
    }

  }
})