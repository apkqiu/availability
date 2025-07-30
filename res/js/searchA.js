document.getElementById("SearchArea").innerHTML = `
  <input type=\"text\" id=\"SearchText\" placeholder=\"中文搜索...\" \/>
  <a id=\"SearchBtn\" onclick=\"searchA()\">搜索<\/a>
  <ul id=\"SearchForm\"><\/ul>
`;

const searchItems = [
  { name: "周恩来周报", url: "zhoubao/index.html" },
  { name: "一草种", url: "yicaozhong/index.html" },
  { name: "草皮土壤", url: "more/soil grass/index.html" },
];

function searchA() {
  document.getElementById("SearchForm").innerHTML = "";
  var InputValue = document.getElementById("SearchText").value;
  searchItems.forEach((element) => {
    if (test(InputValue, element.name)) {
      add(element.url, element.name);
    }
  });
}
function test(name, target) {
  var result = false;
  
  // name is a string
  for(var i = 0; i < name.length; i++) {
    if (target.indexOf(name[i]) != -1) {
      result = true;
      break;
    }
  }
  return result;
}
function add(link, name) {
  var SearchFormLi = document.createElement("li");
  var SearchFormLi1Link = document.createElement("a");
  SearchFormLi1Link.href = link;
  SearchFormLi1Link.textContent = name;
  SearchFormLi.appendChild(SearchFormLi1Link);
  document.getElementById("SearchForm").appendChild(SearchFormLi);
}
