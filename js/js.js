let popupMenuButton = document.querySelector('.profile__info-button');
let popupClassActive = document.querySelector('.popup');
let popClose = document.querySelector('.popup__close');
let profileButton = document.querySelector('.popup__button');
// let heart = document.querySelector('.gallery__description-img');

let title = document.querySelector('.profile__info-title');
let subtitle = document.querySelector('.profile__info-subtitle');

let formElement = document.querySelector('.popup__container-item');
let webTitle = document.querySelector('input[name="popupTitle"]');
let webSubtitle = document.querySelector('input[name="popupSubtitle"]');


function popupActivation () {
     popupClassActive.classList.toggle('popup_active');
     webTitle.value = title.textContent;
     webSubtitle.value = subtitle.textContent;
 }
function popupClose () {
    popupClassActive.classList.toggle('popup_active');
 }
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    title.textContent = webTitle.value;
    subtitle.textContent = webSubtitle.value;
    popupClose();
}

//   function doLike () {    
//      heart.classList.toggle('gallery__description-img_selected');
//   }

 popupMenuButton.addEventListener('click', popupActivation);
 popClose.addEventListener('click', popupClose);
 formElement.addEventListener('submit', formSubmitHandler); 
// heart.addEventListener('click', doLike);

