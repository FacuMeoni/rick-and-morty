document.addEventListener('DOMContentLoaded', () => {

  const cardContainer = document.querySelector('.cards-container');
  let charactersFinded = [];
  const inputID = document.querySelector('#input-id');    
  const userID = JSON.parse(sessionStorage.getItem('user')).id
  const errorMessage = document.querySelector('#error-message');
  const logoutButton = document.querySelector('#logout');
  const navbar = document.querySelector('#navbar');
  const logOutButton = document.querySelector("#logout");

  // delete All characters, if user search more 
  function deleteAllCharacters() {
    if(charactersFinded.length < 2)return
    if(document.querySelector('#delete-all-button') !== null) return

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.setAttribute('id','delete-all-container');
    const deleteAllButton = document.createElement('button')
    deleteAllButton.setAttribute('id','delete-all-button');
    deleteAllButton.textContent = 'Delete all';

    deleteButtonContainer.appendChild(deleteAllButton);
    navbar.appendChild(deleteButtonContainer)

    //delete all characters
    deleteAllButton.addEventListener("click", () => {

      charactersFinded = [];
      showCharacters(userID);
      deleteButtonContainer.remove();
    });
    
  }

  logoutButton.addEventListener("click", (e) => {
    sessionStorage.removeItem('user');
  })

  //make the fetch to post the favorite
  const postFavorite = async(userID, characterID) => {
    try {
        await fetch('http://localhost:3001/user/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                characterID: characterID
            })
        });
    } catch (error) {
        console.error('Error en la solicitud POST:', error);
    }
  }

  //make the fetch to delete the favorite
  const deleteFavorite = async(userID, characterID) =>{
      try {
          await fetch('http://localhost:3001/user/favorites', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  userID: userID,
                  characterID: characterID
              })
          });
      } catch (error) {
          console.error('Error en la solicitud DELETE:', error);
      }
  };

  // Make the fetch to url that check if fav or not, and return respective heart icon.
  const isFav = async(userID, characterID) =>{
    try {
      const response = await fetch(`http://localhost:3001/user/favorites/?userID=${userID}&characterID=${characterID}`);
      
      const data = await response.json();


      const favButton = document.createElement('button');

      if(!data.fav){
        favButton.setAttribute('id','not-fav');
        favButton.textContent = 'Add Fav';
      } 
      else{
        favButton.setAttribute('id','fav');
        favButton.textContent = 'Remove Fav';
      };


      return favButton;
    } catch (error) {
    throw Error(error.message);
    }
  } 

  // function filter the array of characters finded and execute showCharacters again. 
  const deleteCharacter = (characterId) => {
    charactersFinded = charactersFinded.filter(character => character.id !== characterId);
    showCharacters(userID);

    if(charactersFinded.length < 2) document.querySelector('#delete-all-container').remove();
  }

  //async function that make a for loop to traverse the characters finded array 
  const showCharacters = (userID) => {

    // Limpiar el contenedor antes de volver a mostrar los personajes
    cardContainer.innerHTML = '';
    
    charactersFinded.forEach(async(character) => {
            // Verificar si ya existe un artículo para el personaje
      const article = document.createElement('article')
      article.classList.add("card");
      cardContainer.appendChild(article);
      article.dataset.id = character.id;

      const imageContainer = document.createElement('div');
      imageContainer.classList.add("image-container");

      const image = document.createElement("img");
      image.src = character.image;
      image.alt = character.name + 'image';
      image.classList.add("image");

      const favButton = await isFav(userID, character.id);
      let idButton = favButton.id;
      favButton.addEventListener('click', () =>{
        if(idButton === 'not-fav'){
          postFavorite(userID, character.id)
          favButton.setAttribute('id','fav');
          favButton.textContent = 'Remove Fav'; 
        }
        else if( idButton === 'fav'){
          deleteFavorite(userID, character.id)
          favButton.setAttribute('id','not-fav');
          favButton.textContent = 'Add Fav';
        }
      })
      
      const delButton = document.createElement('button');
      delButton.textContent = '✖';
      delButton.classList.add('del-button');

        
      //Adding listener to click at delete button for delete xd
      delButton.addEventListener('click', (e) => {
          deleteCharacter(character.id);
      });
        
      imageContainer.appendChild(delButton)
      imageContainer.appendChild(image);
      imageContainer.appendChild(favButton);

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');

      const name = document.createElement('h1');
      name.textContent = character.name;
      name.classList.add("name");

      const status = document.createElement('p');
      status.textContent = character.status;
      status.classList.add("data");


      const species = document.createElement('p');
      species.textContent = character.species;
      species.classList.add("data");
        

      const origin = document.createElement('p');
      origin.textContent = character.origin;
      origin.classList.add("data");

      const gender = document.createElement('p');
      gender.textContent = character.gender;
      gender.classList.add("data");

      infoContainer.appendChild(name);
      infoContainer.appendChild(status);
      infoContainer.appendChild(origin);
      infoContainer.appendChild(gender);
      infoContainer.appendChild(species);

      article.appendChild(imageContainer);
      article.appendChild(infoContainer);
    },
    deleteAllCharacters()
  )}
  
  // make the fetch to get characters with id and execute showCharacters function
  const getCharacter = async(id) => {
    try {

        const response = await fetch(`http://localhost:3001/character/search/${id}`);
        const data = await response.json();

        charactersFinded.push(data);
        showCharacters(userID);
    } catch (err) {
        console.log("Character not found", err);
    }
  }

  //Check that input value be between 1 and 826, if it's ok execute getCharacter
  const checkInputValue = () => {
    const id = inputID.value;
    
    if(id <= 0 || id > 826){
        errorMessage.textContent = "Please introduce ID between 1 and 826"
        return 
    }
    
    getCharacter(id);
    errorMessage.textContent = ''; 
  }

  // Add to the button the event to click and execute de checkInputValue function and reset the input value.
  document.querySelector('#add').addEventListener("click", (e) => {

    checkInputValue();
    e.preventDefault();
    inputID.value = '';
  });

  //input listener, check if the key that user press is "Enter", true: do click  #addButton.
  inputID.addEventListener("keypress" , function(event) {

    if (event.key === "Enter") {
      event.preventDefault();
      
      document.getElementById('add').click();
    }
  });
  

  //Add listener on button and execute 
  logOutButton.addEventListener("click", function(event) {

    event.preventDefault();

    window.location.href = '../../pages/login/index.html'

    sessionStorage.removeItem("user", user);
    
  })
  
});
