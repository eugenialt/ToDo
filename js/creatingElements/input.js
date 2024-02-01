
export function insertLineInput(placeholderText,prevElement,nextElement ) {
    const lineInput = document.createElement('input');
    lineInput.className = 'line_input';
    lineInput.placeholder = placeholderText;
    prevElement.parentNode.insertBefore(lineInput, nextElement);
    return lineInput;
  }

export const createInput = (type, placeholder, name) => {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.name = name;
  return input;
}