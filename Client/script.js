document.addEventListener('DOMContentLoaded', () => { 
  const inputUsername = document.querySelector('#username');
  const inputPassword = document.querySelector('#password');
  const loginForm = document.querySelector('#form');
  const errorText = document.createElement('p');
  const loginButton = document.querySelector('#login');
  inputUsername.addEventListener('input', checkEmptyValue);
  inputPassword.addEventListener('input', checkEmptyValue);
  errorText.classList.add('error-text');
  const showPasswordButton = document.querySelector("#password-button");
  const inputIcon = document.querySelector("#input-icon");
  

  function checkEmptyValue() {
    const passValue = inputPassword.value.trim();
    const userValue = inputUsername.value.trim();
  
    if (passValue === '' || userValue === '') {
      loginButton.setAttribute('disabled', '');
    }
    else if((passValue !== '' || userValue !== '')){
      loginButton.removeAttribute('disabled');
    }
  }
  
  const createErrorMessage = (errorData) => {

    
    if( errorData === 'Incorrect Password'){
      errorText.textContent ='The password is incorrect. Please check it.'
    } else if(errorData === 'Incorrect username'){
      errorText.textContent = 'The username is incorrect. Please check it.'
    }
    const errorContainer = document.querySelector('.error-container');
    errorContainer.appendChild(errorText);
  }

  const getLogging = async (username, password) => {
      const response = await fetch('http://localhost:3001/user/login', {
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
            window.location.href = 'home/index-home.html'; // If access exist redirect to home.
            sessionStorage.setItem("user", user);
        }
      } else {
        const errorData = await response.text();
        createErrorMessage(errorData)
      }
  };

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();  
     
    const passValue = inputPassword.value;
    const userValue = inputUsername.value;
    
    await getLogging(userValue, passValue); // Esperar la respuesta de getLogging
  });

  inputIcon.addEventListener("click", (e) => {
    e.preventDefault();
  
    inputIcon.setAttribute(
      'src',
      inputPassword.getAttribute('type') === 'password' ?
      'eye-off.svg' 
       :
      'eye.svg'
    )
  
    inputPassword.setAttribute(
      "type",
      inputPassword.getAttribute("type") === "password" ? "text" : "password"
    );
  });

  checkEmptyValue();
});