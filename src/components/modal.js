// Импорт js 
import { validateWrappersInForm, hideAllInputErrorInForm } from "./validate";
import { addCard, createCard } from "./card";
import { validationInfo } from "./validation-config";

// Глобальные переменные
const cardPopup = document.querySelector(".popup-card");
const cardPopupForm = document.querySelector(".popup-card__form");
const cardInputImageLink = document.querySelector("input[name=input-image-link]");
const cardInputCardName = document.querySelector("input[name=input-card-name]");

const profilePopup = document.querySelector(".popup-profile");
const profilePopupForm = document.querySelector(".popup-profile__form");
const profilePopupInputName = document.querySelector("input[name=input-name]");
const profileName = document.querySelector(".profile__name");
const profilePopupInputAboutMe = document.querySelector("input[name=input-about-me]");
const profileAboutMe = document.querySelector(".profile__about-me");

// Открытие popup-а
export const openPopup = (popup) => {
    popup.classList.remove("popup_status_closed");
    popup.classList.add("popup_status_opened");
    document.addEventListener("keydown", closePopupByEscape);
}

// Закрытие popup-а
export const closePopup = (popup) => {
    popup.classList.remove("popup_status_opened");
    popup.classList.add("popup_status_closed");
    document.removeEventListener("keydown", closePopupByEscape);
};

// Закрытие popup-а от нажатия escape
const closePopupByEscape = (evt) => {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_status_opened");
        closePopup(openedPopup);
    }
}

// Настройка popup-а редактирования профиля
export const openProfilePopup = () => {
    profilePopupInputName.value = profileName.textContent;
    profilePopupInputAboutMe.value = profileAboutMe.textContent;
    openPopup(profilePopup);
    validateWrappersInForm(profilePopupForm, validationInfo);
}

// Настройка popup-а создания карточки
export const openCardPopup = () => {
    openPopup(cardPopup);
    clearFormInputs(cardPopupForm);
    validateWrappersInForm(cardPopupForm, validationInfo);
    hideAllInputErrorInForm(cardPopupForm, validationInfo);
}

// Отчистка формы создания карточек
export const clearFormInputs = (form) => {
    form.reset();
}

// Обработка формы изменения профиля 
export function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profilePopupInputName.value;
    profileAboutMe.textContent = profilePopupInputAboutMe.value;
    closePopup(profilePopup);
}

// Обработка формы создания карточки
export function handleCardFormSubmit(event) {
    event.preventDefault();
    addCard(createCard(cardInputCardName.value, cardInputImageLink.value));
    clearFormInputs(cardPopupForm)
    closePopup(cardPopup);
}