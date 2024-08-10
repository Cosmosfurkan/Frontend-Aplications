const inputBox = document.getElementById('inputBox');
const categorySelect = document.getElementById('categorySelect');
const newCategoryInput = document.getElementById('newCategoryInput');
const listContainer = document.getElementById('listContainer');
const categoriesContainer = document.getElementById('categories');
const addTaskButton = document.querySelector('button');

let categories = [];
let activeCategory = null;

function addTask() {
    if (inputBox.value === '') {
        alert('You must enter a task');
    } else {
        let li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${inputBox.value}</span>
            ${categorySelect.value ? `<span class="category-label">${categorySelect.value}</span>` : ''}
            <span class="delete">\u00D7</span>
        `;
        li.dataset.category = categorySelect.value;
        listContainer.appendChild(li);
        inputBox.value = '';
        categorySelect.value = '';
        saveData();
        filterTasks();
    }
}

function addCategory() {
    if (newCategoryInput.value && !categories.includes(newCategoryInput.value)) {
        categories.push(newCategoryInput.value);
        updateCategoryTags();
        updateCategorySelect();
        newCategoryInput.value = '';
        saveData();
    }
}

function updateCategoryTags() {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        let tag = document.createElement('span');
        tag.classList.add('category-tag');
        if (category === activeCategory) {
            tag.classList.add('active');
        }
        tag.textContent = category;
        tag.onclick = () => {
            activeCategory = activeCategory === category ? null : category;
            updateCategoryTags();
            filterTasks();
        };
        categoriesContainer.appendChild(tag);
    });
}

function updateCategorySelect() {
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        let option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function filterTasks() {
    Array.from(listContainer.children).forEach(li => {
        if (!activeCategory || li.dataset.category === activeCategory) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI' || e.target.classList.contains('task-text')) {
        const li = e.target.tagName === 'LI' ? e.target : e.target.parentElement;
        li.classList.toggle('checked');
        saveData();
    } else if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        saveData();
        filterTasks();
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
    localStorage.setItem('categories', JSON.stringify(categories));
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    categories = JSON.parse(localStorage.getItem('categories')) || [];
    updateCategoryTags();
    updateCategorySelect();
    filterTasks();
}

addTaskButton.addEventListener('click', addTask);
addTaskButton.addEventListener('click', addCategory);


inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTask();
    }
});
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addCategory();
    }
});

showTask();