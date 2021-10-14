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
const page = document.querySelector('.page');


function closePopupKey (evt) {
      if (evt.key === 'Escape') {
      popupClose();
    }
 }

function handleClosePopupClick(evt) {
  const target = evt.target;

  if (target.classList.contains('popup__close') || target.classList.contains('popup')){
    popupClose();
  } 
}

function errorsClear (popUp) {
  const span = popUp.querySelectorAll('.error');
  const button = popUp.querySelector('.popup__button');

  span.forEach(function (element) {
    element.textContent="";
     });
  button.disabled = false;
}

function openPopup (popUp) {
  popUp.classList.add('popup_active');
  document.addEventListener('keydown', closePopupKey);
}


function popupClose () {
  const activePopup = document.querySelector('.popup_active');
 
  if(activePopup) {
    activePopup.classList.remove('popup_active');
    document.removeEventListener('keydown', closePopupKey);
   } 
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
  newGallery.querySelector('.gallery__item-img').setAttribute('alt', element.name);
  
  listenersGallery(newGallery);
  return newGallery;
}

function renderGallery () {
    initialCards.forEach(function (element) {
    const card = createGalleryElement(element);
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
  items.querySelector(".gallery__basket").addEventListener('click', deleteGallery);
  items.querySelector(".gallery__item-img").addEventListener('click', doModalImage);
  items.querySelector(".gallery__description-img").addEventListener('click', doLike);

}

function doLike (event) {
   event.target.classList.toggle('gallery__description-img_selected');
 }

function doModalImage (event) {
  openPopup(popImg);
  const webImage = event.currentTarget.closest(".gallery__item-img");
  
  newImage.src = webImage.src;
  newImage.alt = webImage.alt;

  const description = modalText.querySelector('.popup__profile');

  const newTitle = event.currentTarget.closest('.gallery__item');
  const newTitleContent = newTitle.querySelector('.gallery__description-title');

  description.textContent = newTitleContent.textContent;
}

page.addEventListener('mousedown', handleClosePopupClick);
popImgClose.addEventListener('click', () => popupClose(popImg)); 
popupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  renderValue();
  errorsClear(popupEdit);
});
popupEditClose.addEventListener('click', () => popupClose(popupEdit));

popupCreateButton.addEventListener('click',() => {
  openPopup(popupCreate);
});

popupCreateClose.addEventListener('click', () => popupClose(popupCreate));
formProfile.addEventListener('submit', submitProfileForm); 
formCreateGallery.addEventListener('submit', submitCardForm);

renderGallery();
