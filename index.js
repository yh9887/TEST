const todoInput = document.getElementById('todo_input');

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];
function listClear(){
    const checkList = document.querySelectorAll('.check_list');
    for(let i =0; i<checkList.length; i++){
        checkList[i].remove();
    }
    toDos = toDos.filter((toDo) => toDo.status === false);
    localStorage.setItem("TODOS",JSON.stringify(toDos));
    document.querySelector('.count').innerText = `${toDos.length} items left`;  
    document.getElementById('all_check_box').checked = false;

}
function allCheck(e){
    const checks = document.getElementsByName('check');
    checks.forEach((check)=>{
        check.checked = e.checked;
        if(e.checked) check.checked = e.checked;
    });

    toDos.forEach((toDo)=>{
        toDo.status = e.checked;
        if(e.checked){
            toDo.status = e.checked;
            document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name name_active`;
            document.getElementById(toDo.id).classList.add("check_list")
        }else{
            document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name`;
        };
    });
    localStorage.setItem("TODOS", JSON.stringify(toDos))
    document.querySelector('.count').innerText = `${toDos.length} items left`;
};
function getTodo(){
    document.getElementById('all_check_box').checked = true;
    toDos.forEach((toDo)=>{
        if(toDo.status === false) 
        document.getElementById('all_check_box').checked = false;
        paintTodo(toDo.value, toDo.id, toDo.status)
    })
};
function addTodo(){
    const todoId = Math.floor(Math.random() * 999999)
    if(todoInput.value.length > 0){
        let todoChecked = false;
        toDos.push({
            value: todoInput.value,
            id: todoId,
            status: todoChecked
        })
        paintTodo( todoInput.value, todoId, todoChecked);
    }
    todoInput.value = ""
    localStorage.setItem("TODOS", JSON.stringify(toDos));
};
function paintTodo(todoValue, todoId, todoChecked){
    const todoContainer = document.querySelector('.todo_container');

    const listBox = document.createElement('div');
    listBox.setAttribute('class', 'list_box')
    listBox.setAttribute('id', todoId)

    const listName = document.createElement('input');
    listName.setAttribute('type', 'text');
    listName.setAttribute('class', `${todoId} list_name`);
    listName.value = todoValue;


    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', todoId);
    checkBox.setAttribute('name', 'check');
    checkBox.addEventListener('click', function(e){
        todoChecked = e.target.checked;
        toDos.forEach((toDo)=>{
            if(toDo.id === todoId)
            toDo.status = todoChecked
        });

        if(e.target.checked){
            listName.classList.add("name_active");
            listBox.classList.add("check_list")

        }else{
            listName.classList.remove("name_active");
            listBox.classList.remove("check_list")

        }

        localStorage.setItem("TODOS", JSON.stringify(toDos));
    });

    if(todoChecked){
        listName.classList.add("name_active");
        listBox.classList.add("check_list")
        checkBox.checked = true;
    }else{
        checkBox.checked = false;
    }

    const delBtn = document.createElement('button');
    delBtn.innerText="❌"
    delBtn.addEventListener('click', function(e){
        const delTarget = e.target.parentNode;
        delTarget.remove();
        toDos = toDos.filter((toDo)=>toDo.id !== parseInt(delTarget.id))
        localStorage.setItem("TODOS", JSON.stringify(toDos));
        document.querySelector('.count').innerText = `${toDos.length} items left`;

    })
    

    document.querySelector('.count').innerText = `${toDos.length} items left`

    todoContainer.appendChild(listBox);
    listBox.appendChild(checkBox);
    listBox.appendChild(listName);
    listBox.appendChild(delBtn);


};
if(toDos.length >0 ) getTodo();