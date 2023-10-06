
const formAlertDOM = document.querySelector('.form-alert');
const message = document.getElementById('message');

document.forms[0].addEventListener('submit', async (e) => {
  e.preventDefault();

  const messageValue = message.value;

  const formData = {
      message: messageValue
  };

  try {
      const response = await axios.post('/message', formData, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.status === 200 && response.data) {
          formAlertDOM.style.display = 'block';
          formAlertDOM.textContent = 'Success, message sent Successfully!';
          formAlertDOM.style.color = 'green';
      } else {
          throw new Error('Server responded, but there was an issue.');
      }
  } catch (e) {
  console.log(e)
      formAlertDOM.style.display = 'block';
      formAlertDOM.textContent = 'Error, please try again';
      formAlertDOM.style.color = 'red';
  }

  setTimeout(() => {
      formAlertDOM.style.display = 'none';
  }, 3000);
});
