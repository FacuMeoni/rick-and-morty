document.addEventListener('DOMContentLoaded', () => {
    
  const cardContainer = document.querySelector('.cards-container'); 
  const userID = JSON.parse(sessionStorage.getItem('user')).id 
  let userFavorites = [];
  
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
      userFavorites[0] = userFavorites[0].filter(character => character.id !== characterID);
      showCharacters(userID);
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
    
  const showCharacters = (userID) => {

    // Limpiar el contenedor antes de volver a mostrar los personajes
    cardContainer.innerHTML = '';
    userFavorites[0].forEach(async(character) => {

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
    }
)}

  const getUserFavorites = async() => {
        try {
 
            const response = await fetch(`http://localhost:3001/user/favorites/${userID}`);
            const data = await response.json();
            
            userFavorites.push(data);
            showCharacters(userID);
        } catch (err) {
            console.log("This user don't have favorites", err);
        }
  }

   getUserFavorites()
});
    