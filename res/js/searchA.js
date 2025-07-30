document.getElementById('SearchArea').innerHTML="      <input type=\"text\" id=\"SearchText\" placeholder=\"中文搜索...\" \/>      <a id=\"SearchBtn\" onclick=\"searchA()\">搜索<\/a>      <ul id=\"SearchForm\"><\/ul>";
function searchA(){
  document.getElementById('SearchForm').innerHTML="";
  var InputValue=document.getElementById('SearchText').value;
  if (InputValue.includes('周')||InputValue.includes('恩')||InputValue.includes('来')||InputValue.includes('报')) {searchZhoubao();}
  if (InputValue.includes('一')||InputValue.includes('草')||InputValue.includes('种')||InputValue.includes('初')||InputValue.includes('中')) {searchYicaozhong();}
  if (InputValue.includes('草')||InputValue.includes('皮')||InputValue.includes('土')||InputValue.includes('壤')) {searchSoilGrass();}
}
function searchZhoubao(){
  var SearchFormLi=document.createElement('li');
  var SearchFormLi1Link=document.createElement('a');
  SearchFormLi1Link.href="zhoubao/index.html";
  SearchFormLi1Link.textContent="周恩来周报";
  SearchFormLi.appendChild(SearchFormLi1Link);
  document.getElementById('SearchForm').appendChild(SearchFormLi);
}
function searchYicaozhong(){
  var SearchFormLi=document.createElement('li');
  var SearchFormLi1Link=document.createElement('a');
  SearchFormLi1Link.href="yicaozhong/index.html";
  SearchFormLi1Link.textContent="一草种";
  SearchFormLi.appendChild(SearchFormLi1Link);
  document.getElementById('SearchForm').appendChild(SearchFormLi);
}
function searchSoilGrass(){
  var SearchFormLi=document.createElement('li');
  var SearchFormLi1Link=document.createElement('a');
  SearchFormLi1Link.href="more/soil grass/index.html";
  SearchFormLi1Link.textContent="草皮土壤";
  SearchFormLi.appendChild(SearchFormLi1Link);
  document.getElementById('SearchForm').appendChild(SearchFormLi);
}