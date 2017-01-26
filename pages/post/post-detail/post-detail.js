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
  }
})