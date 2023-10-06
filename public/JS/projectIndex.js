let tableDOM = document.getElementById('tablDom');
let messageContainer = document.getElementById('messageContainer'); 

tableDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.classList.contains('delete-btn') || el.parentElement.classList.contains('delete-btn')) {
        const deleteButton = el.classList.contains('delete-btn') ? el : el.parentElement;
        const id = deleteButton.dataset.id;

        try {
            const response = await axios.delete(`/projects/${id}`);
            console.log("Response from server:", response);
            deleteButton.closest('tr').remove();

            const messageBox = document.createElement('p');
            messageBox.textContent = "Project deleted successfully";
            messageBox.style.color = "green";
            messageBox.style.fontWeight = "bold";
            messageBox.style.fontSize = "14px";
            messageContainer.appendChild(messageBox); 
            setTimeout(() => {
                messageBox.remove();
            }, 3000);

        } catch (error) {
            console.log("Error:", error);
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Failed to delete project.";
            errorMessage.style.color = "red";
            errorMessage.style.fontWeight = "bold";
            errorMessage.style.fontSize = "14px";
            messageContainer.appendChild(errorMessage); 
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    }
});
