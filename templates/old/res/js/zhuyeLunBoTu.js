document.getElementById("lunBoTuArea").innerHTML=`
        <div class="carousel-container">
            <div class="carousel">
                <div class="slide">
                    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="山脉">
                    <div class="slide-content">
                        <h2>壮丽山脉</h2>
                        <p>探索世界最高峰和最美山脉，感受大自然的雄伟与壮丽。</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/1.png" alt="森林">
                    <div class="slide-content">
                        <h2>九点钟出太阳</h2>
                        <p>名人名言。</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/2.jpg" alt="湖泊">
                    <div class="slide-content">
                        <h2>我教室飞鸟</h2>
                        <p>在清澈的湖泊边，享受片刻的宁静与平和。</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/3.jpg" alt="沙漠">
                    <div class="slide-content">
                        <h2>我同学胜利完成暑假作业</h2>
                        <p>穿越金色沙丘，体验沙漠的壮阔与神秘。</p>
                    </div>
                </div>
                <div class="slide">
                    <img src="res/img/zhuyeLunBoTu/4.jpg" alt="海洋">
                    <div class="slide-content">
                        <h2>老母鸡变鸭了</h2>
                        <p>Soil Grass——名人名言</p>
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
        
`;
        document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.querySelector('.carousel');
            const slides = document.querySelectorAll('.slide');
            const indicators = document.querySelectorAll('.indicator');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const pauseBtn = document.getElementById('pauseBtn');
            const playBtn = document.getElementById('playBtn');
            
            let currentIndex = 0;
            let autoPlayInterval;
            const slideCount = slides.length;
            
            // 初始化自动播放
            startAutoPlay();
            
            // 更新轮播图位置
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentIndex * 20}%)`;
                
                // 更新指示器
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            // 下一张
            function nextSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }
            
            // 上一张
            function prevSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateCarousel();
            }
            
            // 开始自动播放
            function startAutoPlay() {
                autoPlayInterval = setInterval(nextSlide, 4000);
            }
            
            // 停止自动播放
            function stopAutoPlay() {
                clearInterval(autoPlayInterval);
            }
            
            // 事件监听
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
            });
            
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
            });
            
            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    currentIndex = parseInt(indicator.getAttribute('data-index'));
                    updateCarousel();
                    stopAutoPlay();
                });
            });
            
            
            // 鼠标悬停时暂停自动播放
            carousel.parentElement.addEventListener('mouseenter', stopAutoPlay);
           carousel.parentElement.addEventListener('mouseleave', startAutoPlay);
        });
   