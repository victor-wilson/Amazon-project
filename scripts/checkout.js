import { cart, removeFromCart, updateCartQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyFormat } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderCheckoutPage() {

  updateTheCartQuantity()

  //the date function.
  const today = dayjs();
  const deliveryDate = today.add(7, 'days');
  console.log (deliveryDate.format('dddd, MMMM D'));



  let checkoutHTML = '';
  cart.forEach((cartItem) => {
    const checkoutItems = cartItem.id;

    let matchingProduct;
    products.forEach((productItems)=> {
      if (productItems.id === checkoutItems){
        matchingProduct = productItems;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let matchingDeliveryOption;
    deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });
    


    checkoutHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${today.add(matchingDeliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${currencyFormat(matchingProduct.priceCents * cartItem.quantity)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update 
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsFunction(matchingProduct, cartItem)}
          </div>
        </div>
      </div> 
    `

  });

    function deliveryOptionsFunction (matchingProduct, cartItem) {
      let html = '';

      deliveryOptions.forEach((Option) => {
        const today = dayjs();
        const deliveryDate = today.add(Option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = Option.priceCents === 0 
        ? 'FREE shipping' 
        : `$${currencyFormat(Option.priceCents)}`;

        const isChecked = Option.id === cartItem.deliveryOptionId ? 'checked=checked' : '';
      
        html +=
        `<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${Option.id}">
          <input type="radio" ${isChecked} class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
    `
    });
    return html;
  } 

    document.querySelector('.js-order-summary').innerHTML = checkoutHTML; 

    //this section is responsible for deleting products from the checkout page

    //first we have to get the delete link/button
    document.querySelectorAll('.js-delete-link').forEach((delLink) => {
      delLink.addEventListener('click', () => {
        const cartId = delLink.dataset.productId;
        // Add delete functionality here
        removeFromCart(cartId)
        document.querySelector(`.js-cart-item-container-${cartId}`).remove();
        updateCartQuantity();
      });
    });

    function updateTheCartQuantity() {
      document.querySelector(`.js-checkout-quantity`).innerHTML = (`${updateCartQuantity()} items`);
    }

    //add an event listener to the js-delivery-option class to update the delivery option when clicked
    document.querySelectorAll('.js-delivery-option')
      .forEach((optionElement) => {
        optionElement.addEventListener('click', () => {
          const { productId, deliveryOptionId } = optionElement.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderCheckoutPage();
          
        });
    });

  }

  renderCheckoutPage();