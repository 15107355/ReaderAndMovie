var app = getApp();
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieListData(inTheatersUrl, "inTheaters");
    this.getMovieListData(comingSoonUrl, "comingSoon");
    this.getMovieListData(top250Url, "top250");
    // 以上inTheaters，comingSoon，top250三个KEY值是对应上面data里面的的3个数据
  },
  getMovieListData: function (doubanUrl, settedKey) {
    var that = this;
    wx.request({
      url: doubanUrl,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        that.processDoubanData(res.data,settedKey);
      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
        // complete
      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tempData = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
      }
      movies.push(tempData)

    }
    var readyData = {};
    // 1.定义readyData为空
    readyData[settedKey] = {
      dmovies:movies
      };
    // 2.readyData的数组settedKey为movies的数组：每个movies下面都有一个dmovies的属性值
    this.setData(readyData);
    // 3. 为readyData赋值

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})