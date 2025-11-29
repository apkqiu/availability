document.getElementById("lunBoTuArea").innerHTML=`
        <div class="carousel-container">
            <div class="carousel">
                <div class="slide">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="\u5C71\u8109">
                    <div class="slide-content">
                        <h2>\u58EE\u4E3D\u5C71\u8109</h2>
                        <p>\u63A2\u7D22\u4E16\u754C\u6700\u9AD8\u5CF0\u548C\u6700\u7F8E\u5C71\u8109\uFF0C\u611F\u53D7\u5927\u81EA\u7136\u7684\u96C4\u4F1F\u4E0E\u58EE\u4E3D\u3002</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/1.png" alt="\u68EE\u6797">
                    <div class="slide-content">
                        <h2>\u4E5D\u70B9\u949F\u51FA\u592A\u9633</h2>
                        <p>\u540D\u4EBA\u540D\u8A00\u3002</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/2.jpg" alt="\u6E56\u6CCA">
                    <div class="slide-content">
                        <h2>\u6211\u6559\u5BA4\u98DE\u9E1F</h2>
                        <p>\u5728\u6E05\u6F88\u7684\u6E56\u6CCA\u8FB9\uFF0C\u4EAB\u53D7\u7247\u523B\u7684\u5B81\u9759\u4E0E\u5E73\u548C\u3002</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/3.jpg" alt="\u6C99\u6F20">
                    <div class="slide-content">
                        <h2>\u6211\u540C\u5B66\u80DC\u5229\u5B8C\u6210\u6691\u5047\u4F5C\u4E1A</h2>
                        <p>\u7A7F\u8D8A\u91D1\u8272\u6C99\u4E18\uFF0C\u4F53\u9A8C\u6C99\u6F20\u7684\u58EE\u9614\u4E0E\u795E\u79D8\u3002</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/4.jpg" alt="\u6D77\u6D0B">
                    <div class="slide-content">
                        <h2>\u8001\u6BCD\u9E21\u53D8\u9E2D\u4E86</h2>
                        <p>Soil Grass\u2014\u2014\u540D\u4EBA\u540D\u8A00</p>
                    </div>
                </div>
            </div>
            
            <div class="carousel-controls">
                <button class="control-btn prev-btn">&#10094;</button>
                <button class="control-btn next-btn">&#10095;</button>
            </div>
            
            <div class="carousel-indicators">
                <div class="indicator active" data-index="0"></div>
                <div class="indicator" data-index="1"></div>
                <div class="indicator" data-index="2"></div>
                <div class="indicator" data-index="3"></div>
                <div class="indicator" data-index="4"></div>
            </div>
        </div>
        
`,document.addEventListener("DOMContentLoaded",function(){const s=document.querySelector(".carousel"),r=document.querySelectorAll(".slide"),a=document.querySelectorAll(".indicator"),u=document.querySelector(".prev-btn"),v=document.querySelector(".next-btn"),h=document.getElementById("pauseBtn"),g=document.getElementById("playBtn");let t=0,c;const i=r.length;o();function d(){s.style.transform=`translateX(-${t*20}%)`,a.forEach((e,m)=>{m===t?e.classList.add("active"):e.classList.remove("active")})}function l(){t=(t+1)%i,d()}function p(){t=(t-1+i)%i,d()}function o(){c=setInterval(l,4e3)}function n(){clearInterval(c)}v.addEventListener("click",()=>{l(),n()}),u.addEventListener("click",()=>{p(),n()}),a.forEach(e=>{e.addEventListener("click",()=>{t=parseInt(e.getAttribute("data-index")),d(),n()})}),s.parentElement.addEventListener("mouseenter",n),s.parentElement.addEventListener("mouseleave",o)});
