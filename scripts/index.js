// Глобальные переменные
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
// Глобальные переменные
const cardTemplate = document.querySelector("#card-template").content;
const cards = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");

const imagePopup = document.querySelector(".popup-image");

const cardPopup = document.querySelector(".popup-card");
const cardPopupForm = document.querySelector(".popup-card__form");

const profilePopup = document.querySelector(".popup-profile");
const profilePopupForm = document.querySelector(".popup-profile__form");

// Бинд кнопок для карточки
const bindCardButtons = (cardElement) => {
    const updateLikeStatus = () => {
        if (cardElement.querySelector(".elements__element-like").classList.contains("elements__element-like_pressed")) {
            cardElement.querySelector(".elements__element-like").classList.remove("elements__element-like_pressed");
        }
        else {
            cardElement.querySelector(".elements__element-like").classList.add("elements__element-like_pressed");
        }
    }
    cardElement.querySelector(".elements__element-like").addEventListener("click", updateLikeStatus);

    const deleteCard = () => {
        cardElement.remove();
    };
    cardElement.querySelector(".elements__element-trash").addEventListener("click", deleteCard);

    const image = cardElement.querySelector(".elements__element-image");
    const title = cardElement.querySelector(".elements__element-title");
    image.addEventListener("click", () => {
        imagePopup.classList.remove("popup_status_closed");
        imagePopup.classList.add("popup_status_opened");
        document.querySelector(".popup-image__image").src = image.src;
        document.querySelector(".popup-image__image").alt = title.textContent;
        document.querySelector(".popup-image__subtitle").textContent = title.textContent;
    });
}

// Создание начальных карт
initialCards.forEach((card) => {
    const cardElement = cardTemplate.querySelector(".elements__element").cloneNode(true);
    cardElement.querySelector(".elements__element-image").src = card.link;
    cardElement.querySelector(".elements__element-image").alt = card.name;
    cardElement.querySelector(".elements__element-title").textContent = card.name;
    cards.prepend(cardElement);

    bindCardButtons(cardElement);
});

//Общая настройка popup-ов 
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    const closePopup = () => {
        popup.classList.remove("popup_status_opened");
        popup.classList.add("popup_status_closed");
    }
    closeButton.addEventListener("click", closePopup);
});

const closePopup = (popup) => {
    popup.classList.remove("popup_status_opened");
    popup.classList.add("popup_status_closed");
}

// Настройка popup-а редактирования профиля
const openProfilePopup = () => {
    profilePopup.classList.remove("popup_status_closed");
    profilePopup.classList.add("popup_status_opened");
    document.querySelector("input[name=input-name]").value = document.querySelector(".profile__name").textContent;
    document.querySelector("input[name=input-about-me]").value = document.querySelector(".profile__about-me").textContent;
}
document.querySelector(".profile__edit-button").addEventListener("click", openProfilePopup);

function changeProfileFormSubmit(event) {
    event.preventDefault();
    document.querySelector(".profile__name").textContent = document.querySelector("input[name=input-name]").value;
    document.querySelector(".profile__about-me").textContent = document.querySelector("input[name=input-about-me]").value;
    closePopup(profilePopup);
}
profilePopupForm.addEventListener("submit", changeProfileFormSubmit);

// Настройка popup-а создания карточки
const openCardPopup = () => {
    cardPopup.classList.remove("popup_status_closed");
    cardPopup.classList.add("popup_status_opened");
}
document.querySelector(".profile__add-button").addEventListener("click", openCardPopup);

function createCardFormSubmit(event) {
    event.preventDefault();

    const cardElement = cardTemplate.querySelector(".elements__element").cloneNode(true);
    cardElement.querySelector(".elements__element-image").src = document.querySelector("input[name=input-image-link]").value;
    cardElement.querySelector(".elements__element-image").alt = document.querySelector("input[name=input-card-name]").value;
    cardElement.querySelector(".elements__element-title").textContent = document.querySelector("input[name=input-card-name]").value;
    cards.prepend(cardElement);
    bindCardButtons(cardElement);

    const inputs = cardPopupForm.querySelectorAll(".popup-card__input");
    inputs.forEach((input) => {
        input.value = "";
    });

    closePopup(cardPopup);
}
cardPopupForm.addEventListener("submit", createCardFormSubmit);