  document.getElementById("MenuAPlace").innerHTML="      <button type=\"button\" id=\"MenuABtn\" onclick=\"openMenuA()\">菜单<\/button>";
function openMenuA()
{
  document.getElementById("MenuAArea").innerHTML="      <div><b>洽隐山房&nbsp;菜单<\/b>      <br><br>      <button type=\"button\" onclick=\"closeMenuA()\">关闭菜单<\/button>      <button type=\"button\" onclick=\"zhuye()\">返回主页<\/button>      <\/div>      <div id=\"MenuAShadow\"><\/div>";
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