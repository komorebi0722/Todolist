var itemList = [];
var addBtn = document.querySelector("#add");
addBtn.addEventListener("click", addList);
getItems();
document.getElementById("item").onkeypress=function(e){
  if(e.keyCode==13){
      addList();
      return false;
  }
}
function getItems(){
  var storedData=localStorage.getItem("storageList");
  if(storedData!=null) itemList=JSON.parse(storedData);
  showList();
}
function addList() {
  var item = document.querySelector("#item").value;
  if (item != "") {
    itemList.push(item);
    document.querySelector("#item").value = "";
    document.querySelector("#item").focus();
  }
  else{
    alert("할 일을 입력해 주세요.");
    document.querySelector("#item").focus();
  }
  localStorage.setItem("storageList",JSON.stringify(itemList));
  showList();
}
function showList() {
  var list = "<ul>";
  for (var i=0; i<itemList.length; i++) {
    list += `<li>${itemList[i]}<button class="close" id=${i}>DELETE</button><input type="checkbox" class="check"></input><hr></li>`;
  }
  list += "</ul>";
  document.querySelector('#itemList').innerHTML = list;
  var remove = document.querySelectorAll(".close");
  for(var i = 0; i < remove.length; i++){
    remove[i].addEventListener("click", removeList);
  }
  checkALL();
  lineThrough();
  deleteAll();
}
function removeList() {
  var id = this.getAttribute("id");
  itemList.splice(id, 1);
  showList();
}
function checkALL(){
  var allChecked=document.querySelector('#allchecked');
  var check=document.querySelectorAll('.check');
  allChecked.addEventListener("click",()=>{
    if(allChecked.checked){
      for(var i=0;i<check.length;i++){
        check[i].checked=true;
        check[i].closest("li").style.textDecoration="line-through";
        check[i].closest("li").style.color="#ccc";
      }
    }
    else{
      for(var i=0;i<check.length;i++){
        check[i].checked=false;
        check[i].closest("li").style.textDecoration="none";
        check[i].closest("li").style.color="black";
    }
  }
  })
}
function lineThrough(){
  var checkbox=document.querySelectorAll('.check');
  checkbox.forEach((i)=>{
    i.addEventListener("click",e=>{
      if(i.checked==true){
        i.closest("li").style.textDecoration="line-through";
        i.closest("li").style.color="#ccc";
      }
      else{
        i.closest("li").style.textDecoration="none";
        i.closest("li").style.color="black";
      }
    })
  })
}
function deleteAll(){
  var deleteAll=document.querySelector('#deleteAll');
  deleteAll.addEventListener("click",()=>{
    itemList.splice(0);
    showList();
  })
}