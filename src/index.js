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

//конец фильтр акции
//получение данных с сервера
function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response) => {
            if (response.ok) {
                return response.json();
            }else{
                throw new Error ('Данные не были получены, ошибка:' + response.status);
            }
    })
    .then((data) => {
        return data;
    })
    .catch((err) => {
        console.log(err);
        goodsWrapper.innerHTML = '<div style="color: red; font-size: 30px;">Упс что-то пошло не так</div>';
    });
}
//выводим карточки товара
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        card.innerHTML = `         
                    <div class="card" data-category="${good.category}">
                    ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
						<div class="card-img-wrapper">
							<span class="card-img-top"
								style="background-image: url('${good.img})"></span>
						</div>
						<div class="card-body justify-content-between">
							<div class="card-price">${good.price} ₽</div>
							<h5 class="card-title">${good.title}</h5>
							<button class="btn btn-primary">В корзину</button>
						</div>
					</div>			
        `;
        goodsWrapper.appendChild(card);
    })
}

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list');
    const catalogWrapper = document.querySelector('.catalog');
    const catalogBtn = document.querySelector('.catalog-button');
    
    const categories = new Set();
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });
    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display){
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagName === 'LI') {
            cards.forEach((elem) => {
                if (elem.dataset.category !== event.target.textContent){
                    elem.parentNode.style.display = '';
                }else{
                    elem.parentNode.style.display = 'none';
                }
            });
        }
    });
}

//конец
getData().then((data) => {
    renderCards(data);
    actionPage();
    addCart();
    toggleCart();
    toggleCheckbox();
});