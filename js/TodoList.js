/*
! 기능 개요
* 1. 사용자에게 입력받고 add버튼을 누르면 todolist로 이동 (enter 입력 가능)
* 2. todolist의 각 버튼을 누르면 class로 active 할당
* 3. todolist, doing, done의 개수를 출력
* 4. axios로 서버에 값주고 받아오기? (추후 제대로)
*/
let obj = {}
window.onload = () => {
    let input = document.getElementById('input');
    input.focus();

    let count = localStorage.length;
    let showList = document.getElementById('showList');
    for (var i = 0, j = 1; i < count; i++, j++) {
        var listInner = document.createElement('div');
        listInner.setAttribute('class', 'listInner');
        listInner.innerHTML = localStorage.getItem(`list${j}`);
        showList.appendChild(listInner);
    }
}
/*
*기능 1 start */
document.getElementById('input').onkeyup = () => {
    //* 키 코드 받아오는 방법 -> https://cofs.tistory.com/12
    if (window.event.keyCode == 13) {
        makeList();
    }
}
document.getElementById('add').addEventListener('click', makeList);
let lsCnt = 1;
function makeList() {
    let listButton = document.createElement('div');
    listButton.setAttribute('class', 'listButton');
    let todoButton = document.createElement('button');
    todoButton.setAttribute('class', 'todoButton');
    todoButton.innerHTML = 'Todo';
    let doingButton = document.createElement('button');
    doingButton.setAttribute('class', 'doingButton');
    doingButton.innerHTML = 'Doing';
    let doneButton = document.createElement('button');
    doneButton.setAttribute('class', 'doneButton');
    doneButton.innerHTML = 'Done';
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.innerHTML = 'Delete';
    listButton.appendChild(todoButton);
    listButton.appendChild(doingButton);
    listButton.appendChild(doneButton);
    listButton.appendChild(deleteButton);
    let listInner = document.createElement('div');
    listInner.setAttribute('class', 'listInner');
    let listTitle = document.createElement('div');
    listTitle.setAttribute('class', 'listTitle');
    let p = document.createElement('p');
    let input = document.getElementById('input').value;
    if (input.trim() == "") {
        document.getElementById('input').focus();
        return alert('Please input enything');
    } else {
        p.innerHTML = input;
        listTitle.appendChild(p);
        listInner.appendChild(listTitle);
        listInner.appendChild(listButton);
        let showList = document.getElementById('showList');
        showList.appendChild(listInner);
        document.getElementById('input').value = "";
        document.getElementById('input').focus();

        localStorage.setItem(`list${lsCnt}`, listInner.innerHTML);
        lsCnt++;

        listActive();
        listCnt();
    }
}

/*
*기능 1 end */
/*
*기능 2 start */
function toggle() {
    this.classList.toggle('active');
}
/*
? 제가 밑에 보이는 removeList함수에서 부모 요소를 3번 참조하여
? 이상한 방법을 사용했습니다. 아무리 찾아봐도 좋다고 생각하는 방법이 
? 나오지가 않습니다. 그래서 여기있는 이 구문을 더 좋은 코드로 어떻게
? 바꿀 수 있을 까요? */
function removeList() {
    var a = confirm('삭제하시겠습니까?');
    if (a == true) {
        var p = this.parentElement;
        var pp = p.parentElement;
        var ppp = pp.parentElement;
        ppp.removeChild(pp);
    } else {
        return;
    }
}
function listActive() {
    var a = document.querySelectorAll('.todoButton');
    var b = document.querySelectorAll('.doingButton');
    var c = document.querySelectorAll('.doneButton');
    var d = document.querySelectorAll('.deleteButton');
    for (var i = 0; i < a.length; i++) {
        a[i].addEventListener('click', toggle);
        b[i].addEventListener('click', toggle);
        c[i].addEventListener('click', toggle);
        d[i].addEventListener('click', removeList);
    }
}
/*
*기능 2 end */

/*
*기능 3 start */
let ortodoButton = document.getElementsByClassName('todoButton');
let ordoingButton = document.getElementsByClassName('doingButton');
let ordoneButton = document.getElementsByClassName('doneButton');
var list = document.getElementsByClassName('listInner');
let cnt1, cnt2, cnt3;
function listCnt() {
    cnt1 = 0, cnt2 = 0, cnt3 = 0;
    for (var i = 0; i < list.length; i++) {
        var d = ortodoButton[i].classList.value;
        var e = ordoingButton[i].classList.value;
        var f = ordoneButton[i].classList.value;
        if (d == 'todoButton active') {
            cnt1 = cnt1 + 1;
        }
        if (e == 'doingButton active') {
            cnt2 = cnt2 + 1;
        }
        if (f == 'doneButton active') {
            cnt3 = cnt3 + 1;
        }
    }
    document.getElementById('todoText').innerHTML = cnt1;
    document.getElementById('doingText').innerHTML = cnt2;
    document.getElementById('doneText').innerHTML = cnt3;
}
/*
*기능 3 end */



document.getElementById('reset').addEventListener('click', () => {
    localStorage.clear();
})




























