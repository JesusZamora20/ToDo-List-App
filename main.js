const taskInput = document.querySelector(".task-input input");
const taskBox = document.querySelector(".task-box");
let toDos = JSON.parse(localStorage.getItem("todo-list"));//getting localstorage todo-list

function showToDo(){
    let li = "";
    if(toDos){
        toDos.forEach((toDo,id) => {
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                            <p>${toDo.name}</p>
                        </label>
                        <div class="settings">
                            <i class="uil uil-ellipsis-h"></i>
                            <ul class="task-menu">
                                <li><i class="uil uil-pen">Edit</i></li>
                                <li><i class="uil uil-trash">Delete</i></li>
                            </ul>
                        </div>
                    </li>`;
        });
    }
    taskBox.innerHTML = li;
}
showToDo();

function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
    } else{
        taskName.classList.remove("checked");
    }
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!toDos){
            toDos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status: "pending"};
        toDos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(toDos));
        console.log(toDos);
        showToDo();
    }
});