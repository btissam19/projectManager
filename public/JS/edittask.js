const form = document.querySelector('.single-task-form');
const formAlert = document.querySelector('.form-alert');
const taskIdElement = document.querySelector('.task-edit-id');
const taskNameElement = document.querySelector('.task-edit-name');
const taskCompletedElement = document.querySelector('.task-edit-completed');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskId = taskIdElement.textContent.trim();
    const name = taskNameElement.value.trim();
    const completed = taskCompletedElement.checked;

    try {
        const response = await axios.patch(`/task/${taskId}`, { name, completed });

        if (response.data.msg === "Task updated successfully") {
            formAlert.classList.remove('hidden', 'text-red-500'); // Make sure it's visible and doesn't have the red text style
            formAlert.textContent = 'Success, task updated';
            formAlert.classList.add('text-green-500'); // Green text style for success
        } else {
            throw new Error("Failed to update task");
        }
    } catch (error) {
        formAlert.classList.remove('hidden', 'text-green-500'); // Make sure it's visible and doesn't have the green text style
        formAlert.textContent = 'Error, please try again';
        formAlert.classList.add('text-red-500'); // Red text style for error
    }

    setTimeout(() => {
        formAlert.classList.add('hidden'); // Hide the alert
        formAlert.classList.remove('text-green-500', 'text-red-500'); // Remove the text styles
    }, 3000);
});
