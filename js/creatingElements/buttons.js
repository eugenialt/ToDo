export function createButtons(numberButton, className) {
    const button = [];
    for (let i = 0; i < numberButton; i++){
        const buttons = document.createElement('button');
        buttons.className = className;
        button[i] = buttons;
    }
    return button;
}