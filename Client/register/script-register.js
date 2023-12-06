document.addEventListener('DOMContentLoaded', () => { 
    const inputUsername = document.querySelector('#usernameregister');
    const inputPassword = document.querySelector('#passwordregister');
    const registerForm = document.querySelector('#registerform');
    const errorText = document.createElement('p');
    const registerButton = document.querySelector('#registerbutton');
    errorText.classList.add('error-text');
    inputUsername.addEventListener('input', checkEmptyValue);
    inputPassword.addEventListener('input', checkEmptyValue);
  
    function checkEmptyValue() {
      const passValue = inputPassword.value.trim();
      const userValue = inputUsername.value.trim();
    
      if (passValue === '' || userValue === '') {
        registerButton.setAttribute('disabled', '');
      }
      else if((passValue !== '' || userValue !== '')){
        registerButton.removeAttribute('disabled');
      }
    }
    
    const createErrorMessage = () => {
      errorText.textContent ='This user already exists. Please try again.'
      const errorContainer = document.querySelector('.error-container');
      errorContainer.appendChild(errorText);
    }
  
    const getRegister = async (username, password) => {
        const response = await fetch('http://localhost:3001/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password }) // Aquí se crea un objeto con username y password
        });
  
        if (response.ok) {
          const data = await response.json(); // Convert response to json
          const user = JSON.stringify(data.user);
          if (data.access) {
              window.location.href = '../home/index-home.html'; // If access exist redirect to home.
              sessionStorage.setItem("user", user);
          }
        } else {
          const errorData = await response.text();
          createErrorMessage(errorData)
        }
    };
  
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();  
       
      const passValue = inputPassword.value;
      const userValue = inputUsername.value;
      
      await getRegister(userValue, passValue); // Esperar la respuesta de getLogging
    });
  
    checkEmptyValue();
  });