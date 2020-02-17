// pages/bookCats/bookCats.js
const api = require("../../http/api");
import fly from '../../http/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList: [],
        activeIndex: 0,
        Minor: ["全部"],
        scrollTop: 0,
        toView: 'green',
        activeMinsIndex: 0,
        gender: '',
        major: '',
        type: '',
        start: 1,
        minor: '',
        books: [],
        isminor: false

    },
    scroll(e) {
        console.log(e)
    },
    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },

    tap() {
        for (let i = 0; i < this.data.Minor.length; ++i) {
            if (this.data.Minor[i] === this.data.toView) {
                this.setData({
                    toView: this.data.Minor[i + 1],
                    scrollTop: (i + 1) * 200
                })
                break
            }
        }
    },

    tapMove() {
        this.setData({
            scrollTop: this.data.scrollTop + 10
        })
    },
    changeMins(e) {
        let { index, item } = e.currentTarget.dataset
        if (item === '全部') {
            item = ''
        }
        this.setData({
            activeMinsIndex: index,
            minor: item
        })
        this.getALlBook(this.data.gender, this.data.major, this.data.type, this.data.minor, this.data.start)
    },
    changeBigCategory(e) {
        let { index, item } = e.currentTarget.dataset
        this.setData({
            activeIndex: index,
            type: item.id
        })
        this.getALlBook(this.data.gender, this.data.major, this.data.type, this.data.minor, this.data.start)
    },
    getALlBook(gender, major, type, minor, start) {
        //@param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 "female", "hot", "古代言情", "穿越时空", "", 1
        console.log(gender);
        console.log(major);
        console.log(type);
        console.log(minor);
        console.log(start);
        fly.get(api.classification.getCatsBooks(gender, type, major, minor, start)).then(res => {
            console.log(res);
            this.setData({
                books: res.books
            })
            console.log(this.data.books);
        }).catch(err => {
            console.log(err);
        })
    },
    toDetails(e) {
        let { item } = e.currentTarget.dataset
        wx.navigateTo({
            url: `../details/details?title=详情&bookid=${item._id}`,
        });



    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            typeList: api.typeList,
            gender: options.gender,
            major: options.major,
            type: 'hot',
            start: 1,
            minor: ''
        })
        wx.setNavigationBarTitle({
            title: options.major
        });
        fly.get(api.classification.getMinor).then(res => {
            if (options.gender === 'male') {
                res.male.map((item) => {
                    if (item.major === options.major) {
                        this.setData({
                            Minor: this.data.Minor.concat(item.mins)

                        })

                    }
                })

            } else if (options.gender === 'female') {
                res.female.map((item) => {
                    if (item.major === options.major) {
                        this.setData({
                            Minor: this.data.Minor.concat(item.mins)

                        })

                    }
                })
            } else {
                res.press.map((item) => {
                    if (item.major === options.major) {
                        this.setData({
                            Minor: this.data.Minor.concat(item.mins)

                        })

                    }
                })
            }
            if (this.data.Minor.length > 1) {
                this.setData({
                    isminor: true
                })
            } else {
                this.setData({
                    isminor: false
                })
            }
        }).catch(err => {
            console.log(err);
        })
        this.getALlBook(options.gender, options.major, this.data.type, this.data.minor, this.data.start)
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