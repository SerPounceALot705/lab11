import { Api } from './API';
import { Card } from './card';
import { getCard } from './data';

export class CardList {
    constructor(container) {
        this.container = container;
    }

    addCard(data) {
        const card = new Card(data);
        this.appendCard(card.create());
    }

    render() {
        const api = new Api(getCard);

        api.getRequest().then(result => {

            result.forEach(element => {
                const card = new Card(element);
                this.appendCard(card.create());
            });
        })
    }

    appendCard(card) {
        this.container.appendChild(card)
    };
}