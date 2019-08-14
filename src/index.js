'use strict';
//checkbox
const checkbox = document.querySelector('#discount-checkbox')

checkbox.addEventListener('change', function(){
    if (this.checked) {
        this.nextElementSibling.classList.add('checked');
    } else {
        this.nextElementSibling.classList.remove('checked');
    }
});

//endcheckbox
//корзина
const btnCard = document.querySelector('#cart');
const modalCard = document.querySelector('.cart');

btnCard.addEventListener('click', () => {
    modalCard.style.display = 'flex';
    document.body.style.overflow ='hidden';
})

const closeBtn = document.querySelector('.cart-close');

closeBtn.addEventListener('click', () => {
    modalCard.style.display = 'none';
    document.body.style.overflow ='';
})
//конец корзины
//добавление удаление товаров

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
       
    });
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;  
}




//end добавление удаление товаров