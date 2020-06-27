export default class model {
    constructor(token = "TodoMVC") {
        this.data = {
            items: [

            ],
            filter: 'all'
        },
            this.token = token;
    }
    //初始化
    init(callback) {
        let data = window.localStorage.getItem(this.token);
        if (data) {
            this.data = JSON.parse(data);
        }
        if (callback) {
            callback();
        }
    }
    //向model中添加元素
    addItem(context, date) {
        this.data.items.push({ context: context, date: date, completed: false, id: Date.now() });
        this.update();
    }
    //从model中删除id元素
    removeItem(itemid) {
        let index = -1;
        for (let i = 0; i < this.data.items.length; ++i) {
            if (this.data.items[i].id == itemid) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.data.items.splice(index, 1);
            this.update();
            return true;
        }
        return false;
    }
    //完成id元素
    completeItem(itemid) {
        let index = -1;
        for (let i = 0; i < this.data.items.length; ++i) {
            if (this.data.items[i].id == itemid) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            //状态切换
            this.data.items[index].completed = !this.data.items[index].completed;
            this.update();
            return true;
        }
        return false;
    }
    //获取id为itemid的元素
    getItem(itemid){
        let index = -1;
        for (let i = 0; i < this.data.items.length; ++i) {
            if (this.data.items[i].id == itemid) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            return  this.data.items[index];
        }
        return null;
    }
    //清空model和localstorage
    clearModel() {
        window.localStorage.clear();
        this.data = {
            items: [

            ],
            msg: '',
            filter: 'all'
        }
    }
    //更新localstorage
    update(callback) {
        window.localStorage.setItem(this.token, JSON.stringify(this.data));
        if (callback) {
            callback();
        }
    }
}