// Вывод ошибки валидации поля
const showInputError = (input, element, errorMessage, validationInfo) => {
    element.classList.remove(validationInfo.errorClass);
    input.classList.add(validationInfo.inputTypeErrorClass);
    element.textContent = errorMessage
};

// Сокрытие ошибки валидации поля
const hideInputError = (input, element, validationInfo) => {
    element.classList.add(validationInfo.errorClass);
    input.classList.remove(validationInfo.inputTypeErrorClass);
    element.textContent = ""
};

export const hideAllInputErrorInForm = (form, validationInfo) => {
    const wrappers = form.querySelectorAll(validationInfo.wrapperSelector);
    wrappers.forEach((wrapper) => {
        const input = wrapper.querySelector(validationInfo.inputSelector);
        const errorMessage = wrapper.querySelector(validationInfo.errorMessageSelector);
        hideInputError(input, errorMessage, validationInfo);
    });
}

// Проверка валидности поля ввода (и вызов изменения поля)
const isInputValid = (wrapper, validationInfo) => {
    const input = wrapper.querySelector(validationInfo.inputSelector);
    const inputErrorMessage = wrapper.querySelector(validationInfo.errorMessageSelector);
    if (!input.validity.valid) {
        showInputError(input, inputErrorMessage, input.validationMessage, validationInfo);
    } else {
        hideInputError(input, inputErrorMessage, validationInfo);
    }
};

// Проверка на изменение валидации при вводе
const isValid = (form, wrapper, validationInfo) => {
    isInputValid(wrapper, validationInfo);
    isFormValid(form, validationInfo);
};

// Установка кнопки в неактивное состояние
const setSubmitButtonDisabled = (button, validationInfo) => {
    button.classList.add(validationInfo.inactiveButtonClass);
    button.setAttribute('disabled', true);
}

// Установка кнопки в активное состояние
const setSubmitButtonEnabled = (button, validationInfo) => {
    button.classList.remove(validationInfo.inactiveButtonClass);
    button.removeAttribute('disabled');
}

// Проверка является ли форма валидной (и вызов изменения кнопки) 
const isFormValid = (form, validationInfo) => {
    const wrappers = form.querySelectorAll(validationInfo.wrapperSelector);
    let formIsValid = true;
    wrappers.forEach((wrapper) => {
        const input = wrapper.querySelector(validationInfo.inputSelector);
        if (!input.validity.valid) {
            formIsValid = false;
        }
    })
    const submitButton = form.querySelector(validationInfo.submitButtonSelector);
    if (formIsValid) {
        setSubmitButtonEnabled(submitButton, validationInfo);
    }
    else {
        setSubmitButtonDisabled(submitButton, validationInfo);
    }
}

// Проверка на валидность формы (при открытии popup)
export const validateWrappersInForm = (form, validationInfo) => {
    const wrappers = form.querySelectorAll(validationInfo.wrapperSelector);
    wrappers.forEach((wrapper) => {
        isInputValid(wrapper, validationInfo);
    })
    isFormValid(form, validationInfo);
}

// Установка проверки на изменение валидации при вводе на все поля
export const enableValidation = (validationInfo) => {
    const forms = document.querySelectorAll(validationInfo.formSelector);
    forms.forEach((form) => {
        const wrappers = form.querySelectorAll(validationInfo.wrapperSelector);
        wrappers.forEach((wrapper) => {
            const input = wrapper.querySelector(validationInfo.inputSelector);
            input.addEventListener('input', () => isValid(form, wrapper, validationInfo));
        })
    })
}