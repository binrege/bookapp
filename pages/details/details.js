// pages/details/details.js
const api = require("../../http/api");
import fly from '../../http/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookInfo: null,
        arr: [{
                name: '详情'
            },
            {
                name: '评价'
            },
        ],
        isadd: true,
        activeIndex: 0,
        chapters: [],
        toView: 'green',
        books: [],
        bookId: '',
        docs: [],
    },
    toReader() {
        wx.navigateTo({
            url: `../reader/reader?title=${this.data.bookInfo.title}&bookid=${this.data.bookInfo._id}`,
        });
    },
    clickItem(e) {
        let { index } = e.currentTarget.dataset
        console.log(index);
        this.setData({
            activeIndex: index
        })
    },
    toDetails(e) {
        let { item } = e.currentTarget.dataset
        wx.navigateTo({
            url: `../details/details?title=详情&bookid=${item._id}`,
        });



    },
    getrecommend() {
        //相关推荐
        this.setData({
            books: []
        })
        fly.get(api.book.relatedRecommendedBooks(this.data.bookId)).then(res => {
            console.log(res);
            let bookids = []
            for (let i = 0; i < 3; i++) {
                console.log(2222);
                for (var j = 0; j >= 0; j++) {
                    let id = parseInt(Math.random() * res.books.length)
                    console.log(bookids.indexOf(id) === -1);
                    if (bookids.indexOf(id) === -1) {
                        if (bookids.length === 3) {
                            break;
                        } else {
                            bookids.push(id)
                        }
                    }
                }
            }
            bookids.map(item => {
                this.data.books.push(res.books[item])
                this.setData({
                    books: this.data.books
                })
            })
            console.log(this.data.books);
        }).catch(err => {
            console.log(err);
        })
    },
    addTo() {
        // - 存数据: wx.setStorageSync(key, value),如果要保存对象,不需要转成字符串,直接存
        // - 取数据: wx.getStorageSync(key)
        // - 清除单个数据: wx.removeStorageSync(key)
        // - 清除全部: wx.clearStorage()


        if (wx.getStorageSync("books") === '') {
            console.log(11111);
            this.setData({
                isadd: false
            })
            let books = []
            books.push({
                bookId: this.data.bookId,
                currentChapters: 0
            })
            wx.setStorageSync("books", books)
            console.log(wx.getStorageSync("books"));
        } else {
            let books = wx.getStorageSync("books")
            console.log(JSON.stringify(books));
            if (JSON.stringify(books).indexOf(this.data.bookId) === -1) {
                console.log(22222);
                this.setData({
                    isadd: false
                })
                books.push({
                    bookId: this.data.bookId,
                    currentChapters: 0
                })
                wx.setStorageSync("books", books)
            } else {
                this.setData({
                    isadd: false
                })
            }
        }





    },
    imagPreView() {
        //'https://statics.zhuishushenqi.com'+bookInfo.cover
        let urls = []
        urls.push(`https://statics.zhuishushenqi.com${this.data.bookInfo.cover}`)
        console.log(urls);
        wx.previewImage({
            current: `https://statics.zhuishushenqi.com${this.data.bookInfo.cover}`, // 当前显示图片的http链接
            urls: urls // 需要预览的图片http链接列表
        })
    },
    getBookById(id) {
        fly.get(api.book.bookInfo(id)).then(res => {
            console.log(res);
            this.setData({
                bookInfo: res
            })
        }).catch(err => {
            console.log(err);
        })

        //短评
        fly.get(api.comment.shortReviews(id)).then(res => {
                console.log(res);
                this.setData({
                    docs: res.docs
                })
            }).catch(err => {
                console.log(err);
            })
            //章节
        fly.get(api.book.bookChaptersBookId(id)).then(res => {
            console.log(res);
            this.setData({
                chapters: res.mixToc.chapters
            })
        }).catch(err => {
            console.log(err);
        })

        fly.get(api.book.bookSources(id)).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);
        })

        // fly.get(api.book.authorBooks(id)).then(res => {
        //     console.log(res);

        // }).catch(err => {
        //     console.log(err);
        // })
    },

    upper(e) {
        // console.log(e)
    },

    lower(e) {
        // console.log(e)
    },

    scroll(e) {
        // console.log(e)
    },

    scrollToTop() {
        this.setAction({
            scrollTop: 0
        })
    },

    // tap() {
    //     for (let i = 0; i < order.length; ++i) {
    //         if (order[i] === this.data.toView) {
    //             this.setData({
    //                 toView: order[i + 1],
    //                 scrollTop: (i + 1) * 200
    //             })
    //             break
    //         }
    //     }
    // },

    // tapMove() {
    //     this.setData({
    //         scrollTop: this.data.scrollTop + 10
    //     })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        console.log(api);

        wx.setNavigationBarTitle({
            title: options.title,
        });
        this.setData({
            bookId: options.bookid
        })
        if (JSON.stringify(wx.getStorageSync("books")).indexOf(this.data.bookId) !== -1) {
            this.setData({
                isadd: false
            })
        }
        this.getrecommend()
        this.getBookById(options.bookid)


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