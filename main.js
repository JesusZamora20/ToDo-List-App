const taskInput = document.querySelector(".task-input input"); //selecting input element in the document
const taskBox = document.querySelector(".task-box"); 
let toDos = JSON.parse(localStorage.getItem("todo-list"));//getting localstorage todo-list

function showToDo(){
    let li = ""; 
    if(toDos){ //if toDos exist
        toDos.forEach((toDo,id) => {
            let isCompleted = toDo.status == 'completed' ? 'checked' : '';
            li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class='${isCompleted}'>${toDo.name}</p>
                        </label>
                        <div class="settings">
                            <i onClick='showMenu(this)' class="uil uil-ellipsis-h"></i>
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

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != selectedTask){
            taskMenu.classList.remove('show');
        }
    })
}

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
        if(!toDos){ //if toDos doesnt exist, create a new Empty array to save toDos
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