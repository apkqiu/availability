const srka = document.getElementById('srka');
const fka = document.getElementById('fka');

// 添加输入事件监听器
srka.addEventListener('input', function() {
    // 获取输入的值并转换为小写方便比较
    const value = srka.value.toLowerCase();
    
    // 清空之前的效果
    fka.textContent = '';
    fka.style.backgroundColor = '#f9f9f9';
    
    if (value === 'zhoubao') {
        fka.textContent = '周恩来周报';
        fka.style.backgroundColor = '#d4edda';
        window.location.href= 'zhoubao/index.html';
    } else if (value === 'yicaozhong') {
        window.location.href= 'yicaozhong/index.html';
        fka.textContent = '一草种';
    } else if (value === 'game') {
    //game
        window.location.href= 'more/game/game.html';
        fka.style.backgroundColor = '#fff3cd';
        fka.textContent = 'game';
    //nihao
    } else if (value === 'nihao')  {
        window.location.href= 'zhuye.html';
        fka.style.backgroundColor = '#cce5ff';
    //soil grass
    } else if (value === 'soil grass')  {
        window.location.href= 'more/soil grass/index.html';
        fka.style.backgroundColor = '#cce5ff';
        fka.textContent = 'Soil Grass';
    }
});