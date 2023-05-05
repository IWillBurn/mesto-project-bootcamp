// Импорт js 
import { validateWrappersInForm, hideAllInputErrorInForm } from "./validate";
import { addCard, createCard } from "./card";
import { validationInfo } from "./validation-config";
import { patchMe, postCard, patchAvatar } from "./api";

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

const avatarPopup = document.querySelector(".popup-avatar");
const avatarPopupForm = document.querySelector(".popup-avatar__form");
const avatarPopupInputLink = document.querySelector("input[name=input-avatar-link]");
const profileAvatar = document.querySelector(".profile__avatar");

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

// Настройка popup-а измененеия аватара
export const openAvatarPopup = () => {
    openPopup(avatarPopup);
    clearFormInputs(avatarPopupForm);
    validateWrappersInForm(avatarPopupForm, validationInfo);
    hideAllInputErrorInForm(avatarPopupForm, validationInfo);
}

// Отчистка формы создания карточек
export const clearFormInputs = (form) => {
    form.reset();
}

// Установка "Сохранение..." на кнопку
const setSaving = (popup) => {
    const submitButton = popup.querySelector(".popup__submit-button");
    submitButton.textContent = "Сохранение...";
}

// Установка "Сохранить" на кнопку
const setSave = (popup) => {
    const submitButton = popup.querySelector(".popup__submit-button");
    submitButton.textContent = "Сохранить";
}

// Обработка формы изменения профиля 
export function handleProfileFormSubmit(event) {
    event.preventDefault();
    setSaving(profilePopup);
    patchMe({ name: profilePopupInputName.value, about: profilePopupInputAboutMe.value }).then(async (result) => {
        setProfileData(result.name, result.about);
    }).catch(async (error) => {
        console.log(error);
    }).finally(async () => {
        setSave(profilePopup);
        closePopup(profilePopup);
    })
}

// Установить данные профиля
export function setProfileData(name, aboutMe) {
    profileName.textContent = name;
    profileAboutMe.textContent = aboutMe;
}

// Обработка формы создания карточки
export function handleCardFormSubmit(event) {
    event.preventDefault();
    setSaving(cardPopup);
    postCard({ name: cardInputCardName.value, link: cardInputImageLink.value }).then(async (result) => {
        addCard(createCard(result.name, result.link, result.likes.length, result._id, false, true));
    }).catch(async (error) => {
        console.log(error);
    }).finally(async () => {
        setSave(cardPopup);
        closePopup(cardPopup);
    })
}

// Обработка формы изменения аватара
export function handleAvatarFormSubmit(event) {
    event.preventDefault();
    setSaving(avatarPopup);
    patchAvatar({ avatar: avatarPopupInputLink.value }).then(async (result) => {
        setAvatarImage(result.avatar);
    }).catch(async (error) => {
        console.log(error);
    }).finally(async () => {
        setSave(avatarPopup);
        closePopup(avatarPopup);
    })
}

// Установить данные профиля
export function setAvatarImage(avatarLink) {
    profileAvatar.src = avatarLink;
}

