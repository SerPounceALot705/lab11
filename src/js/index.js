import '../css/index.css';
import { Popup } from './popup';
import { PopupEdit } from './popup';
import { CardList } from './cardList';
import { Api } from './API';
import { me } from './data';
import { mePatch } from './data';
import { getsCardsOptions } from './data';

export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort5' : 'https://praktikum.tk/cohort5';
export let myId = '';

const container = document.querySelector('.places-list');
const cardList = new CardList(container, window.data);

cardList.render();

const api = new Api(me);

api.getRequest().then(result => {
    myId = result._id;
    document.querySelector('.user-info__photo').style.backgroundImage = `url(${result.avatar})`;
    document.querySelector('.user-info__name').textContent = result.name;
    document.querySelector('.user-info__job').textContent = result.about;
});

const editForm = {
    form: document.forms.edit,
    name: document.forms.edit.elements.name,
    job: document.forms.edit.elements.job,
    button: document.forms.edit.elements.submit
}

const newForm = {
    form: document.forms.new,
    name: document.forms.new.elements.name,
    link: document.forms.new.elements.link,
    button: document.forms.new.elements.submit
}

const place = document.querySelector('#place');
const link = document.querySelector('#link');
const name = document.querySelector('#name');
const job = document.querySelector('#job');

place.addEventListener('input', handleValidate);
link.addEventListener('input', handleValidate);
name.addEventListener('input', handleValidate);
job.addEventListener('input', handleValidate);

function handleValidate(event) {
    resetError(event.target);
    validate(event.target);
}

const activateError = (element) => {
    element.parentNode.classList.add('.error__message');
}

const resetError = (element) => {
    element.parentNode.classList.remove('.error__message');
    element.textContent = '';
}

const validate = (element) => {
    const errorElement = document.querySelector(`#error-${element.id}`);
    errorElement.textContent = '';

    if (!element.checkValidity()) {
        switch (element.type) {
            case 'url':
                errorElement.textContent = 'Здесь должна быть ссылка';
                break;

            default:
                if (element.value.length === 1) {
                    errorElement.textContent = 'Должно быть от 2 до 30 символов';
                }
                if (element.value.length === 0) {
                    errorElement.textContent = 'Это обязательное поле';
                }
                break;
        }
        activateError(errorElement);

        return false;
    }

    return true;
}

// валидация формы
const validateSubmit = (form) => {
    let isValid = false;
    const inputs = Array.from(form.form);

    if (validate(inputs[0]) && validate(inputs[1])) isValid = true

    if (isValid) form.button.classList.add('popup__button_active');
    else form.button.classList.remove('popup__button_active');
}

// добавление карточки
const addCard = (event) => {
    event.preventDefault();

    document.querySelector('.popup-info').classList.remove('popup_is-opened');
    newForm.button.classList.remove('popup__button_active');

    const newCart = {
        name: newForm.name.value,
        link: newForm.link.value
    }

    const api = new Api(getsCardsOptions(serverUrl, 'cards', 'POST'));
    api.requestToApi(newCart).then(result => {
        const cardList = new CardList(document.querySelector('.places-list'), []);
        cardList.addCard(result);

        newForm.form.reset();

        document.querySelector('.popup-info').classList.remove('popup_is-opened');
        newForm.button.classList.remove('popup__button_active');
    });
}

// редактирование профиля
const editProfile = (event) => {
    event.preventDefault();
    const name = editForm.name.value;
    const about = editForm.job.value;
    document.querySelector('.user-info__name').textContent = name;
    document.querySelector('.user-info__job').textContent = about;
    document.querySelector('.popup-edit').classList.remove('popup_is-opened');

    const api = new Api(mePatch);
    api.requestToApi({ name, about }).then(result => {
        //console.log(result);
    })
}

newForm.form.addEventListener('submit', addCard);
editForm.form.addEventListener('submit', editProfile);

newForm.form.addEventListener('input', () => validateSubmit(newForm));
editForm.form.addEventListener('input', () => validateSubmit(editForm));