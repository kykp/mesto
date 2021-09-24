let popupEditButton = document.querySelector('.profile__info-button');
let popupCreateButton = document.querySelector('.profile__button');

let popupEdit = document.querySelector('#edit');
let popupEditClose = popupEdit.querySelector('.popup__close');

let popupCreate = document.querySelector('#create');
let popupCreateClose = popupCreate.querySelector('.popup__close');

let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

let formProfile = document.querySelector('[name="profileForm"]');
let webTitle = formProfile.querySelector('input[name="popupTitle"]');
let webSubtitle = formProfile.querySelector('input[name="popupSubtitle"]');

function openPopup (popUp) {
    popUp.classList.add('popup_active');
    webTitle.value = profileTitle.textContent;
    webSubtitle.value = profileSubtitle.textContent;
}

function popupClose (popUp) {
    popUp.classList.remove('popup_active');
}

popupEditButton.addEventListener('click', () => openPopup(popupEdit));
popupEditClose.addEventListener('click', () => popupClose(popupEdit));

popupCreateButton.addEventListener('click', () => openPopup(popupCreate));
popupCreateClose.addEventListener('click', () => popupClose(popupCreate));


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = webTitle.value;
    profileSubtitle.textContent = webSubtitle.value;
    popupClose(popupEdit);
}

formProfile.addEventListener('submit', formSubmitHandler); 

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
  

  const galleryContainerElement = document.querySelector('.gallery');
  const formCreateGallery = document.querySelector('[name="createGalleryForm"]');
  const galleryTemplateElement = document.querySelector('#gallery');

  formCreateGallery.addEventListener('submit', addGallery);

  function renderGallery () {

    initialCards.forEach(function (element) {
  
    const newGallery = galleryTemplateElement.content.cloneNode(true);
    newGallery.querySelector('.gallery__description-title').textContent = element.name;
    newGallery.querySelector('.gallery__item-img').src = element.link;
    newGallery.querySelector('.gallery__description-img').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__description-img_selected');
      
  });
    
    listenersGallery(newGallery);
    galleryContainerElement.append(newGallery);
   
    });
}

function addGallery (event) {
  event.preventDefault();
  const newGalleryTitle = event.currentTarget.querySelector('input[name="popupTitle"]').value;
  const newGalleryLink = event.currentTarget.querySelector('input[name="popupLink"]').value;
  const nGallery = galleryTemplateElement.content.cloneNode(true);

  nGallery.querySelector('.gallery__description-title').textContent = newGalleryTitle;
  nGallery.querySelector('.gallery__item-img').src = newGalleryLink;
  nGallery.querySelector('.gallery__description-img').addEventListener('click', function (evt) {
    evt.target.classList.toggle('gallery__description-img_selected'); });
  
    
  listenersGallery(nGallery);
  galleryContainerElement.prepend(nGallery);
  
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
}

