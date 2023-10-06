
const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
tasksDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.classList.contains('delete-btn') || el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible';
    const deleteButton = el.classList.contains('delete-btn') ? el : el.parentElement;
    const id = deleteButton.dataset.id;
    try {
        await axios.delete(`/task/${id}`);
        deleteButton.closest('.single-task').remove();
    
        loadingDOM.style.visibility = 'hidden';
    } catch (error) {
        console.log(error);
        loadingDOM.style.visibility = 'hidden';
    }
    }
    });
    
formDOM.addEventListener('submit', async (e) => {
e.preventDefault();
const name = taskInputDOM.value;

try {
const response = await axios.post('/task', { name });
const newTask = response.data.task;

const taskElement = document.createElement('div');
taskElement.className = `single-task flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg ${newTask.completed ? 'task-completed ' : ''}`;
taskElement.innerHTML = ` 
<h5 class="flex items-center">
    <span class="mr-3"><i class="far fa-check-circle text-green-500"></i></span>
    ${newTask.name}
</h5>
<div class="task-links flex items-center gap-3">
    <a href="${newTask._id}" class="edit-link text-green-600">
        <i class="fas fa-edit"></i>
    </a>
    <button type="button" class="delete-btn text-red-600" data-id="${newTask._id}">
        <i class="fas fa-trash"></i>
    </button>
</div>
`;
tasksDOM.appendChild(taskElement);
taskInputDOM.value = '';
formAlertDOM.style.display = 'block';
formAlertDOM.textContent = 'Success, task added';
formAlertDOM.classList.add('text-success');
} catch (error) {
formAlertDOM.style.display = 'block';
formAlertDOM.textContent = 'Error, please try again';
}

setTimeout(() => {
formAlertDOM.style.display = 'none';
formAlertDOM.classList.remove('text-success');
}, 3000);
});