let message = document.querySelector('.message'),
    button = document.querySelector('.add'),
    list = document.querySelector('.todo')

let todoList = [];

if(localStorage.getItem('todo2')){
    todoList = JSON.parse(localStorage.getItem('todo2'));
    displayMessages();
}

button.addEventListener('click',() => {

    let newTodo = {
        todo:message.value,
        checked:false,
        important:false
    }

    if(message.value.length === 0 || message.value.length > 68){
        return
    }

    todoList.forEach(function (val,i){
        if(message.value === val.todo){
            todoList.splice(i,1)
        }
    })

    todoList.push(newTodo);
    localStorage.setItem('todo2',JSON.stringify(todoList));
    displayMessages();
});

function displayMessages()
{
    if (todoList.length === 0){
        list.innerHTML = '';
    }
    let displayMessage = '';
    todoList.forEach((val,i) => {
        displayMessage += `
           <li class="list-group-item list-group-item-action list-group-item-light">
               <input type="checkbox" id="item_${i}" ${val.checked ? 'checked': ''} >
               <label for="item_${i}"></label><div class="${val.important ? 'important' : ''}">${val.todo}</div>
           </li>`
        list.innerHTML = displayMessage;
    })
}

list.addEventListener('change', e => {
    let idInput = e.target.getAttribute('id'),
        valueLabel = list.querySelector('[for=' + idInput+']').nextSibling.innerHTML;
    console.log(valueLabel)

    todoList.forEach(function (item){
        if(item.todo === valueLabel){
            item.checked = !item.checked
            localStorage.setItem('todo2',JSON.stringify(todoList))
        }
    })
})

list.addEventListener('contextmenu',function (e){
    e.preventDefault()
    todoList.forEach(function (item,i){
        if(item.todo === e.target.nextSibling.innerHTML){
            if (e.ctrlKey || e.metaKey){
                todoList.splice(i,1);
            }else{
                item.important = !item.important
            }
            localStorage.setItem('todo2',JSON.stringify(todoList))
            displayMessages();
        }
    })
})