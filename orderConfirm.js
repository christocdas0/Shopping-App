var placeOrderBtn = document.getElementById("placeOrderBtn");
placeOrderBtn.addEventListener("click", orderConfirmMsg);

function orderConfirmMsg() {
  console.log("orderd");
  location.assign("http://127.0.0.1:5501/orderConform.html");
}
