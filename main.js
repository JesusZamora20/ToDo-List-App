const taskInput = document.querySelector(".task-input input"); //selecting input element in the document
const taskBox = document.querySelector(".task-box"); 
const filters = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn")
let toDos = JSON.parse(localStorage.getItem("todo-list"));//getting localstorage todo-list

let editId;
let isEdited = false;

filters.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showToDo(btn.id);
    });
});

function showToDo(filter){
    let li = ""; 
    if(toDos){ //if toDos exist
        toDos.forEach((toDo,id) => {
            let isCompleted = toDo.status == 'completed' ? 'checked' : '';
            if(filter == toDo.status || filter == 'all'){
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class='${isCompleted}'>${toDo.name}</p>
                        </label>
                        <div class="settings">
                            <i onClick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li onclick="editTask(${id},${toDo.name})"><i class="uil uil-pen">Edit</i></li>
                                <li onclick="deleteTask(${id})"><i class="uil uil-trash">Delete</i></li>
                            </ul>
                        </div>
                    </li>`;
            }
            
        });
    }
    taskBox.innerHTML = li || `<span> You don't have any task here </span>`;
}
showToDo("all");

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != selectedTask){
            taskMenu.classList.remove('show');
        }
    })
}

function editTask(taskId, taskName){
    editId = taskId;
    isEdited = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId){
    toDos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(toDos));
    showToDo("all");
}

clearAll.addEventListener("click", () => {
    toDos.splice(0, toDos.length);
    localStorage.setItem("todo-list", JSON.stringify(toDos));
    showToDo("all");
})

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild; //accessing to Paragraph element
    if(selectedTask.checked){
        taskName.classList.add("checked");
        toDos[selectedTask.id].status = 'completed';
    } else{
        taskName.classList.remove("checked");
        toDos[selectedTask.id].status = 'pending';
    }
    localStorage.setItem("todo-list",JSON.stringify(toDos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEdited){
            if(!toDos){ //if toDos doesnt exist, create a new Empty array to save toDos
                toDos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            toDos.push(taskInfo);
        } else{
            isEdited = false;
            toDos[editId].name = userTask;
        }
        
        taskInput.value = "";
        localStorage.setItem("todo-list",JSON.stringify(toDos));
        showToDo("all");
    }
});