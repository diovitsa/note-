//CONTEXT MENU PREVENT
var wholeScreen = document.querySelector("#wrap");
wholeScreen.oncontextmenu = function (e) {
    e.preventDefault();
}

//MODAL WINDOW FOR ADDING
var modal = document.querySelector("#myModal");
var notesList = document.querySelector('#notesList');
var plusBtn = document.querySelector("#plus");
var addBtn = document.querySelector("#addNote");
var span = document.querySelector(".close");


function add() {
    modal.style.display = "block";
}
plusBtn.onclick = add;
addBtn.onclick = add;
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//VIEW CHANGIN
var firstScreen = document.querySelector('#first');
var secondScreen = document.querySelector('#second');
var back = document.querySelector('#back');

back.onclick = function () {
    firstView();
    textInput.value = "";
    textArea.value = "";
    edit.style.display = "none";
    save.style.display = "block"
    if (list) {
        list.style.display = "none";
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    }

}

function secondView() {
    firstScreen.style.zIndex = "1";
    firstScreen.style.display = "none";
    secondScreen.style.zIndex = "2";
    secondScreen.style.display = "block";
}
function firstView() {
    firstScreen.style.zIndex = "2";
    firstScreen.style.display = "block";
    secondScreen.style.zIndex = "1";
    secondScreen.style.display = "none";
}

//ITEM DELETE
function deleteItem() {
    var questForDelete = confirm("Are u shure that u wanna delete this item?");
    if (questForDelete) {
        firstScreen.removeChild(this);
    }
    if (firstScreen.childNodes.length == '5') {
        addBtn.style.display = "block";
    }
}


//TEXT CREATING
var listItemText = document.querySelector('.list-item-text');
listItemText.onclick = textCreating;

var textInput = document.querySelector('#topicHeader');
var textArea = document.querySelector('#textArea');
var plusItem = document.querySelector('#plus-item')
function textCreating() {
    textArea.style.display = "block";
    plusItem.style.display = "none";
    secondView();
    modal.style.display = "none";

    //SAVE-TEXT
    var save = document.querySelector('#save');
    var edit = document.querySelector('#edit');
    save.onclick = function () {

        if (textInput.value == "" || textArea.value == "") {
            alert("Fill in all areas!");
            return;
        }
        firstView();
        addBtn.style.display = "none";
        notesList.insertAdjacentHTML("beforebegin", "<div class ='added-item text'><p class='text-header'>"
            + textInput.value + "</p><p class='text-content'>" + textArea.value + "</p></div>");
        textInput.value = "";
        textArea.value = "";

        //ITEM DELETE
        var itemstoDelete = document.querySelectorAll('.added-item');
        for (var i = 0; i < itemstoDelete.length; i++) {
            itemstoDelete[i].oncontextmenu = deleteItem;
        }


        var itemsText = document.querySelectorAll(".text");
        for (let i = 0; i < itemsText.length; i++) {
            itemsText[i].onclick = function () {
                var that = this;
                textArea.style.display = "block";
                plusItem.style.display = "none";
                save.style.display = "none";
                edit.style.display = "block";
                secondView();
                textInput.value = this.firstChild.innerHTML;
                textArea.value = this.lastChild.innerHTML;
                edit.onclick = function () {
                    firstView();
                    that.firstChild.innerHTML = textInput.value;
                    that.lastChild.innerHTML = textArea.value;
                    textInput.value = "";
                    textArea.value = "";
                    save.style.display = "block"
                    edit.style.display = "none";
                }
            }
        }
    }
}







//CHECK CREATING
var listItemCheck = document.querySelector('.list-item-check');
listItemCheck.onclick = checkCreating;
var list;
var newLi;
function checkCreating() {
    plusItem.style.display = "block";
    textArea.style.display = "none";
    secondView();
    modal.style.display = "none";
    list = document.querySelector("#check-list");
    list.style.display = "block";

    plusItem.onclick = function () {
        var listContent = prompt("Enter your list content.");
        if (!listContent == "") {
            newLi = document.createElement('li');
            newLi.classList.add("list-unit");
            newLi.setAttribute("id", "idForDelete");
            newLi.innerHTML = listContent;
            list.appendChild(newLi);
            newLi.ondblclick = function () {
                list.removeChild(this);
            }
        }

    }

    //SAVE-CHECKLIST
    save.onclick = function () {
        if (textInput.value == "") {
            alert("Fill in all areas!");
            return;
        }
        firstView();
        addBtn.style.display = "none";
        list.style.display = "none";
        textArea.style.display = "block";
        notesList.insertAdjacentHTML("beforebegin", "<ul class='check-header added-item check'>"
            + textInput.value + list.innerHTML + "</ul>");
        textInput.value = "";
        list.innerHTML = "";


        //ITEM DELETE
        var itemstoDelete = document.querySelectorAll('.added-item');
        for (var i = 0; i < itemstoDelete.length; i++) {
            itemstoDelete[i].oncontextmenu = deleteItem;
        }


        var itemsCheck = document.querySelectorAll(".check");
        for (let i = 0; i < itemsCheck.length; i++) {
            itemsCheck[i].onclick = function () {
                var that = this;
                plusItem.style.display = "block"
                save.style.display = "none"
                edit.style.display = "block";
                secondView();
                textArea.style.display = "none";
                textInput.value = this.firstChild.textContent;

                for (let i = 1; i < this.childNodes.length; i++) {
                    var clone = this.childNodes[i].cloneNode(true);
                    list.appendChild(clone);
                }
                list.style.display = "block";

                //LIST ITEM DELETE
                var liToDelete = document.querySelectorAll('#idForDelete');
                for (let i = 0; i < liToDelete.length; i++) {
                    liToDelete[i].ondblclick = function () {
                        list.removeChild(this);
                    }
                }

                edit.onclick = function () {
                    textArea.style.display = "block";
                    firstView();
                    that.firstChild.textContent = textInput.value;
                    while (that.childNodes[1]) {
                        that.removeChild(that.childNodes[1]);
                    }
                    while (list.firstChild) {
                        that.appendChild(list.firstChild);
                    }
                    textInput.value = "";
                    save.style.display = "block"
                    edit.style.display = "none";

                }
            }
        }
    }
}

//SEARCH
var searchBtn = document.querySelector('#search');
var searchInput = document.querySelector("#searchInp");
var logo = document.querySelector("#logo");
searchBtn.onclick = function () {
    searchBtn.style.display = "none";
    plusBtn.style.display = "none";
    searchInput.style.display = "block";
    logo.style.display = "none";
    searchInput.focus();
}
searchInput.onblur = function () {
    searchBtn.style.display = "block";
    plusBtn.style.display = "block";
    searchInput.style.display = "none";
    searchInput.value = "";
    logo.style.display = "block";
    setTimeout(() =>{
        searchFilter();
    },100); 
}

searchInput.oninput = searchFilter;
function searchFilter() {
    let filter = searchInput.value.toLowerCase();
    let itemsToFilter = document.querySelectorAll('.added-item');
    for (let i = 0; i < itemsToFilter.length; i++) {

        if (itemsToFilter[i].textContent.toLowerCase().indexOf(filter) > -1) {
            itemsToFilter[i].style.display = "block";
        }
        else {
            itemsToFilter[i].style.display = "none";
        }
    }

}