
  const formAlertDOM = document.querySelector('.form-alert');
  const project = document.getElementById('projectName');
  const developer = document.getElementById('devloper');
  const client = document.getElementById('client');
  const statuss = document.getElementById('status');
  document.forms[0].addEventListener('submit', async (e) => {
    e.preventDefault();

    const projectValue = project.value;
    const developerValue = developer.value;
    const clientValue = client.value;
    const statusValue = statuss.value;

    const formData = {
        project: projectValue,
        developer: developerValue,
        client: clientValue,
        status: statusValue
    };

    try {
        const response = await axios.post('/projects', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200 && response.data) {
            formAlertDOM.style.display = 'block';
            formAlertDOM.textContent = 'Success, project add  added';
            formAlertDOM.style.color = 'green';
        } else {
            throw new Error('Server responded, but there was an issue.');
        }
    } catch (e) {
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Error, please try again';
        formAlertDOM.style.color = 'red';
    }

    setTimeout(() => {
        formAlertDOM.style.display = 'none';
    }, 3000);
});

