let todos = [];
let currentCategoryFilter = 'all';
let currentPriorityFilter = 'all';
let currentStatusFilter = 'all';

const todoTitle = document.getElementById('todotitle');
const category = document.getElementById('maincategory');
const priority = document.getElementById('mainpriority');
const toDoDueDate = document.getElementById('tododuedate');
const addTask = document.getElementById('addtask');
const toDoList = document.getElementById('todolist');

const createTodo = (title, category = 'Personal', priority = 'Medium', date = '') => {
    return {
        id: Date.now(),
        title,
        category,
        priority,
        toDoDueDate: date || null,
        completed: false
    };
};

const updateStats = () => {
    const total = todos.length;
    const completedCount = todos.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

    const urgentCount = todos.filter(t => t.priority === 'High' && !t.completed).length;
    const overdue = todos.filter(t => !t.completed && t.toDoDueDate && new Date(t.toDoDueDate).getTime() < Date.now()).length;

    const categoryCounts = todos.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
}, {});

    document.getElementById('total').innerText = `Total: ${total}`;
    document.getElementById('done').innerText = `Done: ${percent}%`;
    document.getElementById('urgent').innerText = `Urgent: ${urgentCount}`;
    document.getElementById('overdue').innerText = `Overdue: ${overdue}`;

    const breakdownUI = document.getElementById('categorybreakdown');
    

    document.getElementById('workcat').innerText = categoryCounts['work'] || 0;
    document.getElementById('personalcat').innerText = categoryCounts['personal'] || 0;
    document.getElementById('categoriescat').innerText = categoryCounts['shopping'] || 0;
};
const renderTodos = () => {
    toDoList.innerHTML = '';

    const filtered = todos.filter(todo => {
        const catMatch = currentCategoryFilter === 'all' || todo.category === currentCategoryFilter;
        const prioMatch = currentPriorityFilter === 'all' || todo.priority === currentPriorityFilter;
        const statusMatch =
        currentStatusFilter === 'all' ||
        (currentStatusFilter === 'completed' && todo.completed) ||
        (currentStatusFilter === 'uncompleted' && !todo.completed);
        return catMatch && prioMatch && statusMatch;
    });

    filtered.forEach(todo => {
        const li = document.createElement('li');

        li.className = `todo-item priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})"> 
        <div class="todo-info">
        <strong>${todo.title}</strong>
        <small>${todo.category} • Due: ${todo.toDoDueDate}</small>
        </div>
        <button class="btn-delete" onclick="deleteTodo(${todo.id})">X</button>
        `;
        toDoList.appendChild(li);
    });
};
window.toggleTodo = (id) => {
    todos = todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateStats();
    renderTodos();
};

window.deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    updateStats();
    renderTodos();
};

window.batchAction = (actionType, ...ids) => {
    if (actionType === 'delete') {
        todos = todos.filter(t => !ids.includes(t.id));
    }
    updateStats();
    renderTodos();
};
addTask.addEventListener('click', () => {
    const title = todoTitle.value.trim();
    if (!title) {alert ("Please enter a task!");
    return;
    }
    if (!toDoDueDate.value) {
        alert("No due date specified");
        return;
    }

    const newTodo = createTodo(
        title,
        category.value,
        priority.value,
        toDoDueDate.value
    );

    todos.push(newTodo);
    todoTitle.value = '';
    category.value = '';
    priority.value = '';
    toDoDueDate.value = '';

    updateStats();
    renderTodos();
});
document.getElementById('categoryside').addEventListener('change', (e) => {
    currentCategoryFilter = e.target.value;
    renderTodos();
});
document.getElementById('priorityside').addEventListener('change', (e) => {
    currentPriorityFilter = e.target.value;
    renderTodos();
});
document.getElementById('statusside').addEventListener('change', (e) => {
    currentStatusFilter = e.target.value;
    renderTodos();
});
document.getElementById('clearcomplete').addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);

    updateStats();
    renderTodos();
});

updateStats();