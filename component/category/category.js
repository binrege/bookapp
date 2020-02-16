// component/category/category.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        female: {
            type: Object,
            value: () => {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickItem(e) {
            //@param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
            let gender = ''
            if (this.properties.female.type === '男生') {
                gender = "male"
            } else if (this.properties.female.type === '女生') {
                gender = "female"
            } else {
                gender = "press"
            }
            let { item } = e.currentTarget.dataset

            wx.navigateTo({
                url: `../../pages/bookCats/bookCats?gender=${gender}&major=${item.name}`,
            });

            console.log(item);
        }

    }
})