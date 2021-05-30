window.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.login_form');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = new FormData(e.target);

        const email = data.get('email');
        const password = data.get('password');

        location.assign(`http://localhost:3006/login?email=${email}&&password=${password}`);
    });

})