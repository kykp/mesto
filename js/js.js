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

function openPopup (popUp) {
    popUp.classList.add('popup_active');
    
}

function popupClose (popUp) {
    popUp.classList.remove('popup_active');
}

popupEditButton.addEventListener('click', () => openPopup(popupEdit));
popupEditButton.addEventListener('click', function renderValue(){
  webTitle.value = profileTitle.textContent;
  webSubtitle.value = profileSubtitle.textContent;
});
popupEditClose.addEventListener('click', () => popupClose(popupEdit));

popupCreateButton.addEventListener('click', () => openPopup(popupCreate));
popupCreateClose.addEventListener('click', () => popupClose(popupCreate));


function submitProfileForm (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = webTitle.value;
    profileSubtitle.textContent = webSubtitle.value;
    popupClose(popupEdit);
}

formProfile.addEventListener('submit', submitProfileForm); 

const galleryContainerElement = document.querySelector('.gallery');
const formCreateGallery = document.querySelector('[name="createGalleryForm"]');
const galleryTemplateElement = document.querySelector('#gallery');

formCreateGallery.addEventListener('submit', createCard);

function addGallery (gallery) {
  galleryContainerElement.append(gallery);
}

function addDefaultGalleryElements(element) {
  const newGallery = galleryTemplateElement.content.cloneNode(true);

  newGallery.querySelector('.gallery__description-title').textContent = element.name;
  newGallery.querySelector('.gallery__item-img').src = element.link;
  newGallery.querySelector('.gallery__description-img').addEventListener('click', function (evt) {
  evt.target.classList.toggle('gallery__description-img_selected');
});
  newGallery.querySelector('.gallery__item-img').setAttribute('alt', element.name);
  return newGallery;
}

function renderGallery () {
    initialCards.forEach(function (element) {
    const card = addDefaultGalleryElements(element);
    listenersGallery(card);
    addGallery(card);

    });
}

function addNewGalleryItems(event) {
  const newGalleryTitle = event.currentTarget.querySelector('input[name="popupTitle"]').value;
  const newGalleryLink = event.currentTarget.querySelector('input[name="popupLink"]').value;
  const newGalleryItem = galleryTemplateElement.content.cloneNode(true);

  newGalleryItem.querySelector('.gallery__description-title').textContent = newGalleryTitle;
  newGalleryItem.querySelector('.gallery__item-img').src = newGalleryLink;
  newGalleryItem.querySelector('.gallery__description-img').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__description-img_selected'); 
  });
  newGalleryItem.querySelector('.gallery__item-img').setAttribute('alt', newGalleryTitle);

  return newGalleryItem;
}

function createCard (event) {
  event.preventDefault();

  const newGalleryItem = addNewGalleryItems(event);
  listenersGallery(newGalleryItem);
  addGallery(newGalleryItem);
  popupClose(popupCreate);
  event.currentTarget.reset();  
}

renderGallery();

function deleteGallery (event) {
  const galleryItem = event.currentTarget.closest('.gallery__item');
  galleryItem.remove();
}

function listenersGallery (items) {
  items.querySelector(".gallery__basket").addEventListener("click", deleteGallery);
  items.querySelector(".gallery__item-img").addEventListener('click', doModalImage);
}


const newImage = document.querySelector('.popup__image-zoom');
const modalText = document.querySelector('#image-show');

function doModalImage (event) {
  openPopup(popImg);
  const webImage = event.currentTarget.closest(".gallery__item-img");
  
  newImage.src = webImage.src;

  const txt = modalText.querySelector('.popup__profile');

  const newTitle = event.currentTarget.closest('.gallery__item');
  const newTitleContent = newTitle.querySelector('.gallery__description-title');

  txt.textContent = newTitleContent.textContent;
}

const popImg = document.querySelector('#image-show');
const popImgClose = popImg.querySelector('.popup__close');

popImgClose.addEventListener('click', () => popupClose(popImg));