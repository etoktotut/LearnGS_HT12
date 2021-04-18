'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const todoDataFetch = function () {
    if (localStorage.getItem('todoList')) {
        todoData = JSON.parse(localStorage.getItem('todoList'));
    }
};


const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>`;
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.removeItem('todoList');
            localStorage.setItem('todoList', JSON.stringify(todoData));
            render();
        });

        const textTodo = li.querySelector('.text-todo').textContent;
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            let indexOfRemoved = todoData.findIndex((item) => {
                return item.value === textTodo;
            });
            todoData.splice(indexOfRemoved, 1);
            localStorage.removeItem('todoList');
            if (todoData.length > 0) {
                localStorage.setItem('todoList', JSON.stringify(todoData));
            }
            render();
        });

    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim() !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };


        todoData.push(newTodo);
        if (todoData.length > 1) {
            localStorage.removeItem('todoList');
        }
        localStorage.setItem('todoList', JSON.stringify(todoData));
        render();
    }
    headerInput.value = '';
});

todoDataFetch();
render();