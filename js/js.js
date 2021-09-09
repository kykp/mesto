let edit = document.querySelector('.profile__info-img');
let activ = document.querySelector('.popup');
let popClose = document.querySelector('.popup__close');
let profileButton = document.querySelector('.popup__button');
let heart = document.querySelector('.gallery__description-img');


function popup () {
    let title = document.querySelector('.profile__info-title').innerHTML;
    let subtitle = document.querySelector('.profile__info-subtitle').innerHTML;
    let webTitle = document.querySelector('.popup__title');
    let webSubtitle = document.querySelector('.popup__subtitle');
    activ.classList.add('popup_active');
    webTitle.value = title;
    webSubtitle.value = subtitle;
}

function popupClose () {
    activ.classList.remove('popup_active');
}

function addButton (evt) {
    evt.preventDefault();
    let title = document.querySelector('.profile__info-title');
    let subtitle = document.querySelector('.profile__info-subtitle');
    let webTitle = document.querySelector('.popup__title');
    let webSubtitle = document.querySelector('.popup__subtitle');
    title.innerHTML = webTitle.value;
    subtitle.innerHTML = webSubtitle.value;
    activ.classList.remove('popup_active');

}

 function like () {    
heart.classList.toggle('gallery__description-img_selected');
 }

edit.addEventListener('click', popup);
popClose.addEventListener('click', popupClose);
profileButton.addEventListener('click', addButton);
heart.addEventListener('click', like);

