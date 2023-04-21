// Массив начальных карточек
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    }
];

// Глобальные константы 
const cardTemplate = document.querySelector("#card-template").content;
const cards = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup-image");
const imagePopupImage = document.querySelector(".popup-image__image");
const imagePopupSubtitle = document.querySelector(".popup-image__subtitle");

const cardPopup = document.querySelector(".popup-card");
const cardPopupForm = document.querySelector(".popup-card__form");
const cardInputImageLink = document.querySelector("input[name=input-image-link]");
const cardInputCardName = document.querySelector("input[name=input-card-name]");
const cardInputs = cardPopupForm.querySelectorAll(".popup-card__input");
const cardAddButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector(".popup-profile");
const profilePopupForm = document.querySelector(".popup-profile__form");
const profilePopupInputName = document.querySelector("input[name=input-name]");
const profileName = document.querySelector(".profile__name");
const profilePopupInputAboutMe = document.querySelector("input[name=input-about-me]");
const profileAboutMe = document.querySelector(".profile__about-me");
const profileEditButton = document.querySelector(".profile__edit-button");

// Бинд кнопок для карточки
const bindCardButtons = (cardElement) => {
    const likeButton = cardElement.querySelector(".elements__element-like");
    const updateLikeStatus = () => {
        likeButton.classList.toggle("elements__element-like_pressed");
    }
    likeButton.addEventListener("click", updateLikeStatus);

    const deleteCard = () => {
        cardElement.remove();
    };
    const trash = cardElement.querySelector(".elements__element-trash");
    trash.addEventListener("click", deleteCard);

    const image = cardElement.querySelector(".elements__element-image");
    const title = cardElement.querySelector(".elements__element-title");
    image.addEventListener("click", () => {
        openPopup(imagePopup);
        imagePopupImage.src = image.src;
        imagePopupImage.alt = title.textContent;
        imagePopupSubtitle.textContent = title.textContent;
    });
}

// Создание карточки
const createCard = (cardName, cardLink) => {
    const cardElement = cardTemplate.querySelector(".elements__element").cloneNode(true);
    const cardElementImage = cardElement.querySelector(".elements__element-image");
    cardElementImage.src = cardLink;
    cardElementImage.alt = cardName;
    const cardElementTitle = cardElement.querySelector(".elements__element-title");
    cardElementTitle.textContent = cardName;
    bindCardButtons(cardElement);
    return cardElement;
}

// Создание начальных карт
initialCards.forEach((card) => {
    cards.prepend(createCard(card.name, card.link));
});

// Открытие popup-а
const openPopup = (popup) => {
    popup.classList.remove("popup_status_closed");
    popup.classList.add("popup_status_opened");
}

// Закрытие popup-а
const closePopup = (popup) => {
    popup.classList.remove("popup_status_opened");
    popup.classList.add("popup_status_closed");
};

// Общая настройка popup-ов
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => { closePopup(popup); });
});

// Настройка popup-а редактирования профиля
const openProfilePopup = () => {
    openPopup(profilePopup);
    profilePopupInputName.value = profileName.textContent;
    profilePopupInputAboutMe.value = profileAboutMe.textContent;
}
profileEditButton.addEventListener("click", openProfilePopup);

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profilePopupInputName.value;
    profileAboutMe.textContent = profilePopupInputAboutMe.value;
    closePopup(profilePopup);
}
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

// Настройка popup-а создания карточки
cardAddButton.addEventListener("click", () => { openPopup(cardPopup); });

const clearCardInputs = () => {
    cardInputs.forEach((input) => {
        input.value = "";
    });
}

function handleCardFormSubmit(event) {
    event.preventDefault();
    cards.prepend(createCard(cardInputCardName.value, cardInputImageLink.value));
    clearCardInputs();
    closePopup(cardPopup);
}
cardPopupForm.addEventListener("submit", handleCardFormSubmit);