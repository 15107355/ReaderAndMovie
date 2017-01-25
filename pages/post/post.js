// var postsData = require('../../data/posts-data.js')单引号和双引号效果一样
var postsData = require("../../data/posts-data.js")
Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      post_key: postsData.postList
    });
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    // console.log("on Post id is" + postId);
    wx.navigateTo({
      url: 'post-detail/post-detail',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})