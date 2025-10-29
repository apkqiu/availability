const userBe=localStorage.getItem("be");if(userBe){const e=localStorage.getItem("backgroundColor"),n=JSON.parse(e);try{document.body.style.backgroundColor=n}catch{alert("\u80CC\u666F\u989C\u8272\u53D1\u751F\u9519\u8BEF!")}}else alert("\u68C0\u6D4B\u5230\u60A8\u6CA1\u6709\u7528\u6237\u6570\u636E\uFF0C\u5C06\u4E3A\u60A8\u65B0\u5EFA\uFF0C\u6765\u4FDD\u8BC1\u6B63\u5E38\u4F7F\u7528\u548C\u4FDD\u5B58\u7528\u6237\u6570\u636E\uFF0C\u5305\u62EC\u4E2A\u6027\u5316\u7B49\u3002"),localStorage.setItem("be","true"),localStorage.setItem("version","v1.1.0");var MenuAPlaceNewDiv=document.createElement("div"),MenuAAreaNewDiv=document.createElement("div");MenuAPlaceNewDiv.id="MenuAPlace",MenuAAreaNewDiv.id="MenuAArea",document.body.appendChild(MenuAPlaceNewDiv),document.body.appendChild(MenuAAreaNewDiv),document.getElementById("MenuAPlace").innerHTML=`
      <a href="#" id="MenuABtn" onclick="openMenuA()">\u83DC\u5355</a>
`;function openMenuA(){document.getElementById("MenuAArea").innerHTML=`
      <div><b>\u6D3D\u9690\u5C71\u623F&nbsp;\u83DC\u5355</b>
        <br><br>
        <a href="#" onclick="closeMenuA()">\u5173\u95ED\u83DC\u5355</a><br>
        <a onclick="zhuye()">\u8FD4\u56DE\u4E3B\u9875</a><br>
        <a href="more/account/index.html">\u8D26\u53F7</a>
        </div>
      <div id="MenuAShadow">
      </div>
      <hr>
      <b>\u529F\u80FD</b>
                          <!-- main -->
      <p>\u656C\u8BF7\u671F\u5F85</p>
    `,document.getElementById("MenuAArea").style.display="block",document.getElementById("MenuAShadow").style.opacity="0.1",document.getElementById("MenuAShadow").onclick=function(){closeMenuA()}}function closeMenuA(){document.getElementById("MenuAArea").style.display="none"}function zhuye(){window.location.href="https://apkqiu.oc.com.ar/availability/zhuye.html"}
