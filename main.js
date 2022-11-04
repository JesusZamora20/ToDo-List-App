const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        //getting localstorage toDo list
        let toDos = JSON.parse(localStorage.getItem("todo-list"));
        if(!toDos){
            toDos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status: "pending"};
        toDos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(toDos));
        console.log(toDos);
    }
});