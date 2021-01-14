let button = document.querySelector('.carts');
let modal = document.querySelector('.modal_pro');

button.addEventListener('click',function(){
  modal.classList.add('show');})
modal.addEventListener('click',function(){
  this.classList.remove('show');})
modal.querySelector('.modalcontent').addEventListener('click',function(e){
    e.stopPropagation();})
document.querySelector('.clear').addEventListener('click',function(){
    modal.classList.remove('show');})
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('rmv')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('qtt')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    document.getElementsByClassName('Prosses')[0].addEventListener('click', purchaseClicked)

    var addToCartButtons = document.getElementsByClassName('chart_btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('list_content')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    console.log("owo");
    updateCartTotal()
}
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
     console.log("uwu");
     updateCartTotal()
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('hdn_name')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    addItemToCart(title, price)
    console.log("aye");
    updateCartTotal()
}
function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('list_content')[0]
    var cartItemNames = cartItems.getElementsByClassName('pr_name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `        <div class="barang">
              <span class="pr_name">${title}</span>
               <span class="pr_price">${price}</span>
               <div class="carts-ntext">
                 <input class="qtt" type="number" value="1">
                 <button class="rmv" type="button">Remove</button>
               </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('rmv')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('qtt')[0].addEventListener('change', quantityChanged)
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('list_content')[0]
    var cartRows = cartItemContainer.getElementsByClassName('barang')
    console.log(cartRows.length);
    var total = 0
    var quantity = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('pr_price')[0]
        var quantityElement = cartRow.getElementsByClassName('qtt')[0]
        var price = parseFloat(priceElement.innerText.replace('RP', ''))
        quantity = quantityElement.value
        total = total + (price * quantity)
        console.log(total);
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].innerText = 'RP ' + total+'.000'
}
