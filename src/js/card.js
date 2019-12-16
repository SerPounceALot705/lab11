import { Api } from './API';
import { PopupImg } from './popup';
import { myId } from './index';
import { getsCardsOptions } from './data';
import { serverUrl } from './index';


export class Card {
    constructor(obj) {
        this.name = obj.name;
        this.link = obj.link;
        this.open = this.open.bind(this);
        this.popupImg = null;
        this.likes = obj.likes;
        this.idCard = obj._id;
        this.owner = obj.owner;
    }

    like(event) {

        console.log(this.likes);

        if (this.likes.filter(like => like._id == myId).length > 0) {
            const del = getsCardsOptions(serverUrl, `cards/like/${this.idCard}`, 'DELETE');
            const api = new Api(del);
            event.target.classList.remove('place-card__like-icon_liked');

            api.requestToApi().then(result => {
                event.target.parentNode.querySelector('.likes-Counter').textContent = result.likes.length;
                this.likes = result.likes;
            })
        } else {
            const put = getsCardsOptions(serverUrl, `cards/like/${this.idCard}`, 'PUT');
            const api = new Api(put);
            event.target.classList.add('place-card__like-icon_liked');

            api.requestToApi().then(result => {
                event.target.parentNode.querySelector('.likes-Counter').textContent = result.likes.length;
                this.likes = result.likes;
            })
        }
    }

    remove(event) {

        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            const delCard = getsCardsOptions(serverUrl, `cards/${this.idCard}`, 'DELETE');
            const api = new Api(delCard);

            api.requestToApi().then(result => {
                event.target.parentNode.parentNode.remove();
            })
        }
    }

    open(event) {

        if (this.isPopupImgOpen(event.target)) {
            this.popupImg.open(this.link);
        }
    }

    create() {

        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        const template = `
        <div class="place-card__image">
        </div>
        <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="container">
                <h3 class="likes-Counter"></h3>
                <button class="place-card__like-icon"></button> 
            </div>
        </div>`;

        placeCard.insertAdjacentHTML('beforeend', template.trim());
        placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
        placeCard.querySelector(".place-card__name").textContent = this.name;

        if (this.likes.length > 0) {

            placeCard.querySelector(".likes-Counter").textContent = this.likes.length;

            if (this.likes.filter(like => like._id == myId).length > 0) {
                placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            }
        }

        if (this.owner._id == myId) {
            const delIcon = document.createElement('button');
            delIcon.classList.add('place-card__delete-icon');

            delIcon.insertAdjacentElement('beforebegin', delIcon);
            delIcon.addEventListener('click', this.remove.bind(this));


            placeCard.querySelector('.place-card__image').append(delIcon);
        }

        this.popupImg = new PopupImg(placeCard, document.querySelector('.popup-img'));

        this.addListeners(placeCard);
        return placeCard;
    }

    isPopupImgOpen(element) {

        if (!element.classList.contains('place-card__delete-icon') &&
            !element.classList.contains('place-card__like-icon'))
            return true;

        return false;
    }

    addListeners(placeCard) {
        placeCard.querySelector(".place-card__like-icon").addEventListener('click', this.like.bind(this));
        placeCard.querySelector('.place-card__image').addEventListener('click', this.open.bind(this));
    }
}