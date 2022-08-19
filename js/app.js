//selecteur
const todoInput= document.querySelector(".todo-input");
const todoButton= document.querySelector(".todo-button");
const todoList= document.querySelector(".todo-list");
const filterOption= document.querySelector(".filter-todo");

//ecouteur d'evernement
document.addEventListener("DOMContentLoaded",getTodos);
todoList.addEventListener("click",deleteCheck);
 todoButton.addEventListener("click",addTodo);
 filterOption.addEventListener("input",filterTodo);
//fonction
function addTodo(event){
	//verification si le input est remplir
	if (todoInput.value != '') {
	//on empeche le rechargement lors du clic 
	event.preventDefault();
	//creation de la todo div
	const todoDiv=document.createElement("div");
	todoDiv.classList.add("todo");
	//creation du li
	const newTodo=document.createElement("li");
	//insetion du contenu de la liste 
	newTodo.innerText=todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//ajout de la todo au local storage
	saveLocalTodos(todoInput.value);
	//bouton check
	const completedBtn=document.createElement("button");
	completedBtn.innerHTML='<ion-icon name="checkbox-outline"></ion-icon>';
	completedBtn.classList.add("complete-btn");
	todoDiv.appendChild(completedBtn);
	//creation de la modif button
	const modBtn=document.createElement("button");
	modBtn.innerHTML='<ion-icon name="pencil"></ion-icon>';
	modBtn.classList.add("mod-btn");
	todoDiv.appendChild(modBtn);
	//boutton suprimer
	const trashBtn=document.createElement("button");
	trashBtn.innerHTML='<ion-icon name="trash"></ion-icon>';
	trashBtn.classList.add("trash-btn");
	todoDiv.appendChild(trashBtn);
	//ajout de la todo a la todo list
	todoList.appendChild(todoDiv);
	todoInput.value='';
	}


}
//fonction de supression
function deleteCheck(e){
	const item=e.target;
	//supression de la todo
	if (item.classList[0]==="trash-btn") {
		const todo=item.parentElement;
		todo.classList.add("fall");
		//appel de la fonction de supression da le storage
		removeLocalTodos(todo);
		todo.addEventListener("transitionend",function(){
			todo.remove();
		});
	}
	//check du text
	if (item.classList[0]==="complete-btn") {
		const todo=item.parentElement;
		todo.classList.toggle("completed");
	}
	//mod todo
	if (item.classList[0]==="mod-btn") {
		//je recupere le parent du bouton qui est toute la div
		const todo=item.parentElement;
		//je stoque tout les enfant de cette div la dans un tableau
		const todos=todo.childNodes;
		//j'accede au texte et je le met dans le input pour modification
		todoInput.value=todos[0].textContent;
		todoInput.focus();
		removeLocalTodos(todo);
		todo.remove();
		console.log(todos[0].textContent);
	}
}		

function filterTodo(e){
	//pour recuperer les enfant de todolist et les stoquer dans un tableau
	const todos=todoList.childNodes;
	//parcour des elements du tableaux
	todos.forEach(function(todo){
		switch(e.target.value){
			case"all":
			todo.style.display="flex";
			break;
			case "completed":
			if (todo.classList.contains("completed")) {
				todo.style.display="flex";
			} else {
				todo.style.display="none";
			}
			break;
			case"uncompleted":
			if (!todo.classList.contains("completed")) {
				todo.style.display="flex";
			} else {
				todo.style.display="none";
			}
			break;

		}
	})
}

//fonction pour enregistrer dans les locals storages
function saveLocalTodos(todo){

	//on verifie s'il ya des items exixtante
	let todos=[];
	if (localStorage.getItem("todos")===null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
		
	}
	todos.push(todo);
	console.log(todos);
	
	console.log(localStorage.getItem("todos"));
	localStorage.setItem("todos",JSON.stringify(todos));
}	

//fonction pour afficher le localstorage
function getTodos(){
	let todos;
	if (localStorage.getItem("todos")===null) {
		todos=[];
	} else {
		todos=JSON.parse(localStorage.getItem("todos"));
	}
	//creation de la todo list
	todos.forEach(function(todo){

	//creation de la todo div
	const todoDiv=document.createElement("div");
	todoDiv.classList.add("todo");
	//creation du li
	const newTodo=document.createElement("li");
	//insetion du contenu de la liste 
	newTodo.innerText=todo;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//bouton check
	const completedBtn=document.createElement("button");
	completedBtn.innerHTML='<ion-icon name="checkbox-outline"></ion-icon>';
	completedBtn.classList.add("complete-btn");
	todoDiv.appendChild(completedBtn)
	//creation de la modif button
	const modBtn=document.createElement("button");
	modBtn.innerHTML='<ion-icon name="pencil"></ion-icon>';
	modBtn.classList.add("mod-btn");
	todoDiv.appendChild(modBtn);
	//boutton suprimer
	const trashBtn=document.createElement("button");
	trashBtn.innerHTML='<ion-icon name="trash"></ion-icon>';
	trashBtn.classList.add("trash-btn");
	todoDiv.appendChild(trashBtn);
	//ajout de la todo a la todo list
	todoList.appendChild(todoDiv);
	})
}
//fonction de supression dans le storage
function removeLocalTodos(todo){
	let todos;
	if (localStorage.getItem("todos")===null) {
		todos=[];
	} else {
		todos=JSON.parse(localStorage.getItem("todos"));
	}

	const todoIndex = todo.children[0].innerText;
	//je recupere le numero ou l'indice de l'element que je veu suprimer 
	console.log(todos.indexOf(todo.children[0].innerText));
	//la fonction pour suprimer l'element du tableau
	todos.splice(todos.indexOf(todoIndex),1);
	localStorage.setItem("todos",JSON.stringify(todos));
}