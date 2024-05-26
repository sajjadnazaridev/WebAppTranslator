import languages from './language.json';

'use strick';

// Get all the DOM elements
const btnDetectLang = document.getElementById('btnAutoDetectLang');
const btnEnInput = document.getElementById('btnEnglishInput');
const btnFrInput = document.getElementById('btnFrenchInput');
const inputTextReq = document.getElementById('inputTextRequest');
const txtCounterCharInput = document.querySelector('.counter-character-input');
const btnCopyInputText = document.getElementById('btnCopyInputText');
const btnTranslate = document.querySelector('.btn-translate');
const btnEnOutput = document.getElementById('btnEnOutput');
const btnFrOutput = document.getElementById('btnFrOutput');
const resultTextReq = document.getElementById('resultTextRequest');
const unOrderListSuggestions = document.getElementById('unOrderListSuggestions');
const btnCopyResultText = document.getElementById('btnCopyResultText');

// Add 'active' class to the initial language buttons
btnEnInput.classList.add('active');
btnFrOutput.classList.add('active');

// Add event listeners to the language buttons
btnEnInput.addEventListener('click', () => {
    // Remove 'active' class from other buttons and add it to the clicked button
    btnDetectLang.classList.remove('active');
    btnFrInput.classList.remove('active');
    btnEnInput.classList.add('active');
});

btnFrInput.addEventListener('click', () => {
    // Remove 'active' class from other buttons and add it to the clicked button
    btnDetectLang.classList.remove('active');
    btnEnInput.classList.remove('active');
    btnFrInput.classList.add('active');
});

btnDetectLang.addEventListener('click', () => {
    // Remove 'active' class from other buttons and add it to the clicked button
    btnEnInput.classList.remove('active');
    btnFrInput.classList.remove('active');
    btnDetectLang.classList.add('active');
});

btnEnOutput.addEventListener('click', () => {
    // Remove 'active' class from other buttons and add it to the clicked button
    btnFrOutput.classList.remove('active');
    btnEnOutput.classList.add('active');
});

btnFrOutput.addEventListener('click', () => {
    // Remove 'active' class from other buttons and add it to the clicked button
    btnEnOutput.classList.remove('active');
    btnFrOutput.classList.add('active');
});

// Define the debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Add event listener to the input text field with debounce
inputTextReq.addEventListener('input', debounce(() => {
    // Check if the input text length is less than or equal to 500
    if (inputTextReq.value.length <= 500) {
        txtCounterCharInput.textContent = inputTextReq.value.length;
    } else {
        // If the input text length is greater than 500, trim it to 500 characters
        inputTextReq.value = inputTextReq.value.slice(0, 500);
        txtCounterCharInput.textContent = 500;
    }
}, 300));

// Define the async function to get the language code
function getLanguageCode(language) {
    let item = languages.language;

    for (const key in item) {
        if (key === language) {
            return item[key];
        }
    }
}

// Define the function to get the selected language from the buttons
function getSelectedLanguage(buttons) {
    for (let button of buttons) {
        if (button.classList.contains('active')) {
            return button.textContent.trim();
        }
    }
    return null;
}

// Define the async function to send the request and get the translation
async function sendRequest(txt, inLang, outLang) {
    let req = await fetch(`https://api.mymemory.translated.net/get?q=${txt}&langpair=${inLang}|${outLang}`);
    let res = await req.json();

    unOrderListSuggestions.innerHTML = '';

    for (let i = 0; i < res.matches.length; i++) {
        unOrderListSuggestions.innerHTML += `
            <li class='mr-4 p-2 bg-colorDarkOverlay rounded-xl'>${res.matches[i].translation}</li>
        `;
    }
    return res.matches[0].translation;
}

// Define the throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add event listener to the translate button with throttle
btnTranslate.addEventListener('click', throttle(async () => {
    let inputLangBtns = [btnEnInput, btnFrInput, btnDetectLang];
    let outputLangBtns = [btnEnOutput, btnFrOutput];

    let inputLang = await getSelectedLanguage(inputLangBtns);
    let outputLang = await getSelectedLanguage(outputLangBtns);

    
    if (inputLang && outputLang) {
        inputLang = await getLanguageCode(inputLang);
        outputLang = await getLanguageCode(outputLang);

        console.log(inputLang);
        console.log(outputLang);

        // Send the request and get the translation
        resultTextReq.innerHTML = await sendRequest(inputTextReq.value, inputLang, outputLang);
    } else {
        alert('Please select both input and output languages.');
    }
}, 2000));

// Add event listener to the copy input text button
btnCopyInputText.addEventListener('click', () => {
    const inputText = inputTextReq.value;
    navigator.clipboard.writeText(inputText);
});

// Add event listener to the copy result text button
btnCopyResultText.addEventListener('click', () => {
    const resultText = resultTextReq.value;
    navigator.clipboard.writeText(resultText);
});