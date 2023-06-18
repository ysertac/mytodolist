let taskinput = document.querySelector('.taskinput');
let myTasks = document.querySelector('.mytasks');
let ul = myTasks.querySelector('.mytasks ul');
let taskList = [];

if (localStorage.getItem("newArray") !== null) {
    taskList = JSON.parse(localStorage.getItem("newArray"));
}

let starter = () => {
    if(taskList.length == 0) {
        ul.innerHTML = `<p id='empty'>Lütfen görev ekleyiniz.</p>`
    }
    else {
        for (let i = 0; i < taskList.length; i++) {
            let li = `<li>
                <div class='mycontrol'>
                    <div><input id='${taskList[i].id}' type='checkbox' class='mycheckbox' 
                    onclick='toDo(${taskList[i].id})' /></div>
                    <div>${taskList[i].name}</div>
                    <div class='mystate'></div>
                </div>
                <div class='mybuttons'>
                    <button id='${taskList[i].id}' onclick='del(${taskList[i].id})' class='btn btn-lg btn-danger'>SİL</button>
                    <button id='${taskList[i].id}' onclick='editFirst(${taskList[i].id})' data-bs-toggle="modal" 
                    data-bs-target="#exampleModal2" class='btn btn-lg btn-success'>DÜZENLE</button>
                    <div class="modal modal-lg fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" 
                    aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title" id="exampleModalLabel">Yeni Görev</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <input type="text" class="form-control taskinput2" placeholder="Yeni görev">
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onclick="editSecond()">Save changes</button>
                            </div>
                        </div>
                        </div>
                </div>
                </div>
            </li>`
            ul.insertAdjacentHTML("beforeend", li);
        }
    }
}

starter();

let mystate = document.querySelectorAll('.mystate');

for (let k = 0; k < taskList.length; k++) {
    if (taskList[k].state == 'pending') {
        mystate[k].innerHTML = 'bekliyor';
    } else {
        mystate[k].innerHTML = 'tamamlandı';
    }
}

let show = () => {
    for (let i = taskList.length - 1; i < taskList.length; i++) {
        let li = `<li>
            <div class='mycontrol'>
                <div><input id='${taskList[i].id}' type='checkbox' class='mycheckbox'
                onclick='toDo(${taskList[i].id})' /></div>
                <div>${taskList[i].name}</div>
                <div class='mystate'></div>
            </div>
            <div class='mybuttons'>
                <button id='${taskList[i].id}' onclick='del(${taskList[i].id})' class='btn btn-lg btn-danger'>SİL</button>
                <button id='${taskList[i].id}' onclick='editFirst(${taskList[i].id})' data-bs-toggle="modal" data-bs-target="#exampleModal2"
                class='btn btn-lg btn-success'>DÜZENLE</button>
                <div class="modal modal-lg fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" 
                    aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title" id="exampleModalLabel">Yeni Görev</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <input type="text" class="form-control taskinput2" placeholder="Yeni görev">
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onclick="editSecond()">Save changes</button>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </li>`
        ul.insertAdjacentHTML("beforeend", li);
    }
}

function add() {
    if (taskinput.value == "" || taskinput.value == " ") {
        alert("lütfen bir değer giriniz");
    }
    else {
        if (taskList.length == 0) {
            taskList.push({id: 0, name: taskinput.value, state: 'pending'});
            empty.remove();
            show();
            console.log(taskList);
            localStorage.setItem('newArray', JSON.stringify(taskList));
        }
        else {
            for (i = 0; i < taskList.length; i++) {
                if (taskList[i].name == taskinput.value) {
                    alert('Bu değer zaten girilmiş');
                    stopp;
                }
            }
            taskList.push({id: taskList[taskList.length - 1].id + 1, name: taskinput.value, state: 'pending'});
            show();
            localStorage.setItem('newArray', JSON.stringify(taskList));
            location.reload();
        }
    }
}

function del(id) {
    let delId;
    for (i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            delId = i;
        }
    }
    taskList.splice(delId, 1);
    location.reload();
    localStorage.setItem('newArray', JSON.stringify(taskList));
    console.log(taskList);
}
console.log(taskList);

function delAll() {
    taskList.splice(0, taskList.length);
    localStorage.setItem('newArray', JSON.stringify(taskList));
    location.reload();
}

var taskinput_2 = document.querySelector('.taskinput2');
var editId;
editFirst = (id) => {
    for (i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            editId = i;
        }
    }
}

function editSecond() {
    taskList.splice(editId, 1, {id: taskList[editId].id, name: taskinput_2.value, state: "pending"});
    show();
    localStorage.setItem('newArray', JSON.stringify(taskList));
    location.reload();
    console.log(taskList);
}

let mycheckbox = document.querySelectorAll('.mycheckbox');

for (let j = 0; j < taskList.length; j++) {
    if (taskList[j].state == 'completed') {
        mycheckbox[j].checked = true;
    }
}

var toDoId;

let toDo = (id) => {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            toDoId = i;
        }
    }
    if (taskList[toDoId].state == 'pending') {
        taskList[toDoId].state = 'completed';
    }
    else {
        taskList[toDoId].state = 'pending';
    }

    localStorage.setItem('newArray', JSON.stringify(taskList));
    location.reload();
}