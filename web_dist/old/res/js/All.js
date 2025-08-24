//MenuA.js的新版，全部html更新后删除旧版。
                                                                                                  //一些函数
function bodyCreateElement(EType,EId){                                    //body创建元素节点
    var newE = document.createElement(EType);
    newE.id=EId;
    document.body.appendChild(newE);
    return document.getElementById(EId);
}
function addElement(addPlace,EType,EId){                                  //特定地点加入子元素
    var newE = document.createElement(EType);
    newE.id=EId;
    addPlace.appendChild(newE);
    return document.getElementById(EId);
    
}
function GetEById(theId){                                                  //getElemetnById
    return document.getElementById(theId);
}
                                                                                                  //JSON初始化
                                                                           //背景颜色
if(localStorage.getItem("backgroundColor")){
    try{
        const JSONBodyBackgroundColor = localStorage.getItem("backgroundColor");
        const JSONbodyBackgroundColorValue = JSON.parse(JSONBodyBackgroundColor);
        document.body.style.backgroundColor= JSONbodyBackgroundColorValue;
        if(!document.body.style.backgroundColor){throw new Error('Error');}
    }catch(e){
        alert('解析背景颜色时发生错误!请至 账号管理>个性化 进行设置合法的颜色!');
    }
}
                                                                            //用户数据新建
if(!localStorage.getItem("be")){
    alert('检测到您没有用户数据，将为您新建，来保证正常使用和保存用户数据，包括个性化等。');
    localStorage.setItem("be","true");
    localStorage.setItem("version","v1.2.1");
}
                                                                                                   //横条
var guideLineDiv = bodyCreateElement('div','guideLineDiv');
guideLineDiv.innerHTML=`
    <h1 class="guideLineH1">洽隐山房</h1>
    <p id="nowPlace" style="display:inline"></p>
    <a class="anew" href="#" id="noticeboardBtn" onclick="openNoticeboard()">公告</a>
    <a class="anew" href="#" id=\"MenuABtn\" onclick=\"openMenuA()\">菜单<\/a>
    <a class="anew" href="#" id="seeErrorBtn">报错</a>
    <div id="SearchArea"></div>
`;                                                                                                   //菜单
                                                                           //内容
bodyCreateElement('div','MenuAArea');
function openMenuA(){
    document.getElementById("MenuAArea").innerHTML=`
      <div><b>洽隐山房&nbsp;菜单</b>
        <br><br>
        <a href="#" onclick="closeMenuA()">关闭菜单</a><br>
        <a onclick="zhuye()">返回主页</a><br>
        <a href="more/account/index.html">账号</a>
        </div>
      <div id=\"MenuAShadow\" onclick="closeMenuA()"></div>
      <hr>
      <b>功能</b>
                          <!-- main -->
      <p>敬请期待</p>
    `;
    document.getElementById("MenuAArea").style.display="block";
    document.getElementById("MenuAShadow").style.opacity="0.1";
                                                                           //注册单击事件
}
                                                                              //一些功能
                                                 //关闭菜单
function closeMenuA(){document.getElementById("MenuAArea").style.display="none";}
                                                  //返回主页
function zhuye(){window.location.href="https://apkqiu.oc.com.ar/availability/zhuye.html"}
                                                                                                   //公告
var noticeboardDiv = bodyCreateElement('div','noticeboardDiv');
function openNoticeboard(){                                                  //打开
    noticeboardDiv.style.display = "block";
}
noticeboardDiv.innerHTML='<p>当前账号：'+localStorage.getItem('username')+'</p>';
noticeboardDiv.innerHTML+=`
    <p id="goBackSchool"></p>
    <p>
        v1.3.3主要更新<br>
        1.更新色彩;<br>
        2.修复了一些已知问题
    </p>
    <hr>
    <p>
        v1.3.2主要更新<br>
        1.更新了高级主页<br>
        2.修复了一些已知问题。
    </p>
    <hr>
    <p>
        v1.2.1版本更新：
       <br>
       1.更新了账号管理。更新了个性化。
       <br>
       2.更新公告。 
       <br>
       3.修复了一些已知问题。
    </p>
    <a id="closeNoticeboardBtn">关闭</a>
`;
document.getElementById('closeNoticeboardBtn').onclick=function(){
    noticeboardDiv.style.display = "none";
};
                                                                           //距离开学
function goBackSchool(time){
    var nowTime = new Date();
    var theTime = new Date(time);
    var tillTime = theTime - nowTime;
    return tillTime;
}
document.getElementById('goBackSchool').innerHTML="距离开学还有"+goBackSchool('2025-9-1 00:00:00')/1000/60/60/24+"天";