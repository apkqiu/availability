//All.js旧版
//JSON初始化
const userBe = localStorage.getItem('be');
if (userBe) {
    const JSONBodyBackgroundColor = localStorage.getItem('backgroundColor');
    const JSONbodyBackgroundColorValue = JSON.parse(JSONBodyBackgroundColor);
    try {
        document.body.style.backgroundColor = JSONbodyBackgroundColorValue;
    } catch (e) {
        alert('背景颜色发生错误!');
    }
} else {
    alert('检测到您没有用户数据，将为您新建，来保证正常使用和保存用户数据，包括个性化等。');
    localStorage.setItem('be', 'true');
    localStorage.setItem('version', 'v1.1.0');
}
//menu
var MenuAPlaceNewDiv = document.createElement('div');
var MenuAAreaNewDiv = document.createElement('div');
MenuAPlaceNewDiv.id = 'MenuAPlace';
MenuAAreaNewDiv.id = 'MenuAArea';
document.body.appendChild(MenuAPlaceNewDiv);
document.body.appendChild(MenuAAreaNewDiv);
document.getElementById('MenuAPlace').innerHTML = `
      <a href=\"#\" id=\"MenuABtn\" onclick=\"openMenuA()\">菜单<\/a>
`;
function openMenuA() {
    document.getElementById('MenuAArea').innerHTML = `
      <div><b>洽隐山房&nbsp;菜单<\/b>
        <br><br>
        <a href=\"#\" onclick=\"closeMenuA()\">关闭菜单<\/a><br>
        <a onclick=\"zhuye()\">返回主页<\/a><br>
        <a href="more/account/index.html">账号</a>
        <\/div>
      <div id=\"MenuAShadow\">
      <\/div>
      <hr>
      <b>功能</b>
                          <!-- main -->
      <p>敬请期待</p>
    `;
    document.getElementById('MenuAArea').style.display = 'block';
    document.getElementById('MenuAShadow').style.opacity = '0.1';
    //注册单击事件
    document.getElementById('MenuAShadow').onclick = function () {
        closeMenuA();
    };
}
function closeMenuA() {
    document.getElementById('MenuAArea').style.display = 'none';
}
function zhuye() {
    window.location.href = 'https://apkqiu.oc.com.ar/availability/zhuye.html';
}
