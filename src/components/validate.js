// ����� ������ ��������� ����
const showInputError = (input, element, errorMessage, validationInfo) => {
    element.classList.remove(validationInfo.errorClass);
    input.classList.add(validationInfo.inputTypeErrorClass);
    element.textContent = errorMessage
};

// �������� ������ ��������� ����
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

// �������� ���������� ���� ����� (� ����� ��������� ����)
const isInputValid = (wrapper, validationInfo) => {
    const input = wrapper.querySelector(validationInfo.inputSelector);
    const inputErrorMessage = wrapper.querySelector(validationInfo.errorMessageSelector);
    if (!input.validity.valid) {
        showInputError(input, inputErrorMessage, input.validationMessage, validationInfo);
    } else {
        hideInputError(input, inputErrorMessage, validationInfo);
    }
};

// �������� �� ��������� ��������� ��� �����
const isValid = (form, wrapper, validationInfo) => {
    isInputValid(wrapper, validationInfo);
    isFormValid(form, validationInfo);
};

// ��������� ������ � ���������� ���������
const setSubmitButtonDisabled = (button, validationInfo) => {
    button.classList.add(validationInfo.inactiveButtonClass);
    button.setAttribute('disabled', true);
}

// ��������� ������ � �������� ���������
const setSubmitButtonEnabled = (button, validationInfo) => {
    button.classList.remove(validationInfo.inactiveButtonClass);
    button.removeAttribute('disabled');
}

// �������� �������� �� ����� �������� (� ����� ��������� ������) 
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

// �������� �� ���������� ����� (��� �������� popup)
export const validateWrappersInForm = (form, validationInfo) => {
    const wrappers = form.querySelectorAll(validationInfo.wrapperSelector);
    wrappers.forEach((wrapper) => {
        isInputValid(wrapper, validationInfo);
    })
    isFormValid(form, validationInfo);
}

// ��������� �������� �� ��������� ��������� ��� ����� �� ��� ����
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