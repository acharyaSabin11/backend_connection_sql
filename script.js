'use strict'

const submitButton = document.querySelector('#submitButton');
const textField = document.querySelector('#textField');

submitButton.addEventListener('click', () => {
    console.log('Button Check');
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;'
        },
        body: JSON.stringify({
            value: textField.value
        })
    })

});

