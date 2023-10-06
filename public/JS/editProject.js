
    const formAlertDOM = document.querySelector('.form-alert');
document.getElementById('update-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = {
        project: document.getElementById('projectedit').value,
        developer: document.getElementById('devloperedit').value,
        client: document.getElementById('clientedit').value,
        status: document.getElementById('statusedit').value
    };

    const projectId = document.getElementById('project-edit-id').value;

    try {
        const response = await axios.patch(`/transaction/${projectId}`, formData);

        if (response.data.msg === "Project updated successfully") {
          formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = 'Success, task added';
            formAlertDOM.style.color = 'green';
        } else {
            alert('Something went wrong!');
        }
    } catch (error) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Error, please try again';
        formAlertDOM.style.color = 'red';
   
    }
});