alert("\u70B9\u51FB\u83DC\u5355\u6765\u7F16\u8F91"),document.getElementById("MenuAPlace").innerHTML=`
    <a href="#" id="MenuABtn" onclick="openMenuA()">\u83DC\u5355</a>
`;function openMenuA(){document.getElementById("MenuAArea").innerHTML=`
        <div>
          <b>\u83DC\u5355</b>
          <br>
          <a href="#" onclick="closeMenu()">\u5173\u95ED\u83DC\u5355</a>
          <a onclick="zhuye()">\u8FD4\u56DE\u4E3B\u9875</a>
        </div>
        <div id="MenuAShadow"></div>
        <br>
        <div>
          <input type="text" id="searchOfAll" placeholder="\u641C\u7D22">
          <a id="searchOfAllBtn">\u641C\u7D22</a>
          <ul id="searchOfAllResult"></ul>
        </div>
        <div>
          <b>\u6DFB\u52A0</b><br>
          <input type="text" id="addDivInput" placeholder="\u8F93\u5165\u5185\u5BB9\u5206\u533Aid">
          <a id="addElementDiv">\u65B0\u5EFA\u5185\u5BB9\u5206\u533A(div)</a>
          <br>
          <input type="text" id="addPInputByDiv" placeholder="\u8981\u52A0\u5185\u5BB9\u8FDB\u7684\u5185\u5BB9\u5206\u533Aid">
          <br>
          <textarea id="addPInput" value="\u5185\u5BB9" placeholder="\u8F93\u5165\u5185\u5BB9\u4E0B\u65B9\u6309\u94AE\u6DFB\u52A0"></textarea>
          <br>
          <a id="addElementH1">\u521B\u5EFA\u4E00\u7EA7\u6807\u9898</a>
          <a id="addElementP">\u65B0\u5EFA\u6BB5\u843D</a>
        </div>
        <br>
        <div>
          <b>\u5220\u9664</b><br>
          <input type="text" id="deleteElementByDiv" placeholder="\u8981\u5220\u7684\u5143\u7D20\u6240\u5C5Ediv\u7684id">
          <input type="text" id="deleteElementById" placeholder="\u8981\u5220\u9664\u7684\u5143\u7D20\u8282\u70B9\u7684id">
          <a id="deleteElement">\u5220\u9664</a>
        </div>
        <br>
        <div>
          <b>\u4FEE\u6539\u5143\u7D20\u8282\u70B9\uFF08div\u548Cbody\u9664\u5916\uFF09\uFF08\u6D4B\u8BD5\u4E2D\uFF09</b><br>
          <input type="text" id="changeStyle" placeholder="\u8F93\u5165\u8981\u4FEE\u6539\u5143\u7D20\u8282\u70B9\u7684id">
          <div id="changeBtns">
            <a id="changeFontColor">color\u5B57\u989C\u8272</a>
            <a id="changeFontFamily">font-family\u5B57\u4F53</a>
            <a id="changeFontSize">font-size\u5B57\u4F53</a>
            <a id="changeBackground">background\u80CC\u666F</a>
            <a id="changePosition">position\u5B9A\u4F4D\u65B9\u5F0F</a>
            <a id="changePlace">\u5B9A\u4F4D</a>
            <a id="changeOpacity">opacity\u4E0D\u900F\u660E\u5EA6</a>
            <a id="changeAlign">align\u5BF9\u9F50\u65B9\u5F0F</a>
            <a id="changeDisplay">display\u5982\u4F55\u7ED8\u5236</a>
            <a id="changeVisibility">visibility\u662F\u5426\u53EF\u89C1</a>
            <a id="changeFloat">float\u6D6E\u52A8</a>
            <a id="changeWidth">width\u5BBD\u5EA6</a>
            <a id="changeHeight">height\u9AD8\u5EA6</a>
            <a id="changePadding">padding\u586B\u5145</a>
            <a id="changeBorder">border\u8FB9\u6846</a>
            <a id="changeMargin">margin\u8FB9\u8DDD</a>
          </div>
        </div>
        <br>
        <div>
          <b>\u4FEE\u6539\u5185\u5BB9\u5206\u533A(div)\u548C\u6587\u6863\u4E3B\u4F53(body)</b>
        \u656C\u8BF7\u671F\u5F85
        </div>
    `,document.getElementById("MenuAArea").style.display="block",document.getElementById("MenuAShadow").style.opacity="0.1",document.getElementById("addElementDiv").onclick=function(){var t=document.getElementById("addDivInput").value;addDivFn(t)};var e="\u8BF7\u8F93\u5165\u521B\u5EFA\u7684\u8BE5\u5143\u7D20\u8282\u70B9\u7684id(\u4E0D\u80FD\u4E0E\u5176\u4ED6\u5143\u7D20\u8282\u70B9\u7684ID\u91CD\u590D\uFF0C\u5EFA\u8BAE\u4EC5\u542B\u6570\u5B57\u3001\u5B57\u6BCD\u7B49\u5B57\u7B26\uFF0C\u4F60\u60F3\u8F93\u5165\u4E2D\u6587\u4E5F\u884C)";document.getElementById("addElementP").onclick=function(){addElementFn("p",prompt(e))},document.getElementById("addElementH1").onclick=function(){addElementFn("h1",prompt(e))},document.getElementById("deleteElement").onclick=function(){var t=document.getElementById("deleteElementByDiv").value,n=document.getElementById("deleteElementById").value;deleteElementFn(t,n)},document.getElementById("searchOfAllBtn").onclick=function(){var t=document.getElementById("searchOfAll").value;searchOfAllFn(t)}}function closeMenu(){document.getElementById("MenuAArea").style.display="none"}function zhuye(){window.location.href="../zhuye.html"}function addDivFn(e){e==""&&alert("\u8BF7\u67E5\u6B63\u5185\u5BB9\u5206\u533Aid\uFF01");var t=document.createElement("div");t.id=e,document.body.appendChild(t)}function addElementFn(e,t){var n=document.getElementById("addPInput").value,d=document.createElement(e),a=document.getElementById("addPInputByDiv").value,i=document.getElementById(a);d.id=t,d.textContent=n,i.appendChild(d)}function deleteElementFn(e,t){var n=document.getElementById(e),d=document.getElementById(t);n.removeChild(d)}function searchOfAllFn(e){/[新建内容分区]/.test(e)&&addSearchOfAllResult("\u65B0\u5EFA\u5185\u5BB9\u5206\u533A","#addElementDiv"),/[创建一级标题]/.test(e)&&addSearchOfAllResult("\u521B\u5EFA\u4E00\u7EA7\u6807\u9898","#addElementH1"),/[新建段落]/.test(e)&&addSearchOfAllResult("\u65B0\u5EFA\u6BB5\u843D","#addElementP"),/[删除]/.test(e)&&addSearchOfAllResult("\u5220\u9664","#deleteElement")}function addSearchOfAllResult(e,t){var n=document.getElementById("searchOfAllResult"),d=document.createElement("li"),a=document.createElement("a");a.textContent=e,a.href=t,d.appendChild(a),n.appendChild(d)}
