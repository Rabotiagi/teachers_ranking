window.addEventListener('DOMContentLoaded', () => {

    const modal = document.querySelector('.modal');
    const confirmButton = document.querySelector('.confirm_modal');
    const rateButtons = document.querySelectorAll('.rate');
    const parentStars = document.querySelectorAll('.stars');
    const stars = document.querySelectorAll('.star');
    const warning = document.querySelector('.error');
    let currentIndex;
    const statRow = document.querySelectorAll('.stat_block');
    const ranks = document.querySelectorAll('.rank');
    const rateModal = document.querySelector('.rate_modal');


    function findIndex(arr, elem) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === elem) return i
        }
    }

    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.style.display = '';
        rateModal.style.display = '';
        document.body.style.overflow = 'auto';
    }

    function checkStars() {
        const marks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        stars.forEach(item => {
            item.addEventListener('mouseover', () => {
                let value = item.getAttribute('value');

                item.classList.add('golden');

                let parent = item.parentNode;
                let children = parent.querySelectorAll('.star');

                children.forEach(content => {                    
                    if (content.getAttribute('value') < value) {
                        content.classList.add('golden');
                    }                  
                })
            })

            item.addEventListener('mouseout', () => {
                let value = item.getAttribute('value');

                item.classList.remove('golden');
            
                let parent = item.parentNode;
                let children = parent.querySelectorAll('.star');

                children.forEach(content => {
                    if (content.getAttribute('value') < value) {
                        content.classList.remove('golden');
                    }
                })
            })

            item.addEventListener('click', () => {
                let value = item.getAttribute('value');
                let parent = item.parentNode;
                let index = findIndex(parentStars, parent);
                let children = parent.querySelectorAll('.star');

                marks[index] = value;
                
                item.style.background = 'rgb(255, 186, 82)';
                //parent.style.pointerEvents = 'none';

                children.forEach(content => {
                    if (content.getAttribute('value') <= value) {
                        content.style.background = 'rgb(255, 186, 82)';
                    } else {
                        content.style.background = 'rgb(194, 194, 194)';
                    }
                })     
            })
        })

        confirmButton.addEventListener('click', () => {
            if (findIndex(marks, 0) === undefined) {
                warning.style.display = '';
                hideModal();

                let str = marks.toString();
                str = str.split(',').join('');
                console.log(str);

                location.assign(`http://localhost:3006/list?grades=${str}&&id=${currentId}`);

            } else {
                warning.style.display = 'block';
            }
        })
    }


    rateButtons.forEach(item => {
        item.addEventListener('click', () => {
            currentIndex = item.getAttribute('number');
            console.log(currentIndex);
            showModal()
        });
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" ) {
            currentIndex = null;
            hideModal()
        }
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            currentIndex = null;
            hideModal()
        }
    })

    rateModal.addEventListener('click', (event) => {
        if (event.target === rateModal) {
            currentIndex = null;
            hideModal()
        }
    })

    checkStars();


    statRow.forEach(row => {
        row.innerHTML = `${row.innerHTML * 100}%`;
        row.style.width = `${row.innerHTML}`;
    })

    ranks.forEach(item => {
        item.addEventListener('click', () => {
            const element = document.getElementById(item.getAttribute('number'));
            console.log(element);
            element.style.display = 'block';
            rateModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
    })


})