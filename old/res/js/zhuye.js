//搜索框
var searchMember = [
	[/[周恩来报]/, '周恩来周报', 'zhoubao/index.html'],
	[/[一草种初中]/, '一草种', 'yicaozhong/index.html'],
	[/[草皮土壤]/, '草皮土壤', 'more/soil grass/index.html'],
	[/[小游戏]/, '小游戏', 'more/game/index.html'],
	[/[上课睡觉]/, '上课睡觉', 'more/game/ClassSleep.html'], //    [/[]/,"",".html"],
	[/[账号]/, '账号', 'more/account/index.html'],
];
document.getElementById('SearchArea').innerHTML = `
      <input type="text" id="SearchText" placeholder="中文搜索...">
      <a href="#" id="SearchBtn" onclick="doSearch()">搜索</a>
      <ul id="SearchForm"></ul>`;
function doSearch() {
	document.getElementById('SearchForm').innerHTML = '';
	var InputValue = document.getElementById('SearchText').value;
	for (i = 0; i < searchMember.length; i++) {
		if (searchMember[i][0].test(InputValue)) {
			search(searchMember[i][1], searchMember[i][2]);
		}
	}
}
function search(index, web) {
	ulStyle.display = 'block';
	var SearchFormLi = document.createElement('li');
	var SearchFormLi1Link = document.createElement('a');
	SearchFormLi1Link.href = web;
	SearchFormLi1Link.textContent = index;
	SearchFormLi.appendChild(SearchFormLi1Link);
	document.getElementById('SearchForm').appendChild(SearchFormLi);
	console.log('搜索完成+1');
}
var ulStyle = document.getElementById('SearchForm').style;
ulStyle.display = 'none';
ulStyle.height = '100px';
ulStyle.overflow = 'auto';
ulStyle.padding = '0';
//距离开学
function goBackSchool(time) {
	var nowTime = new Date();
	var theTime = new Date(time);
	var tillTime = theTime - nowTime;
	return tillTime;
}
document.getElementById('goBackSchool').innerHTML = '距离开学还有' + goBackSchool('2025-9-1 00:00:00') / 1000 / 60 / 60 / 24 + '天';
