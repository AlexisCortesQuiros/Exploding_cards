import { CARD_TYPES } from './constant.js';

export class Card {
    constructor(type, value = null) {
        this.type = type;
        this.value = value;
    }

    display() {
        if (this.type === CARD_TYPES.POINTS) {
            return `Card: ${this.type}, Value: ${this.value}`;
        }
        return `Card: ${this.type}`;
    }
}

