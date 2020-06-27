import { dateCompare, getCurrentDate, getTomorrowDate, getNextYearDate } from "./getDate.js"
import model from "./model.js";
function $(a) {
    return document.getElementById(a);
}

window.addEventListener('load', onload);

function onload() {
    $("add").onclick = add;
    $("backgroundimg").onclick = changeImg;
    window.currentImg = 1;
    //默认截止日期为明天  可选日期为明天起到明年今天
    $("ddl").value = getTomorrowDate();
    $("ddl").max = getNextYearDate();
    $("ddl").min = getTomorrowDate();
    $("all").onclick = filterSelect;
    $("finished").onclick = filterSelect;
    $("unfinished").onclick = filterSelect;
    $("clearfinished").onclick = clearFinished;

    window.mod = new model();
    window.mod.init();
    window.mod.data.filter = "all";
    update();
}
//更改背景图片
function changeImg(event) {
    window.currentImg += 1;
    let url = "url(\"./img/background" + window.currentImg % 10 + ".jpg\")";
    $("backgroundimg").style.background = url;
    $("backgroundimg").style.backgroundPosition = "10% 20%";
    $("backgroundimg").style.backgroundSize = "cover";
}
//添加list元素
function add() {
    let context = $("context");
    let date = $("ddl");
    if (checkContext(context.value) && checkDate(date.value)) {
        mod.addItem(context.value, date.value);
        context.value = "";
        date.value = getTomorrowDate();
    }
    update();
}
//检查添加内容是否规范
function checkContext(context) {
    if (context.length === 0) {
        alert("内容不能为空");
        return false;
    }
    return true;
}
//检查添加日期是否规范
function checkDate(date) {
    if (date === "") {
        alert("ddl是第一生产力啦..");
        return false;
    }
    if (!dateCompare(date, getTomorrowDate())) {
        alert("总要给自己留一天来做不是吗");
        return false;
    }
    else if (dateCompare(date, getNextYearDate())) {
        alert("今年的事就别拖到明年啦！");
        return false;
    }
    return true;
}
//编辑list元素
function edit(event) {
    let item = window.mod.getItem(event.currentTarget.parentNode.id);
    if (item !== null) {
        $("context").value = item.context;
        $("ddl").value = item.date;
        $("context").focus();
        window.mod.removeItem(event.currentTarget.parentNode.id);
    }
    update();

}
//删除list元素
function del(event) {
    window.mod.removeItem(event.currentTarget.parentNode.id);
    update();
}
//完成list元素
function complete(event) {
    window.mod.completeItem(event.currentTarget.parentNode.id);
    update();
}
//根据mod数据更新显示
function update() {
    window.mod.update();
    window.overdueCount = 0;
    let data = window.mod.data;
    let list = $("list");
    //清空列表
    list.querySelectorAll("li").forEach(li => {
        li.parentNode.removeChild(li);
    });
    //根据数据创建列表
    data.items.forEach(item => {
        if (window.mod.data.filter === "all") {
            let li = createLi(item.context, item.date, item.completed, item.id);
            list.appendChild(li);
        }
        else if (window.mod.data.filter === "finished" && item.completed) {
            let li = createLi(item.context, item.date, item.completed, item.id);
            list.appendChild(li);
        }
        else if (window.mod.data.filter === "unfinished" && !item.completed) {
            let li = createLi(item.context, item.date, item.completed, item.id);
            list.appendChild(li);
        }
    });

    if (isallFinished()) {
        $("finishall").onclick = unfinishAll;
        $("finishall").innerHTML = "全部取消";
    }
    else {
        $("finishall").onclick = finishAll;
        $("finishall").innerHTML = "全部完成";
    }
}
//创建list元素模板
function createLi(context, date, completed, id) {
    let li = document.createElement("li");
    li.id = id;
    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = completed ? "checked" : "";
    let msglabel = document.createElement("label");
    //元素内容超过10个字显示为多行
    if (context.length <= 10) {
        msglabel.classList.add("msglabel_single");
    }
    else {
        msglabel.classList.add("msglabel");
    }
    msglabel.onclick = complete;
    let check = document.createElement("span");
    check.classList.add("check");
    msglabel.appendChild(check);
    let msg = document.createElement("span");
    msg.innerHTML = context;
    msg.classList.add("msg");
    msglabel.appendChild(msg);
    let datelabel = document.createElement("label");
    datelabel.classList.add("date");
    datelabel.id = "date";
    datelabel.innerHTML = date;
    let dela = document.createElement("a");
    dela.classList.add("delete");
    dela.onclick = del;
    let edita = document.createElement("a");
    edita.classList.add("edit");
    edita.onclick = edit
    //过期内容显示为红字
    if (overdue(date)) {
        msg.classList.add("red");
        datelabel.classList.add("red");
    }
    li.appendChild(input);
    li.appendChild(msglabel);
    li.appendChild(dela);
    li.appendChild(edita);
    li.appendChild(datelabel);
    return li;
}
//检查list的元素是否已经过期
//已过期返回true
function overdue(date) {
    return !dateCompare(date, getCurrentDate());
}
//筛选
function filterSelect(event) {
    $("all").classList.remove("selected");
    $("finished").classList.remove("selected");
    $("unfinished").classList.remove("selected");

    window.mod.data.filter = event.currentTarget.id;
    event.currentTarget.classList.add("selected");
    update();
}
//判断是否全部完成
function isallFinished() {
    let result = true;
    window.mod.data.items.forEach(item => {
        if (!item.completed) {
            result = false;
        }
    });
    return result;
}
//完成list所有元素
function finishAll() {
    window.mod.data.items.forEach(item => {
        item.completed = true;
    });
    update();
}
//取消完成所有元素
function unfinishAll() {
    window.mod.data.items.forEach(item => {
        item.completed = false;
    });
    update();
}
//清除已完成元素
function clearFinished() {
    let ids = [];
    window.mod.data.items.forEach(item => {
        if (item.completed) {
            ids.push(item.id);
        }
    });
    ids.forEach(id => {
        window.mod.removeItem(id)
    });
    update();
}

