function searchA(){
  document.getElementById('SearchForm').innerHTML="";
  var InputValue=document.getElementById('SearchText').value;
  if (InputValue.includes('周')||InputValue.includes('恩')||InputValue.includes('来')||InputValue.includes('报')) {searchZhoubao();}
  if (InputValue.includes('一')||InputValue.includes('草')||InputValue.includes('种')||InputValue.includes('初')||InputValue.includes('中')) {searchYicaozhong();}
}
function searchZhoubao(){
  var SearchFormLi1=document.createElement('li');
  var SearchFormLi1Link1=document.createElement('a');
  SearchFormLi1Link1.href="zhoubao/index.html";
  SearchFormLi1Link1.textContent="周恩来周报";
  SearchFormLi1.appendChild(SearchFormLi1Link1);
  document.getElementById('SearchForm').appendChild(SearchFormLi1);
}
function searchYicaozhong(){
  var SearchFormLi2=document.createElement('li');
  var SearchFormLi1Link2=document.createElement('a');
  SearchFormLi1Link2.href="yicaozhong/index.html";
  SearchFormLi1Link2.textContent="一草种";
  SearchFormLi2.appendChild(SearchFormLi1Link2);
  document.getElementById('SearchForm').appendChild(SearchFormLi2);
}