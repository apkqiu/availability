(function () {
	// 事件处理
    var dectetors = [];
	function on_dev_open() {
        for (let i = 0; i < dectetors.length; i++) {
            clearInterval(dectetors[i]);
        }
		$('#app').html('<h1>检测到开发者工具被打开</h1><p>请关闭开发者工具，然后刷新页面</p>');
	}
	// 法0：监听键盘
	document.onkeydown = (e) => {
		if (e.key == 'F12' || (e.ctrlKey && e.shiftKey && e.key == 'I')) {
			e.preventDefault(); // devtools
		}
		if (e.ctrlKey && e.key == 'U') {
			e.preventDefault(); // SAVE page
		}
	};
	(function () {
		// 法1：监听窗口大小变化
		function size_listener() {
			if (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200) {
				// devtools
				on_dev_open();
			}
		}
		var dectetor = setInterval(size_listener, 1);
        dectetors.push(dectetor);
	})();
	// 法2：利用console内存泄漏
	(function () {
		function now() {
			return new Date().getTime();
		}
		// 创建大对象数组
		function createLargeObject() {
			const largeObject = {};
			for (let i = 0; i < 500; i++) {
				largeObject[`${i}`] = `${i}`;
			}
			return largeObject;
		}
		// 创建大对象数组
		function createLargeObjectArray() {
			const largeObject = createLargeObject();
			const largeObjectArray = [];
			for (let i = 0; i < 50; i++) {
				largeObjectArray.push(largeObject);
			}
			return largeObjectArray;
		}

		// 计算打印执行时间
		function calculateTime(func) {
			const start = now();
			func();
			return now() - start;
		}

		const largeObjectArray = createLargeObjectArray();
		let maxPrintTime = 0;
		function console_checker() {
			// table 打印时间
			const tablePrintTime = calculateTime(() => {
				console.table(largeObjectArray);
			});
			// 普通输出时间
			const printLogTime = calculateTime(() => {
				console.log(largeObjectArray);
			});
			maxPrintTime = Math.max(maxPrintTime, printLogTime);

			if (tablePrintTime === 0 || maxPrintTime === 0) {
				return;
			} else {
				// 如果打印表格的时间是普通打印的2倍，那么就关闭
				if (tablePrintTime > maxPrintTime) {
					// 如果当前表格打印时间大于指定时间，那么将表示打开了devtools
					on_dev_open();
				}
			}
		}
		var dectetors = setInterval(console_checker, 500);
        dectetors.push(dectetor);
	});//();
	(function () {
		// 法3：RegEx劫持
		var reg = / /;
        reg.toString = function () {
			on_dev_open();
        }
	})();
    (function(){
        // 法4：Function劫持
        function nothing_todo(){};
        nothing_todo.toString = function () {
			on_dev_open();
        }
        
    })();
});
