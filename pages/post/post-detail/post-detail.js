var postsData = require("../../../data/posts-data.js")
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic:true
      })
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic:false
      })
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