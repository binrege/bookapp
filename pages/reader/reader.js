// pages/reader/reader.js
const api = require("../../http/api");
import fly from '../../http/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookSourcesId: '',
        bookId: null,
        chapters: [],
        chapter: [],
        link: '',
        reading: [],
        currentChapters: 0,
    },
    initChapter() {
        this.setData({
            reading: []
        })
        let books = wx.getStorageSync("books")
        console.log(books);
        let currentBook = books.filter(item => {
            return item.bookId === this.data.bookId
        })
        console.log(currentBook);
        if (currentBook.length > 0) {
            this.setData({
                reading: this.data.reading.concat(this.data.chapters[currentBook[0].currentChapters])
            })
        } else {
            this.setData({
                reading: this.data.reading.concat(this.data.chapters[0])
            })
        }

        console.log(this.data.reading);
        this.getContent(this.data.reading[0].link)

    },
    getContent(link) {
        // 章节内容
        fly.get(api.book.chapterContent(link)).then(res => {
            console.log(res);
            this.setData({
                chapter: res.chapter
            })
        }).catch(err => {
            console.log(err);
        })

    },
    getData(id) {
        //书籍章节 根据书id
        fly.get(api.book.bookChaptersBookId(id)).then(res => {
            console.log(res);

            // console.log(this.data.chapters);
        }).catch(err => {
            console.log(err);
        })


        fly.get(api.book.bookSources(id)).then(res => {
            console.log(res);
            this.setData({
                bookSourcesId: res[0]._id
            })

            fly.get(api.book.bookChapters(this.data.bookSourcesId)).then(res => {
                console.log(res);
                this.setData({
                    chapters: res.chapters
                })
                this.initChapter()
            }).catch(err => {
                console.log(err);
            })
            console.log(this.data.bookSourcesId);
        }).catch(err => {
            console.log(err);
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        wx.setNavigationBarTitle({
            title: options.title,

        });
        this.setData({
            bookId: options.bookid
        })
        this.getData(options.bookid)

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