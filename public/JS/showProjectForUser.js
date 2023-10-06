
    let tableDOM=document.getElementById('tablDom')
    tableDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.classList.contains('delete-btn') || el.parentElement.classList.contains('delete-btn')) {
        const deleteButton = el.classList.contains('delete-btn') ? el : el.parentElement;
        const id = deleteButton.dataset.id;
        try {
            const response = await axios.delete(`/transaction/${id}`);
            
            console.log("Response from server:", response);
                
            deleteButton.closest('tr').remove();
        } catch (error) {
            console.log("Error:", error);
        }
    }

            const nameElements = document.querySelectorAll('[data-email]');
            nameElements.forEach(el => {
                const email = el.getAttribute('data-email');
                const name = email.split('@')[0].split('.').join(' ');
                el.textContent = `Welcome Back ${name} !! here is a project you have to work on `;
            });
        });