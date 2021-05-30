window.addEventListener('DOMContentLoaded', () => {

    const login = document.querySelector('.login_btn');
    const list = document.querySelector('.list_btn');

    login.addEventListener('click', () => {
        location.assign(`http://localhost:3006/login`);
    })

    list.addEventListener('click', () => {
        location.assign(`http://localhost:3006/list`);
    })

})