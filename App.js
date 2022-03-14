let nav = document.getElementById("main-nav");

// nav bar
let navBarIcon = document.getElementById("bar");
let mens_womens_clothing = document.querySelector(".clothing-grid");

let productDeatils = document.querySelector(".product-container");


$(document).ready(function () {
  $(".scrollsection").slick({
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });
});

// home page data ftching
$.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function (res) {
  homeSectionGrids(res);
   
});

//   mens and womens clothing section and acceoserios
function homeSectionGrids(res) {
  for (let i = 0; i < res.length; i++) {
    // clothing section
    if (res[i].isAccessory === false) {
      mens_womens_clothing.innerHTML += `
          <div id=card${[i]} onclick="productDetailsPagePageRouter(card${[
        i,
      ]})"  class="product-card">
          <a href="#productDetailsPage.html">
            <img
              src=${res[i].preview}
              alt=""
            />
          </a>
          <div class="card-details">
            <h4>${res[i].name}</h4>
            <h5>${res[i].brand}</h5>
            <p>Rs ${res[i].price}.00</p>
          </div>
        </div>
        `;

      // accesserios section
    } else {
      let accesseriosGrid = document.querySelector(".accesserios-grid");

      accesseriosGrid.innerHTML += `
           <div id=card${[i]}  onclick="productDetailsPagePageRouter(card${[
        i,
      ]})"  class="product-card">
          <a href="#productDetailsPage.html">
            <img
              src=${res[i].preview}
              alt=""
            />
          </a>
          <div class="card-details">
            <h4>${res[i].name}</h4>
            <h5>${res[i].brand}</h5>
            <p>Rs ${res[i].price}.00</p>
          </div>
        </div>`;
    }
  }
}

// product details page
function productDetailsPagePageRouter(res) {

  var mainHome = document.querySelector(".main_home");

  mainHome.classList.add("non");
  productDeatils.classList.remove("non");
  var resId = res.id;
  var cardNUmber = resId.charAt(resId.length - 1);
  cardNUmber = parseInt(cardNUmber) + 1;

  $.get(
    `https://5d76bf96515d1a0014085cf9.mockapi.io/product/${cardNUmber}`,
    function (ress) {
      productDetailsPage(ress);
    }
  );



}



// product details page
function productDetailsPage(ress) {
  var photos = ress.photos;
  var borderChangeImgContainer = document.getElementById(
    "product-preview-img-contanier"
  );
  for (let i = 0; i < photos.length; i++) {
    // left img
    if (i == 0) {
      borderChangeImgContainer.innerHTML += `
  <img id = "img${i}"  class="active-border" onclick="smallImageClicked('img${i}')"  src=${photos[i]} alt="product img">

`;
    } else {
      borderChangeImgContainer.innerHTML += `
  <img id = "img${i}"  onclick="smallImageClicked('img${i}')"  src=${photos[i]} alt="product img">

`;
    }
  }
  // other details
  detailsImgSection(ress);
}

// product details page details section
function detailsImgSection(ress) {
  let imgSection = document.querySelector(".img-div");

  imgSection.innerHTML = `  <img id='detailsBigImg' src=${ress.preview} alt=${ress.name}>`;
  let detailSection = document.getElementById("details-section");

  detailSection.innerHTML = `
<h1 id="product-titile">${ress.name}</h1>
<h1 id="product-brand">${ress.brand}</h1>
  <h4 class="product-price-section">
      Price: Rs 
      <p id="product-price">${ress.price}.00 </p>
  </h4>
  <h4 class="Description-heading">Description</h4>
<p id="Description">
  ${ress.description}
</p>
<h4 class="product-preview-head">
Product Preview
</h4>

`;
}

// product detials page small img border setting
var currentActiveId = "img0";
function smallImageClicked(e) {
  var bigimg = document.getElementById("detailsBigImg");
  var previewSmallImg = document.getElementById(e);
  bigimg.src = previewSmallImg.src;
  var newElement = e;
  previewSmallImg.className = "active-border";
  var curentActiveElement = document.getElementById(currentActiveId);
  curentActiveElement.className = "";
  currentActiveId = newElement;
}

// setting to localStaorage

var addToCartButton = document.getElementById("addToCartBtn");

addToCartButton.addEventListener("click", addTocart);

function addTocart(e) {
  var productTitile = document.getElementById("product-titile");
  var productPrice = document.getElementById("product-price");

  var productImg = document.getElementById("detailsBigImg");

  // passing datas to local storage
  productTitile = productTitile.textContent;
  productPrice = productPrice.textContent;
  productImg = productImg.src;

  var productDeatilsList = {
    productTitile: productTitile,
    productPrice: productPrice,
    productImg: productImg,
  };

  if (localStorage.getItem("productDetails") === null) {
    var productDeatilsArr = [];
    productDeatilsArr.push(productDeatilsList);
    localStorage.setItem("productDetails", JSON.stringify(productDeatilsArr));
  } else {
    var data = JSON.parse(localStorage.getItem("productDetails"));
    data.push(productDeatilsList);
    localStorage.setItem("productDetails", JSON.stringify(data));
  }

  // cart count adedd
  var cartCount = document.querySelector(".cart-acount");

  var datas = JSON.parse(localStorage.getItem("productDetails"));

  if (datas != null) {
    cartCount.textContent = datas.length;
  }
}

// cart count adedd
var cartCount = document.querySelector(".cart-acount");

var datas = JSON.parse(localStorage.getItem("productDetails"));

if (datas != null) {
  cartCount.textContent = datas.length;
}
