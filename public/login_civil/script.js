/**
 * Variables
 */
const signupButton = document.getElementById('signup-button'),
    loginButton = document.getElementById('login-button'),
    userForms = document.getElementById('user_options-forms')

/**
 * Add event listener to the "Sign Up" button
 */
signupButton.addEventListener('click', () => {
  userForms.classList.remove('bounceRight')
  userForms.classList.add('bounceLeft')
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.addEventListener('click', () => {
  userForms.classList.remove('bounceLeft')
  userForms.classList.add('bounceRight')
}, false)

// Generar un número aleatorio entre 1 y 1025 se refiere al id de imagen, para la pokeapi. no se si indica exactamene el id del pokemon mostrado
var randomNumber = Math.floor(Math.random() * 1025) + 1;
    
// Construir la URL de la imagen con el número aleatorio
var imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + randomNumber + '.png';

// Crear el elemento de la imagen y asignar la URL
var imageElement = document.createElement('img');
imageElement.src = imageUrl;

// Añadir la imagen al contenedor
document.getElementById('floatingImageContainer').appendChild(imageElement);
