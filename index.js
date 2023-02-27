const todoInput = document.getElementById('todo_input');

let toDos = JSON.parse(localStorage.getItem("TODOS")) || [];

function listPopup(type){
    const infoBtn = document.querySelectorAll('.info_button');
    const checkList = document.querySelectorAll('.check_list');
    const nonecheckList = document.querySelectorAll('.nonecheck_list');

    for(let i=0; i<infoBtn.length; i++){
        infoBtn[i].removeAttribute('id');
    };
    type.id = 'active_button';

    let arr = [];
    arr = type.value == "All" ? toDos : toDos.filter((toDo) => 
    type.value == "Active" ? toDo.status === false : toDo.status === true
    );


    for(let i=0; i<checkList.length; i++){
        if(type.value == "All" || type.value == "Completed"){
            checkList[i].style.display ="flex";
            console.log("🚀 ~ file: index.js:24 ~ listPopup ~ checkList:", checkList)
        }
        if(type.value == "Active"){
            checkList[i].style.display ="none";
        }
    }
    for(let i=0; i<nonecheckList.length; i++){
        if(type.value == "All" || type.value == "Active"){
            nonecheckList[i].style.display ="flex";
        }
        if(type.value == "Completed"){
            nonecheckList[i].style.display ="none";
        }
    }


    document.querySelector('.count').innerText = `${arr.length} items left`;
    
}
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
            document.getElementById(toDo.id).className = `list_box check_list`;
        }else{
            document.getElementsByClassName(toDo.id)[0].className = `${toDo.id} list_name`;
            document.getElementById(toDo.id).className = `list_box nonecheck_list`;
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
    listBox.addEventListener('dblclick', function(){
        listName.disabled = false;
    })

    const listName = document.createElement('input');
    listName.setAttribute('type', 'text');
    listName.setAttribute('class', `${todoId} list_name`);
    listName.setAttribute('id', todoId);

    listName.value = todoValue;
    listName.disabled = true;
    listName.addEventListener('blur', function(e){
        todoValue = e.target.value;
        console.log("🚀 ~ file: index.js:116 ~ toDos.forEach ~ e.target.id:", e.target.id)
        toDos.forEach((toDo)=> {
            if(toDo.id == e.target.id)
            toDo.value = todoValue
        });
        localStorage.setItem("TODOS", JSON.stringify(toDos))
    })


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
        listBox.classList.add("nonecheck_list")
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
    

    document.querySelector('.count').innerText = `${toDos.length} items left`;

    todoContainer.appendChild(listBox);
    listBox.appendChild(checkBox);
    listBox.appendChild(listName);
    listBox.appendChild(delBtn);


};
if(toDos.length >0 ) getTodo();