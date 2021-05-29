window.addEventListener('DOMContentLoaded', () => {

    // const forms = document.querySelectorAll('.form');

    // async function postData(url, data) {
    //     let result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await result.json();
    // }

    // function savePostedData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const formData = new FormData(form);

    //         const object = {};

    //         formData.forEach((value, key) => {
    //             object[key] = value;
    //         });

    //         const jsonObject = JSON.stringify(object);

    //         postData('http://localhost:3000/requests\n', jsonObject)
    //             .then(data => {
    //                 console.log(data);
    //                 showMessage(1);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 showMessage(0);
    //             })
    //             .finally(() => {
    //                 form.reset();
    //             })
    //     });
    // }

    // forms.forEach(item => {
    //     savePostedData(item);
    // })


    let page = document.querySelector('.page');
    let themeButton = document.querySelector('.theme-button');
    themeButton.onclick = function() {
        page.classList.toggle('light-theme');
        page.classList.toggle('dark-theme');
    };


    let form = document.querySelector('.form');


    form.onsubmit = function(e) {
        e.preventDefault();
        // Измените значение textContent на следующей строке
        message.textContent = email.value;
    };

})