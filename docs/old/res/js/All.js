function bodyCreateElement(e,n){var o=document.createElement(e);return o.id=n,document.body.appendChild(o),document.getElementById(n)}function addElement(e,n,o){var t=document.createElement(n);return t.id=o,e.appendChild(t),document.getElementById(o)}function GetEById(e){return document.getElementById(e)}if(localStorage.getItem("backgroundColor"))try{const e=localStorage.getItem("backgroundColor"),n=JSON.parse(e);if(document.body.style.backgroundColor=n,!document.body.style.backgroundColor)throw new Error("Error")}catch{alert("\u89E3\u6790\u80CC\u666F\u989C\u8272\u65F6\u53D1\u751F\u9519\u8BEF!\u8BF7\u81F3 \u8D26\u53F7\u7BA1\u7406>\u4E2A\u6027\u5316 \u8FDB\u884C\u8BBE\u7F6E\u5408\u6CD5\u7684\u989C\u8272!")}localStorage.getItem("be")||(alert("\u68C0\u6D4B\u5230\u60A8\u6CA1\u6709\u7528\u6237\u6570\u636E\uFF0C\u5C06\u4E3A\u60A8\u65B0\u5EFA\uFF0C\u6765\u4FDD\u8BC1\u6B63\u5E38\u4F7F\u7528\u548C\u4FDD\u5B58\u7528\u6237\u6570\u636E\uFF0C\u5305\u62EC\u4E2A\u6027\u5316\u7B49\u3002"),localStorage.setItem("be","true"),localStorage.setItem("version","v1.2.1"));var guideLineDiv=bodyCreateElement("div","guideLineDiv");guideLineDiv.innerHTML=`
    <h1 class="guideLineH1">\u6D3D\u9690\u5C71\u623F</h1>
    <p id="nowPlace" style="display:inline"></p>
    <a class="anew" href="#" id="noticeboardBtn" onclick="openNoticeboard()">\u516C\u544A</a>
    <a class="anew" href="#" id="MenuABtn" onclick="openMenuA()">\u83DC\u5355</a>
    <a class="anew" href="#" id="seeErrorBtn">\u62A5\u9519</a>
    <div id="SearchArea"></div>
`,bodyCreateElement("div","MenuAArea");function openMenuA(){document.getElementById("MenuAArea").innerHTML=`
      <div><b>\u6D3D\u9690\u5C71\u623F&nbsp;\u83DC\u5355</b>
        <br><br>
        <a href="#" onclick="closeMenuA()">\u5173\u95ED\u83DC\u5355</a><br>
        <a onclick="zhuye()">\u8FD4\u56DE\u4E3B\u9875</a><br>
        <a href="more/account/index.html">\u8D26\u53F7</a>
        </div>
      <div id="MenuAShadow" onclick="closeMenuA()"></div>
      <hr>
      <b>\u529F\u80FD</b>
                          <!-- main -->
      <p>\u656C\u8BF7\u671F\u5F85</p>
    `,document.getElementById("MenuAArea").style.display="block",document.getElementById("MenuAShadow").style.opacity="0.1"}function closeMenuA(){document.getElementById("MenuAArea").style.display="none"}function zhuye(){window.location.href="https://apkqiu.oc.com.ar/availability/zhuye.html"}var noticeboardDiv=bodyCreateElement("div","noticeboardDiv");function openNoticeboard(){noticeboardDiv.style.display="block"}noticeboardDiv.innerHTML="<p>\u5F53\u524D\u8D26\u53F7\uFF1A"+localStorage.getItem("username")+"</p>",noticeboardDiv.innerHTML+=`
    <p id="goBackSchool"></p>
    <p>
        v1.3.3\u4E3B\u8981\u66F4\u65B0<br>
        1.\u66F4\u65B0\u8272\u5F69;<br>
        2.\u4FEE\u590D\u4E86\u4E00\u4E9B\u5DF2\u77E5\u95EE\u9898
    </p>
    <hr>
    <p>
        v1.3.2\u4E3B\u8981\u66F4\u65B0<br>
        1.\u66F4\u65B0\u4E86\u9AD8\u7EA7\u4E3B\u9875<br>
        2.\u4FEE\u590D\u4E86\u4E00\u4E9B\u5DF2\u77E5\u95EE\u9898\u3002
    </p>
    <hr>
    <p>
        v1.2.1\u7248\u672C\u66F4\u65B0\uFF1A
       <br>
       1.\u66F4\u65B0\u4E86\u8D26\u53F7\u7BA1\u7406\u3002\u66F4\u65B0\u4E86\u4E2A\u6027\u5316\u3002
       <br>
       2.\u66F4\u65B0\u516C\u544A\u3002 
       <br>
       3.\u4FEE\u590D\u4E86\u4E00\u4E9B\u5DF2\u77E5\u95EE\u9898\u3002
    </p>
    <a id="closeNoticeboardBtn">\u5173\u95ED</a>
`,document.getElementById("closeNoticeboardBtn").onclick=function(){noticeboardDiv.style.display="none"};function goBackSchool(e){var n=new Date,o=new Date(e),t=o-n;return t}document.getElementById("goBackSchool").innerHTML="\u8DDD\u79BB\u5F00\u5B66\u8FD8\u6709"+goBackSchool("2025-9-1 00:00:00")/1e3/60/60/24+"\u5929";
