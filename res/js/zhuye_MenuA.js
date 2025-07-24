function openMenuA() {
    document.getElementById("MenuAArea").innerHTML =
        '    <div class="MenuAArea"><b>洽隐山房<\/b><br><br>      <button type="button" onclick="closeMenuA()">关闭菜单<\/button><br>敬请期待    <\/div>';
}
function closeMenuA() {
    document.getElementById("MenuAArea").innerHTML = "<div><\/div>";
}
