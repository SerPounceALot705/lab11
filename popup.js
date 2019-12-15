class Popup {
    constructor (button, popup) {
        this.button = button;
        this.popup = popup;
        this.addListener();
    }

    close = () => this.popup.classList.remove('popup_is-opened');

    open() {
        this.popup.classList.add('popup_is-opened');
    };
    
    addListener = () => {
        this.button.addEventListener('click', this.open.bind(this));
        this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    }
}

class PopupImg extends Popup {
    open(url) {           
        if (typeof(url) === 'string') {
            this.popup.classList.add('popup_is-opened');
            this.popup.querySelector('.popup__content-img').setAttribute('src', url);  
        }    
    }
}

class PopupEdit extends Popup {
    open() {
        const data = this.getInfo();

        this.popup.querySelector('#name').value = data.name;
        this.popup.querySelector('#job').value = data.job;
        
        this.popup.classList.add('popup_is-opened');
    }

    getInfo() {
        return {
            name : document.querySelector('.user-info__name').textContent, 
            job : document.querySelector('.user-info__job').textContent
        };
    }
}
