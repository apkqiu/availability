alert('点击菜单来编辑');
//菜单文字
document.getElementById('MenuAPlace').innerHTML = `
    <a href=\"#\" id=\"MenuABtn\" onclick=\"openMenuA()\">菜单<\/a>
`;
function openMenuA() {
    document.getElementById('MenuAArea').innerHTML = `
        <div>
          <b>菜单<\/b>
          <br>
          <a href=\"#\" onclick=\"closeMenu()\">关闭菜单<\/a>
          <a onclick=\"zhuye()\">返回主页<\/a>
        <\/div>
        <div id=\"MenuAShadow\"><\/div>
        <br>
        <div>
          <input type="text" id="searchOfAll" placeholder="搜索">
          <a id="searchOfAllBtn">搜索</a>
          <ul id="searchOfAllResult"></ul>
        </div>
        <div>
          <b>添加</b><br>
          <input type="text" id="addDivInput" placeholder="输入内容分区id">
          <a id="addElementDiv">新建内容分区(div)</a>
          <br>
          <input type="text" id="addPInputByDiv" placeholder="要加内容进的内容分区id">
          <br>
          <textarea id="addPInput" value="内容" placeholder="输入内容下方按钮添加"></textarea>
          <br>
          <a id="addElementH1">创建一级标题</a>
          <a id="addElementP">新建段落<\/a>
        </div>
        <br>
        <div>
          <b>删除</b><br>
          <input type="text" id="deleteElementByDiv" placeholder="要删的元素所属div的id">
          <input type="text" id="deleteElementById" placeholder="要删除的元素节点的id">
          <a id="deleteElement">删除</a>
        </div>
        <br>
        <div>
          <b>修改元素节点（div和body除外）（测试中）</b><br>
          <input type="text" id="changeStyle" placeholder="输入要修改元素节点的id">
          <div id="changeBtns">
            <a id="changeFontColor">color字颜色</a>
            <a id="changeFontFamily">font-family字体</a>
            <a id="changeFontSize">font-size字体</a>
            <a id="changeBackground">background背景</a>
            <a id="changePosition">position定位方式</a>
            <a id="changePlace">定位</a>
            <a id="changeOpacity">opacity不透明度</a>
            <a id="changeAlign">align对齐方式</a>
            <a id="changeDisplay">display如何绘制</a>
            <a id="changeVisibility">visibility是否可见</a>
            <a id="changeFloat">float浮动</a>
            <a id="changeWidth">width宽度</a>
            <a id="changeHeight">height高度</a>
            <a id="changePadding">padding填充</a>
            <a id="changeBorder">border边框</a>
            <a id="changeMargin">margin边距</a>
          </div>
        </div>
        <br>
        <div>
          <b>修改内容分区(div)和文档主体(body)</b>
        敬请期待
        </div>
    `;
    //菜单样式
    document.getElementById('MenuAArea').style.display = 'block';
    document.getElementById('MenuAShadow').style.opacity = '0.1';
    //添加div(1)
    document.getElementById('addElementDiv').onclick = function () {
        var divId = document.getElementById('addDivInput').value;
        addDivFn(divId);
    };
    //添加元素节点(1)
    var theID = '请输入创建的该元素节点的id(不能与其他元素节点的ID重复，建议仅含数字、字母等字符，你想输入中文也行)';
    document.getElementById('addElementP').onclick = function () {
        addElementFn('p', prompt(theID));
    };
    document.getElementById('addElementH1').onclick = function () {
        addElementFn('h1', prompt(theID));
    };
    //删除元素节点(1)
    document.getElementById('deleteElement').onclick = function () {
        var deleteDiv = document.getElementById('deleteElementByDiv').value;
        var deleteId = document.getElementById('deleteElementById').value;
        deleteElementFn(deleteDiv, deleteId);
    };
    //全局搜索框
    document.getElementById('searchOfAllBtn').onclick = function () {
        var searchOfAllText = document.getElementById('searchOfAll').value;
        searchOfAllFn(searchOfAllText);
    };
}
//菜单功能
function closeMenu() {
    document.getElementById('MenuAArea').style.display = 'none';
} //关闭菜单
function zhuye() {
    window.location.href = '../zhuye.html';
} //返回主页
//添加div(2)
function addDivFn(DivId) {
    if (DivId == '') {
        alert('请查正内容分区id！');
    }
    var newDiv = document.createElement('div');
    newDiv.id = DivId;
    document.body.appendChild(newDiv);
}
//添加元素节点(2)
function addElementFn(elementType, elementId) {
    var inputText = document.getElementById('addPInput').value;
    var newElement = document.createElement(elementType);
    var parentDivId = document.getElementById('addPInputByDiv').value;
    var parentDiv = document.getElementById(parentDivId);
    newElement.id = elementId;
    newElement.textContent = inputText;
    parentDiv.appendChild(newElement);
}
//删除元素节点
function deleteElementFn(divId, deleteId) {
    var parentDiv = document.getElementById(divId);
    var childDiv = document.getElementById(deleteId);
    parentDiv.removeChild(childDiv);
}
//全局搜索
function searchOfAllFn(theText) {
    if (/[新建内容分区]/.test(theText)) {
        addSearchOfAllResult('新建内容分区', '#addElementDiv');
    }
    if (/[创建一级标题]/.test(theText)) {
        addSearchOfAllResult('创建一级标题', '#addElementH1');
    }
    if (/[新建段落]/.test(theText)) {
        addSearchOfAllResult('新建段落', '#addElementP');
    }
    if (/[删除]/.test(theText)) {
        addSearchOfAllResult('删除', '#deleteElement');
    }
}
function addSearchOfAllResult(theText, theHref) {
    var theResult = document.getElementById('searchOfAllResult');
    var newLi = document.createElement('li');
    var newA = document.createElement('a');
    newA.textContent = theText;
    newA.href = theHref;
    newLi.appendChild(newA);
    theResult.appendChild(newLi);
}
