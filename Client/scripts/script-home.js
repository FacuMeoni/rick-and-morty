document.addEventListener('DOMContentLoaded', () => {

  const cardContainer = document.querySelector('.cards-container');
  let charactersFinded = [];
  const inputID = document.querySelector('#input-id');    
  const userID = JSON.parse(sessionStorage.getItem('user')).id
  const errorMessage = document.querySelector('#error-message');
  const logoutButton = document.querySelector('#logout');
  const navbar = document.querySelector('#navbar');
  const logOutButton = document.querySelector("#logout");
  const linksContainer = document.querySelector('#links-container');
  const modal = document.querySelector('#instruction');
  

  // delete All characters, if user search more 
  function deleteAllCharacters() {
    if(charactersFinded.length < 2)return
    if(document.querySelector('#delete-all-button') !== null) return

    const deleteButtonContainer = document.createElement('li');
    deleteButtonContainer.classList.add('items');
    const deleteAllButton = document.createElement('button')
    deleteAllButton.setAttribute('id','delete-all-button');
    deleteAllButton.textContent = 'Delete all';
   
    deleteButtonContainer.appendChild(deleteAllButton);
    linksContainer.appendChild(deleteButtonContainer)

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
        favButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>';
      } 
      else{
        favButton.setAttribute('id','fav');
        favButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart icon text-red icon-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#ff0000" fill="#ff0000" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>';
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
        
      imageContainer.appendChild(image);

      const infoContainer = document.createElement('div');
      infoContainer.classList.add('info-container');

      const name = document.createElement('h3');
      name.textContent = character.name;
      name.classList.add("name");

      const statusAndSpecies = document.createElement('p')
      const species = document.createElement('span')
      const status = document.createElement('span')
      status.textContent = character.status + ' - '
      species.textContent = character.species 
      statusAndSpecies.appendChild(status)
      statusAndSpecies.appendChild(species)
      statusAndSpecies.classList.add('status-species-text')

      const origin = document.createElement('p')
      origin.textContent = character.origin
      origin.classList.add('origin')

      const cardNavbar = document.createElement('navbar')
      cardNavbar.classList.add("card-navbar");
      
      const favButton = await isFav(userID, character.id);
      let idButton = favButton.id;
      favButton.addEventListener('click', () =>{
        if(idButton === 'not-fav'){
          favButton.setAttribute('id','fav');
          favButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#ff0000" fill="#ff0000" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path></svg>'; 
          postFavorite(userID, character.id);
        }
        else if( idButton === 'fav'){
          favButton.setAttribute('id','not-fav');
          favButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>';
          deleteFavorite(userID, character.id)
          console.log('hola');
        }
      })
      
      const delButton = document.createElement('button');
      delButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" fill="currentColor" stroke-width="0" /></svg>';
      delButton.classList.add('del-button');
        
      //Adding listener to click at delete button for delete xd
      delButton.addEventListener('click', (e) => {
          deleteCharacter(character.id);
      });
      
      
      cardNavbar.appendChild(delButton)
      cardNavbar.appendChild(favButton);
      infoContainer.appendChild(cardNavbar)
      infoContainer.appendChild(statusAndSpecies);
      infoContainer.appendChild(name);
      infoContainer.appendChild(origin);
      infoContainer.classList.add('info-container');
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
    const regex =  /^\d+$/;
    
    if(id <= 0 || id > 826 || !regex.test(id)){
        errorMessage.classList.add('error-home')
        errorMessage.textContent = "Please introduce ID between 1 and 826"
        return 
    }
    
    getCharacter(id)
    errorMessage.textContent = ''
    errorMessage.classList.remove('error-home');
  }

  // Add to the button the event to click and execute de checkInputValue function and reset the input value.
  document.querySelector('#add').addEventListener("click", (e) => {

    checkInputValue();
    e.preventDefault();
    inputID.value = '';
    closeModal();
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

  function closeModal(){
    modal.removeAttribute('open')
  }

  setTimeout(() => {
    modal.setAttribute('open', true);
  }, 400)


  document.querySelector('#modal-button').addEventListener("click", function(event){
    event.preventDefault();

    closeModal();
  });


  setTimeout(() => {
    closeModal();
  }, 15000)


  document.querySelector("#add").addEventListener("mouseenter", function(event){
    event.preventDefault()


    modal.style.opacity = '0'
    modal.style.transition = '';
  });

  document.querySelector("#add").addEventListener("mouseleave", function(event){
    event.preventDefault()


    modal.style.opacity = '1'
    modal.style.transition = 'opacity 400ms ease';
  });
});
