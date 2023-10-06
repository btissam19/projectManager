
    let tableDOM=document.getElementById('tablDom')
    tableDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.classList.contains('delete-btn') || el.parentElement.classList.contains('delete-btn')) {
        const deleteButton = el.classList.contains('delete-btn') ? el : el.parentElement;
        const id = deleteButton.dataset.id;
        try {
            const response = await axios.delete(`/projects/${id}`);
            
            console.log("Response from server:", response);
                
            deleteButton.closest('tr').remove();
        } catch (error) {
            console.log("Error:", error);
        }
    }
});