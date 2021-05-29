window.addEventListener('DOMContentLoaded', () => {

    const qwe = ['anat', 'ole', 'rnb'];

    const modal = document.querySelector('.modal');
    const confirmButton = document.querySelector('.confirm_modal');
    const rateButtons = document.querySelectorAll('.rate');
    const parentStars = document.querySelectorAll('.stars');
    const stars = document.querySelectorAll('.star');
    const warning = document.querySelector('.error');

    
    function findIndex(arr, elem) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === elem) return i
        }
    }

    function showModal() {
        //console.log(qwe[i]);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.style.display = '';
        document.body.style.overflow = 'auto';
    }

    function checkStars() {
        const marks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        stars.forEach(item => {
            item.addEventListener('mouseover', () => {
                let value = item.getAttribute('value');

                item.style.background = 'rgb(255, 186, 82)';

                let parent = item.parentNode;
                let children = parent.querySelectorAll('.star');

                children.forEach(content => {                    
                    if (content.getAttribute('value') < value) {
                        content.style.background = 'rgb(255, 186, 82)';
                    }                  
                })
            })
        })

        stars.forEach(item => {
            item.addEventListener('mouseout', () => {
                let value = item.getAttribute('value');

                item.style.background = 'rgb(194, 194, 194)';
            
                let parent = item.parentNode;
                let children = parent.querySelectorAll('.star');

                children.forEach(content => {
                    if (content.getAttribute('value') < value) {
                        content.style.background = 'rgb(194, 194, 194)';
                    }
                })
            })
        })

        stars.forEach(item => {
            item.addEventListener('click', () => {
                let value = item.getAttribute('value');
                let parent = item.parentNode;
                let index = findIndex(parentStars, parent);
                let children = parent.querySelectorAll('.star');

                marks[index] = value;
                
                item.style.background = 'rgb(255, 186, 82)';
                parent.style.pointerEvents = 'none';

                children.forEach(content => {
                    if (content.getAttribute('value') < value) {
                        content.style.background = 'rgb(255, 186, 82)';
                    }
                })     
            })
        })

        confirmButton.addEventListener('click', () => {
            if (findIndex(marks, 0) === undefined) {
                warning.style.display = '';
                hideModal();
                console.log(marks);  
            } else {
                warning.style.display = 'block';
            }
        })
    }


    rateButtons.forEach(item => {
        item.addEventListener('click', showModal);
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" ) hideModal();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) hideModal();
    })

    checkStars();

})