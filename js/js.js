const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



const popupEditButton = document.querySelector('.profile__info-button');
const popupCreateButton = document.querySelector('.profile__button');
const popupEdit = document.querySelector('#edit');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupCreate = document.querySelector('#create');
const popupCreateClose = popupCreate.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const formProfile = document.querySelector('[name="profileForm"]');
const webTitle = formProfile.querySelector('input[name="popupTitle"]');
const webSubtitle = formProfile.querySelector('input[name="popupSubtitle"]');
const descriptionTitle = document.querySelector('.gallery__description-title');
const galleryContainerElement = document.querySelector('.gallery');
const formCreateGallery = document.querySelector('[name="createGalleryForm"]');
const galleryTemplateElement = document.querySelector('#gallery');
const popImg = document.querySelector('#image-show');
const popImgClose = popImg.querySelector('.popup__close');
const newImage = document.querySelector('.popup__image-zoom');
const modalText = document.querySelector('#image-show');
const newButton = popupCreate.querySelector('.popup__button');


function openPopup (popUp) {
    popUp.classList.add('popup_active');
}
function popupClose (popUp) {
    popUp.classList.remove('popup_active');
}
function renderValue() {
  webTitle.value = profileTitle.textContent;
  webSubtitle.value = profileSubtitle.textContent;
}
function submitProfileForm (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = webTitle.value;
  profileSubtitle.textContent = webSubtitle.value;
  popupClose(popupEdit);
}
function createGalleryElement(element) {
  const newGallery = galleryTemplateElement.content.cloneNode(true);

  newGallery.querySelector('.gallery__description-title').textContent = element.name;
  newGallery.querySelector('.gallery__item-img').src = element.link;
  newGallery.querySelector('.gallery__description-img').addEventListener('click', function (evt) {
  evt.target.classList.toggle('gallery__description-img_selected');
});
  newGallery.querySelector('.gallery__item-img').setAttribute('alt', element.name);
  listenersGallery(newGallery);
  return newGallery;
}
function renderGallery () {
    initialCards.forEach(function (element) {
    const card = createGalleryElement(element);
    listenersGallery(card);
    galleryContainerElement.append(card);

    });
}
function submitCardForm (event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('popupTitle').value,
    link: document.getElementById('popupLink').value,
  };
  galleryContainerElement.prepend(createGalleryElement(data));
  popupClose(popupCreate);
  event.currentTarget.reset();  
}
function deleteGallery (event) {
  const galleryItem = event.currentTarget.closest('.gallery__item');
  galleryItem.remove();
}
function listenersGallery (items) {
  items.querySelector(".gallery__basket").addEventListener("click", deleteGallery);
  items.querySelector(".gallery__item-img").addEventListener('click', doModalImage);
}
function doModalImage (event) {
  openPopup(popImg);
  const webImage = event.currentTarget.closest(".gallery__item-img");
  
  newImage.src = webImage.src;

  const txt = modalText.querySelector('.popup__profile');

  const newTitle = event.currentTarget.closest('.gallery__item');
  const newTitleContent = newTitle.querySelector('.gallery__description-title');

  txt.textContent = newTitleContent.textContent;
}

popImgClose.addEventListener('click', () => popupClose(popImg)); 
popupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  renderValue();
});
popupEditClose.addEventListener('click', () => popupClose(popupEdit));

popupCreateButton.addEventListener('click',() => {
  openPopup(popupCreate);
  toggleButtonState(newButton, false);
});

popupCreateClose.addEventListener('click', () => popupClose(popupCreate));
formProfile.addEventListener('submit', submitProfileForm); 
formCreateGallery.addEventListener('submit', submitCardForm);

renderGallery();

const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}
const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, config) => {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    if(isInputNotValid) {
      showError(errorElement, inputElement, config);
    } else {
      hideError(errorElement, inputElement, config);
    }

} 

const toggleButtonState = (button, isActive, config) => {
  if(isActive) {
    button.classList.remove(config.inactiveButtonClass);
    // button.classList.remove("popup__button_invalid");
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    // button.classList.add("popup__button_invalid");
    button.disabled = true;
  }
}

const setEventListeners = (formElement, config) => { 
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
 

  Array.from(inputsList).forEach(inputElement => {
          inputElement.addEventListener('input', () => {
                const isFormValid = formElement.checkValidity();
                checkInputValidity(formElement, inputElement, config);
                toggleButtonState(submitButton, isFormValid, config);
      });
    });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
});

}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(formElement => {
      setEventListeners(formElement, config);
  });
}


const validationConfig = {
  formSelector: '.popup__container-item',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup__input_state_invalid',
}; 

enableValidation(validationConfig);





document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    popupClose(popupEdit);
    popupClose(popupCreate);
    popupClose(popImg);
  }
});

// document.addEventListener("click",	function (event) {
//   console.log(event.target);
// })