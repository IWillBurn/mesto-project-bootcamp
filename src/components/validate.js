// ����� ������ ��������� ����
const showInputError = (input, element, errorMessage) => {
    element.classList.remove('popup__error-message_visibility_hidden');
    input.classList.add('popup__input_type_error');
    element.textContent = errorMessage
};

// �������� ������ ��������� ����
const hideInputError = (input, element) => {
    element.classList.add('popup__error-message_visibility_hidden');
    input.classList.remove('popup__input_type_error');
    element.textContent = ""
};

// �������� ���������� ���� ����� (� ����� ��������� ����)
const isInputValid = (wrapper) => {
    const input = wrapper.querySelector(".popup__input");
    const inputErrorMessage = wrapper.querySelector(".popup__error-message");
    if (!input.validity.valid) {
        showInputError(input, inputErrorMessage, input.validationMessage);
    } else {
        hideInputError(input, inputErrorMessage);
    }
};

// �������� �� ��������� ��������� ��� �����
const isValid = (form, wrapper) => {
    isInputValid(wrapper);
    isFormValid(form);
};

// ��������� ������ � ���������� ���������
const setSubmitButtonDisabled = (button) => {
    button.classList.add('popup__submit-button_status_disabled');
    button.setAttribute('disabled', true);
}

// ��������� ������ � �������� ���������
const setSubmitButtonEnabled = (button) => {
    button.classList.remove('popup__submit-button_status_disabled');
    button.removeAttribute('disabled');
}

// �������� �������� �� ����� �������� (� ����� ��������� ������) 
const isFormValid = (form) => {
    const wrappers = form.querySelectorAll(".popup__input-wrapper");
    let formIsValid = true;
    wrappers.forEach((wrapper) => {
        const input = wrapper.querySelector(".popup__input");
        if (!input.validity.valid) {
            formIsValid = false;
        }
    })
    const submitButton = form.querySelector(".popup__submit-button");
    if (formIsValid) {
        setSubmitButtonEnabled(submitButton);
    }
    else {
        setSubmitButtonDisabled(submitButton);
    }
}

// �������� �� ���������� ����� (��� �������� popup)
export const validateWrappersInForm = (form) => {
    const wrappers = form.querySelectorAll(".popup__input-wrapper")
    wrappers.forEach((wrapper) => {
        isInputValid(wrapper);
    })
    isFormValid(form);
}

// ��������� �������� �� ��������� ��������� ��� ����� �� ��� ����
export const enableValidation = () => {
    const forms = document.querySelectorAll(".popup__form")
    forms.forEach((form) => {
        const wrappers = form.querySelectorAll(".popup__input-wrapper");
        wrappers.forEach((wrapper) => {
            const input = wrapper.querySelector(".popup__input");
            input.addEventListener('input', () => isValid(form, wrapper));
        })
    })
}