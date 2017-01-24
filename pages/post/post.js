// pages/post/post.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var post_content1={
      date:"Sep 18 2016",
      title:"正是虾肥蟹壮时",
      post_img:"http://www.qbaobei.com/UploadFiles/ysjk/2012/8/201208291543488027.jpg",
      author_img:"http://p3.pstatp.com/thumb/2b70023954b40c6f9c2",
      post_like_view:"http://p2.pstatp.com/large/7294/6608368946",
      post_like_collect:"http://p2.pstatp.com/large/3759/2091335020",
      content:"蟹中含有较多的维生素A，对皮肤的角化有帮助；对儿童的佝偻病，老年人的骨质疏松也能起到补充钙质的作用。",
      view_num:"92",
      collect_num:"68"
    }
    this.setData(post_content1);
    // 必须有上面的语句才能在页面中调用数据
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})