  document.getElementById("MenuAPlace").innerHTML="      <a href=\"#\" id=\"MenuABtn\" onclick=\"openMenuA()\">菜单<\/button>";
function openMenuA()
{
  document.getElementById("MenuAArea").innerHTML="      <div><b>洽隐山房&nbsp;菜单<\/b>      <br><br>      <a href=\"#\" onclick=\"closeMenuA()\">关闭菜单<\/a>      <a onclick=\"zhuye()\">返回主页<\/a>      <\/div>      <div id=\"MenuAShadow\"><\/div>";
  document.getElementById("MenuAArea").style.display="block";
  document.getElementById("MenuAShadow").style.opacity="0.1";
}
function closeMenuA()
{
  document.getElementById("MenuAArea").style.display="none";
}
function zhuye()
{
  window.location.href="https://apkqiu.oc.com.ar/availability/zhuye.html"
}