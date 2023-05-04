// Импорт css
import './pages/index.css';

// Импорт js 
import { createCard, addCard } from "./components/card";
import { openProfilePopup, openCardPopup, handleProfileFormSubmit, handleCardFormSubmit, closePopup, setProfileData, openAvatarPopup, setAvatarImage, handleAvatarFormSubmit } from "./components/modal";
import { enableValidation } from "./components/validate";
import { validationInfo } from "./components/validation-config";
import { getMe, getCards } from "./components/api";

// Глобальные константы
let me;

const popups = document.querySelectorAll(".popup");

const cardPopup = document.querySelector(".popup-card");
const cardPopupForm = document.querySelector(".popup-card__form");
const cardAddButton = document.querySelector(".profile__add-button");

const profilePopupForm = document.querySelector(".popup-profile__form");
const profileEditButton = document.querySelector(".profile__edit-button");

const avatarChangeForm = document.querySelector(".popup-avatar__form");
const avatarChangeButton = document.querySelector(".profile__change-avatar");

// Закгрузка и установка данных с сервера
getMe().then(async (result) => {
    setProfileData(result.name, result.about);
    setAvatarImage(result.avatar);
    me = result;
    getCards().then(async (result) => {
        result.forEach((card) => {
            let isLikeActive = false;
            let isOwner = card.owner._id == me._id;
            card.likes.forEach((user) => {
                if (user._id == me._id) {
                    isLikeActive = true;
                }
            })
            addCard(createCard(card.name, card.link, card.likes.length, card._id, isLikeActive, isOwner));
        })
    })
})

// Общая настройка popup-ов
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => { closePopup(popup); });
    popup.addEventListener("click", (evt) => {
        if (evt.target == popup) {
            closePopup(popup);
        }
    });
});

// Подключение addEventListener на profileEditButton
profileEditButton.addEventListener("click", openProfilePopup);

// Подключение обработчика формы изменения профиля
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

// Настройка popup-а создания карточки
cardAddButton.addEventListener("click", openCardPopup);

// Подключение обработчика формы создания карточки
cardPopupForm.addEventListener("submit", handleCardFormSubmit);

// Настройка popup-а создания карточки
avatarChangeButton.addEventListener("click", openAvatarPopup);

// Подключение обработчика формы создания карточки
avatarChangeForm.addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации полей
enableValidation(validationInfo);