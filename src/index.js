'use strict';
//checkbox

function toggleCheckbox() {
    const checkbox = document.querySelector('#discount-checkbox');

    checkbox.addEventListener('change', function(){
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
}

toggleCheckbox();

//endcheckbox
//корзина
function toggleCart() {
    const btnCard = document.querySelector('#cart');
    const modalCard = document.querySelector('.cart');

    btnCard.addEventListener('click', () => {
        modalCard.style.display = 'flex';
        document.body.style.overflow ='hidden';
    });

    const closeBtn = document.querySelector('.cart-close');

    closeBtn.addEventListener('click', () => {
        modalCard.style.display = 'none';
        document.body.style.overflow ='';
    });
}
toggleCart()
//конец корзины
//добавление удаление товаров
function addCart() {
        const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');
    
        cards.forEach((card) => {
            const btn = card.querySelector('button');
            btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            cartEmpty.remove();
            showData();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                    cardClone.remove();
                    showData();
            })
        
            });
        });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
        cardsPrice = cartWrapper.querySelectorAll('.card-price'),
        cardTotal = document.querySelector('.cart-total span');
        let sum = 0;
        countGoods.textContent = cardsCart.length;
        
        cardsPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent);
            sum += price;
        });
        cardTotal.textContent = sum;

        if (cardsCart.length !== 0) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
addCart();

//end добавление удаление товаров
//фильтр акции

function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.querySelector('#discount-checkbox'),
    min = document.querySelector('#min'),
    max = document.querySelector('#max'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');
    
    discountCheckbox.addEventListener('click', () => {
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            if (((discountCheckbox.checked) && (!elem.querySelector('.card-sale'))) || ((min.value && price < min.value) || (max.value && price > max.value))) {
                elem.parentNode.style.display='none';
            } else {
                elem.parentNode.style.display='';
            }
        });
    });

    function filterPrice(){
        cards.forEach((elem) => {
            const cardPrice = elem.querySelector('.card-price');
            const price = parseFloat(cardPrice.textContent);
            
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                elem.parentNode.style.display='none';
            } else {
                elem.parentNode.style.display='';
            }
        });
    }
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach((elem) => {
            const title = elem.querySelector('.card-title');
            if (!searchText.test(title.textContent)) {
                elem.parentNode.style.display = 'none';
            } else {
                elem.parentNode.style.display = '';
            }
        });
    });
}
actionPage();
//конец фильтр акции