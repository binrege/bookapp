// pages/bookCity/bookCity.js
const api = require("../../http/api");
import fly from '../../http/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        arr: [{
                name: '分类'
            },
            {
                name: '排行'
            },
        ],
        activeIndex: 0,
        female: {
            type: '',
            arr: []
        },
        male: {
            type: '',
            arr: []
        },
        press: {
            type: '',
            arr: []
        },
    },
    getData() {
        fly.get(api.classification.getCats).then(res => {
                console.log(res);
                this.data.female.arr = res.female
                this.data.male.arr = res.male
                this.data.press.arr = res.press
                this.setData({
                    female: {
                        type: '女生',
                        arr: res.female
                    },
                    male: {
                        type: '男生',
                        arr: res.male
                    },
                    press: {
                        type: '出版',
                        arr: res.press
                    },
                })
                console.log(this.data.female.arr);
                console.log(this.data.male.arr);
                console.log(this.data.press.arr);
            }).catch(err => {
                console.log(err);
            })
            // fly.get(api.classification.getMinor).then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })
            // fly.get(api.classification.getCatsBooks("female", "hot", "古代言情", "穿越时空", "", 1)).then(res => {
            //     console.log(res);
            // }).catch(err => {
            //     console.log(err);
            // })

    },
    clickItem(e) {
        let { index } = e.currentTarget.dataset
        console.log(index);
        this.setData({
            activeIndex: index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
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