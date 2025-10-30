document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelector('.buttons');
    let currentInput = '0';
    let shouldResetDisplay = false;

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) {
            return;
        }

        const value = target.dataset.value;
        const lastChar = currentInput.slice(-1);

        if (value === 'c') {
            currentInput = '0';
            shouldResetDisplay = false;
        } else if (value === '=') {
            try {
                // Replace textual representations for calculation
                let calculation = currentInput.replace(/%/g, '/100');
                currentInput = eval(calculation).toString();
            } catch (error) {
                currentInput = 'Error';
            }
            shouldResetDisplay = true;
        } else if (value === '%') {
            currentInput += '%';
        } else if (value === '()') {
            const openParenCount = (currentInput.match(/\(/g) || []).length;
            const closeParenCount = (currentInput.match(/\)/g) || []).length;

            if (currentInput === '0') {
                currentInput = '(';
            } else if (openParenCount > closeParenCount && !['+', '-', '*', '/'].includes(lastChar) && lastChar !== '(') {
                currentInput += ')';
            } else {
                currentInput += '(';
            }
            shouldResetDisplay = false;
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (['+', '-', '*', '/'].includes(lastChar)) {
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            shouldResetDisplay = false;
        } else {
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
        }

        display.textContent = currentInput;
    });
});
