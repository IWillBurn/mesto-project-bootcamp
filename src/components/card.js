// ������ js 
import { openPopup } from "./modal";

// ���������� ����������
const cards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector(".popup-image");
const imagePopupImage = document.querySelector(".popup-image__image");
const imagePopupSubtitle = document.querySelector(".popup-image__subtitle");

// �������� ��������
const deleteCard = (card) => {
    card.remove();
};

// ���������� ��������
export const addCard = (card) => {
    cards.prepend(card);
}

// ���������� ������� �����
const updateLikeStatus = (likeButton) => {
    likeButton.classList.toggle("elements__element-like_pressed");
}

// ���� ������ ��� ��������
const bindCardButtons = (cardElement) => {
    const likeButton = cardElement.querySelector(".elements__element-like");
    likeButton.addEventListener("click", () => updateLikeStatus(likeButton));

    const trash = cardElement.querySelector(".elements__element-trash");
    trash.addEventListener("click", () => deleteCard(cardElement));

    const image = cardElement.querySelector(".elements__element-image");
    const title = cardElement.querySelector(".elements__element-title");
    image.addEventListener("click", () => {
        openPopup(imagePopup);
        imagePopupImage.src = image.src;
        imagePopupImage.alt = title.textContent;
        imagePopupSubtitle.textContent = title.textContent;
    });
}

// �������� ��������
export const createCard = (cardName, cardLink) => {
    const cardElement = cardTemplate.querySelector(".elements__element").cloneNode(true);
    const cardElementImage = cardElement.querySelector(".elements__element-image");
    cardElementImage.src = cardLink;
    cardElementImage.alt = cardName;
    const cardElementTitle = cardElement.querySelector(".elements__element-title");
    cardElementTitle.textContent = cardName;
    bindCardButtons(cardElement);
    return cardElement;
}