// Импорт js 
import { openPopup } from "./modal";
import { deleteCard, putLike, deleteLike } from "./api";

// Глобальные переменные
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector(".popup-image");
const imagePopupImage = document.querySelector(".popup-image__image");
const imagePopupSubtitle = document.querySelector(".popup-image__subtitle");

// Удаление карточки
const removeCard = (card) => {
    deleteCard(card.dataset.id).then(async (result) => {
        card.remove()
    }).catch(async (error) => {
        console.log(error);
    })
};

// Добавление карточки
export const addCard = (card) => {
    cards.prepend(card);
}

// Переключение статуса лайка
const toggleLikeStatus = (likeButton) => {
    likeButton.classList.toggle("elements__element-like_pressed");
}

// Переключение статуса корзины
const toggleTrashStatus = (trashButton) => {
    trashButton.classList.toggle("elements__element-trash_visibility_hidden");
}

// Обновление статуса лайка
const updateLikeStatus = (likeButton, cardId, likeCounter) => {
    if (likeButton.classList.contains("elements__element-like_pressed")) {
        deleteLike(cardId).then(async (result) => {
            updateLikeCounter(likeCounter, result.likes.length);
            toggleLikeStatus(likeButton);
        }).catch(async (error) => {
            console.log(error);
        })
    }
    else {
        putLike(cardId).then(async (result) => {
            updateLikeCounter(likeCounter, result.likes.length);
            toggleLikeStatus(likeButton);
        }).catch(async (error) => {
            console.log(error);
        })
    }
}

// Обновление количества лайков
const updateLikeCounter = (likeCounter, count) => {
    likeCounter.textContent = count;
}

// Бинд кнопок для карточки
const bindCardButtons = (likeButton, cardElement, likeCounter) => {
    likeButton.addEventListener("click", () => updateLikeStatus(likeButton, cardElement.dataset.id, likeCounter));

    const trash = cardElement.querySelector(".elements__element-trash");
    trash.addEventListener("click", () => removeCard(cardElement));

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
export const createCard = (cardName, cardLink, cardCountOfLikes, cardId, likeStatus, isOwner) => {
    const cardElement = cardTemplate.querySelector(".elements__element").cloneNode(true);
    const cardElementImage = cardElement.querySelector(".elements__element-image");
    const cardElementTitle = cardElement.querySelector(".elements__element-title");
    const cardLikeCounter = cardElement.querySelector(".elements__element-like-counter");
    const likeButton = cardElement.querySelector(".elements__element-like");
    const trashButton = cardElement.querySelector(".elements__element-trash");

    cardElement.dataset.id = cardId;
    cardElementImage.src = cardLink;
    cardElementImage.alt = cardName;
    cardElementTitle.textContent = cardName;
    bindCardButtons(likeButton, cardElement, cardLikeCounter);
    updateLikeCounter(cardLikeCounter, cardCountOfLikes);

    if (likeStatus) {
        toggleLikeStatus(likeButton);
    }

    if (!isOwner) {
        toggleTrashStatus(trashButton);
    }

    return cardElement;
}