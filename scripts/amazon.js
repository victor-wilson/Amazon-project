import {cart} from "../data/cart.js"
import {products} from "../data/products.js";

 const messageTimer = {};

let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-message-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//getting the product to add to cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const getProductId = button.dataset.productId;

      //checking to see if the product is already in the cart, using the prodName of the object to be pushed into the cart if no matching item is found
      let matchingItem;
      cart.forEach((item) => {
        if (getProductId === item.prodName) {
          matchingItem = item;
        }
      });

      //if it's in the cart, increase the quantity by 1
      const selector = Number(document.querySelector(
      `.js-quantity-selector-${getProductId}`).value);

      if (matchingItem) {
        matchingItem.quantity += selector;

      //if it is not in the cart, then add it to the cart using the drop down selector       
      } else {
         cart.push({
        prodName: getProductId,
        quantity: selector
      });
      }

      //this is for the cart quantity visible on the page cart icon      
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
      });
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(cart);

      //this is to make the "Added" message visible to the user
      const addedMessage = document.querySelector(`.added-message-${getProductId}`);

      //if we click "Add to cart", clear the timer
      clearTimeout(messageTimer[getProductId]);

      //show it's message again
      addedMessage.classList.add('added-message-visible');

      //start a fresh 2 seconds timer
      messageTimer[getProductId] = setTimeout(() => {
        addedMessage.classList.remove('added-message-visible');
      }, 2000);

      console.log (messageTimer);
    });

  });
