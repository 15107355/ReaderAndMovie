var postsData = require("../../../data/posts-data.js")
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
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
    }
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
    ]
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
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100003507bR0gDKBm.m4a?fromtag=38',
      title: "night",
      coverImgUrl: "http://y.gtimg.cn/music/photo_new/T002R150x150M000001TEc6V0kjpVC.jpg?max_age=2592000"
    })
  }
})