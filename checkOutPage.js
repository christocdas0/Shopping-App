var datas = JSON.parse(localStorage.getItem("productDetails"));
var checkOutCart = document.querySelector(".cartList");
var itemCountInCheckOutPage = document.getElementById("itemCount");



if (datas != null) {
  itemCountInCheckOutPage.textContent = datas.length;

  var priceArry = [];
  var productNameArray = [];
  for (let i = 0; i < datas.length; i++) {
    checkOutCart.innerHTML += `
    
<div class="checkOutCard">
     <div>
        <img src=${datas[i].productImg} alt="">
     </div>
   <div>
       <h4>${datas[i].productTitile}</h4>
       <p> <small> x </small>  1</p>
       <p> <span>Amount: Rs </span>
       <span>${datas[i].productPrice}</span></p>
   </div>
</div>
    `;

    productNameArray.push(datas[i].productTitile);

    // total price counting
    var productPrice = datas[i].productPrice;
    productPrice = parseInt(productPrice);
    priceArry.push(productPrice);
  }
  var count = 0;
  for (let i = 0; i < priceArry.length; i++) {
    count += priceArry[i];
  }

  // total price adedd in checkout page
  var totalAmountDisplay = document.getElementById("totalAmountDisplay");
  totalAmountDisplay.textContent = `${count}.00`;
}
// else{
//   itemCountInCheckOutPage.textContent = 0;
// }

var cartCount = document.querySelector(".cart-acount");
if (datas != null) {
  cartCount.textContent = datas.length;
}

// cart count adedd
var placeOrderBtn = document.getElementById("placeOrderBtn");
var cartCount = document.querySelector(".cart-acount");
if (datas != null) {
  cartCount.textContent = datas.length;

// placeOrderBtn.addEventListener("click", orderConfirmMsg);

function orderConfirmMsg(){
   location.href = "orderConform.html";
  localStorage.clear()
}


}
else{

placeOrderBtn.addEventListener('click', ()=>{
  
  var emptyMsg = document.querySelector(".cartEmptyMsg");

   emptyMsg.classList.add('show')





})

}

// function orderConfirmMsg() {
//   location.assign("http://127.0.0.1:5501/orderConform.html");
//   localStorage.clear()

// }







