// ���������� ����������
const cardPopup = document.querySelector(".popup-card");
const cardInputImageLink = document.querySelector("input[name=input-image-link]");
const cardInputCardName = document.querySelector("input[name=input-card-name]");

const profilePopup = document.querySelector(".popup-profile");
const profilePopupInputName = document.querySelector("input[name=input-name]");
const profileName = document.querySelector(".profile__name");
const profilePopupInputAboutMe = document.querySelector("input[name=input-about-me]");
const profileAboutMe = document.querySelector(".profile__about-me");

// �������� popup-�
const openPopup = (popup) => {
    const form = popup.querySelector(".popup__form");
    popup.classList.remove("popup_status_closed");
    popup.classList.add("popup_status_opened");
    document.addEventListener("keydown", closePopupByEscape);
    if (form != null) {
        validateWrappersInForm(form);
    }
}

// �������� popup-�
const closePopup = (popup) => {
    popup.classList.remove("popup_status_opened");
    popup.classList.add("popup_status_closed");
    document.removeEventListener("keydown", closePopupByEscape);
};

// �������� popup-� �� ������� escape
const closePopupByEscape = (evt) => {
    const openedPopup = document.querySelector(".popup_status_opened");
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}

// ��������� popup-� �������������� �������
const openProfilePopup = () => {
    profilePopupInputName.value = profileName.textContent;
    profilePopupInputAboutMe.value = profileAboutMe.textContent;
    openPopup(profilePopup);
}

// �������� ����� �������� ��������
const clearCardInputs = () => {
    cardPopupForm.reset();
}

// ��������� ����� ��������� ������� 
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = profilePopupInputName.value;
    profileAboutMe.textContent = profilePopupInputAboutMe.value;
    closePopup(profilePopup);
}

// ��������� ����� �������� ��������
function handleCardFormSubmit(event) {
    event.preventDefault();
    addCard(createCard(cardInputCardName.value, cardInputImageLink.value));
    clearCardInputs();
    closePopup(cardPopup);
}