const todoLists = document.getElementById("todo-lists"); 
const input = document.querySelector(".input");
const addBTN = document.querySelector(".add-btn");

addBTN.addEventListener("click" , (e)=>{
    
    e.preventDefault();
    addTODO();
})

function addTODO(){
    const todoText = input.value.trim()
    if(todoText.length>0){
        createTODO(todoText);
        input.value = ''
    }
    
    
}

function createTODO(todo){
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLists.append(todoLi)

}




