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
const popups = document.querySelectorAll(".popup");

const cardPopupForm = document.querySelector(".popup-card__form");
const cardAddButton = document.querySelector(".profile__add-button");

const profilePopupForm = document.querySelector(".popup-profile__form");
const profileEditButton = document.querySelector(".profile__edit-button");

// Создание начальных карт
initialCards.forEach((card) => {
    addCard(createCard(card.name, card.link));
});

// Общая настройка popup-ов
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close-button");
    closeButton.addEventListener("click", () => { closePopup(popup); });
    popup.addEventListener("click", (evt) => {
        if (evt.target == popup) {
            closePopup(popup);
        }
    });
    popup.addEventListener("keypress", (evt) => {
        if (evt.key === "Escape" && popup.classList.contains("popup_status_opened")) {
            closePopup(popup);
        }
    });
});

// Подключение addEventListener на profileEditButton
profileEditButton.addEventListener("click", openProfilePopup);

// Подключение обработчика формы изменения профиля
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

// Настройка popup-а создания карточки
cardAddButton.addEventListener("click", () => { openPopup(cardPopup); });

// Подключение обработчика формы создания карточки
cardPopupForm.addEventListener("submit", handleCardFormSubmit);

// Включение валидации полей
enableValidation();