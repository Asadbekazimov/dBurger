const products = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: './images/product-1.png',
        get totalSumm() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        amount: 0,
        img: './images/product-2.png',
        get totalSumm() {
            return this.price * this.amount
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        amount: 0,
        img: './images/product-3.png',
        get totalSumm() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 14000,
        amount: 0,
        img: './images/product-4.png',
        get totalSumm() {
            return this.price * this.amount
        }
    }
}


const productBtn = document.querySelectorAll('.menu__btn')
basketBtn = document.querySelector('.nav__btn')
basketModal = document.querySelector('.nav__basket')
closebasketModal = document.querySelector('.nav__basket-btn')
basketChecklist = document.querySelector('.nav__basket-checklist')
totalPriceBasket = document.querySelector('.nav__basket-totalPrice')
basketBtnCount = document.querySelector('.nav__btn-count')
btnCard = document.querySelector('.nav__basket-bottom')
printBody = document.querySelector('.print__body')
printFooter = document.querySelector('.print__footer')

productBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
})
function plusOrMinus(btn) {
    let parent = btn.closest('.menu__item')
    parentId = parent.getAttribute('id')
    products[parentId].amount++
    basket()
}
function basket() {
    const productsArray = [];
    let totalCount = 0
    for (const key in products) {
        const po = products[key],
            productsCard = document.querySelector(`#${key}`),
            parentIndecator = productsCard.querySelector('.menu__count')
        if (po.amount > 0) {
            productsArray.push(po)
            totalCount += po.amount
            basketBtnCount.classList.add('active')
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        }else{
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        if (totalCount == 0) {
            basketBtnCount.classList.remove('active')
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productsArray.length; i++) {
        const el = productsArray[i];
        basketChecklist.innerHTML += cardItemBurger(el)

    }
    totalPriceBasket.innerHTML = totalPriceProduct()
}
basketBtn.addEventListener('click', function () {
    basketModal.classList.add('active')
})
closebasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})




function cardItemBurger(productData) {
    const {name, totalSumm:price, amount, img} = productData
    return `
    <div class="product">
    <div class="product__info">
      <img src="${img}" alt="" class="product__img">
      <div>
        <p class="product__name">${name}</p>
        <p class="product__price">${price}</p>
      </div>
    </div>
    <div class="product__option" id="${name.toLowerCase()}__card">
      <button class="product__symbol minus" data-symbol="-">-</button>
      <output class="product__count">${amount}</output>
      <button class="product__symbol plus" data-symbol="+">+</button>
    </div>
  </div>
    `

}
function totalPriceProduct() {
    let total = 0
    for (const key in products) {
        total += products[key].totalSumm
    }
    return total
}
window.addEventListener('click', function(e){
    const btn = e.target
    if (btn.classList.contains('product__symbol')) {
        const attribute = btn.getAttribute('data-symbol'),
        parent = btn.closest('.product__option')
        if (parent) {
            const idParent = parent.getAttribute('id').split('_')[0]
            attribute == '+' ? products[idParent].amount++ : products[idParent].amount--
            basket() 
        }
    }
})

btnCard.addEventListener('click', function () {
    printBody.innerHTML = ''
    for (const key in products) {
        const{name, totalSumm, amount} = products[key]
        if (amount > 0) {
            printBody.innerHTML += `
            <div class="print__item">
            <p class="print__name">
              <span>${name}</span>
              <span>${amount}</span>
            </p>
            <p class="print__summ">${totalSumm}</p>
          </div>
            `   
        }


    }
    printFooter.innerHTML = totalPriceProduct()
    window.print()
})
