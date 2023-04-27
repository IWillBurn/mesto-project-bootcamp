// Глобальные переменные
const cardPopup = document.querySelector(".popup-card");
const cardInputImageLink = document.querySelector("input[name=input-image-link]");
const cardInputCardName = document.querySelector("input[name=input-card-name]");

const profilePopup = document.querySelector(".popup-profile");
const profilePopupInputName = document.querySelector("input[name=input-name]");
const profileName = document.querySelector(".profile__name");
const profilePopupInputAboutMe = document.querySelector("input[name=input-about-me]");
const profileAboutMe = document.querySelector(".profile__about-me");

// Открытие popup-а
const openPopup = (popup) => {
    const form = popup.querySelector(".popup__form");
    popup.classList.remove("popup_status_closed");
    popup.classList.add("popup_status_opened");
    document.addEventListener("keydown", closePopupByEscape);
    if (form != null) {
        validateWrappersInForm(form);
    }
}

// Закрытие popup-а
const closePopup = (popup) => {
    popup.classList.remove("popup_status_opened");
    popup.classList.add("popup_status_closed");
    document.removeEventListener("keydown", closePopupByEscape);
};

// Закрытие popup-а от нажатия escape
const closePopupByEscape = (evt) => {
    const openedPopup = document.querySelector(".popup_status_opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}

// Настройка popup-а редактирования профиля
const openProfilePopup = () => {
    profilePopupInputName.value = profileName.textContent;
    profilePopupInputAboutMe.value = profileAboutMe.textContent;
    openPopup(profilePopup);
}

// Отчистка формы создания карточек
const clearCardInputs = () => {
    cardPopupForm.reset();
}

// Обработка формы изменения профиля 
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profilePopupInputName.value;
    profileAboutMe.textContent = profilePopupInputAboutMe.value;
    closePopup(profilePopup);
}

// Обработка формы создания карточки
function handleCardFormSubmit(event) {
    event.preventDefault();
    addCard(createCard(cardInputCardName.value, cardInputImageLink.value));
    clearCardInputs();
    closePopup(cardPopup);
}