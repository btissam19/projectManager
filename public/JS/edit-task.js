const form = document.querySelector('.single-task-form');
const formAlert = document.querySelector('.form-alert');
const taskIdElement = document.querySelector('.task-edit-id');
const taskNameElement = document.querySelector('.task-edit-name');
const taskCompletedElement = document.querySelector('.task-edit-completed');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const taskId = taskIdElement.textContent;
    const name = taskNameElement.value;
    const completed = taskCompletedElement.checked;

    try {
      const response = await axios.patch(`/task/${taskId}`, { name, completed });

        
        if (response.data.msg === "Task updated successfully") {
            formAlert.style.display = 'block';
            formAlert.textContent = 'Success, task updated';
            formAlert.classList.add('text-success');
        } else {
            throw new Error("Failed to update task");
        }
    } catch (error) {
        formAlert.style.display = 'block';
        formAlert.textContent = 'Error, please try again';
    }

    setTimeout(() => {
        formAlert.style.display = 'none';
        formAlert.classList.remove('text-success');
    }, 3000);
});
