const api = require("../../http/api");
import fly from '../../http/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    getData() {
        fly.get(api.classification.getCats).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        fly.get(api.classification.getMinor).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        fly.get(api.classification.getCatsBooks("female", "hot", "古代言情", "穿越时空", "", 1)).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(api);
        this.getData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})