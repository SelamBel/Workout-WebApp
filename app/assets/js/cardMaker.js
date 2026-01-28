export function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('created-card');
    return card;
}

export function setCardTitle(card, title) {
    const titleElement = document.createElement('h1');
    titleElement.classList.add('card-title');
    titleElement.textContent = title;
    card.appendChild(titleElement);
}

export function createCardContent(card) {
    const content = document.createElement('div');
    content.classList.add('card-content');
    card.appendChild(content);
    return content;
}

export function addElement(parent, tag, options = {}) {
    const element = document.createElement(tag);

    if (options.text) {
        element.textContent = options.text;
    }

    if (options.class) {
        element.classList.add(...options.class);
    }

    if (options.attrs) {
        for (const [key, value] of Object.entries(options.attrs)) {
            element.setAttribute(key, value);
        }
    }

    parent.appendChild(element);
    return element;
}

export function removeCard(card) {
    if (card && card.parentNode) {
        card.parentNode.removeChild(card);
    }
}
