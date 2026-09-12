import {cart, updateCartQuantity} from '../../data/cart.js';
import {getMatchingProduct} from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import {currencyFormat} from '../utils/money.js';

//there are 3 software engineering steps we follow to do this
//first we save the data, which is the model in MVC
//then we render the data, which is the view in MVC
//finally we add event listeners to the data, which is the controller in MVC
export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const matchedProduct = getMatchingProduct(cartItem.id);
    productPriceCents += matchedProduct.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;  

  console.log((productPriceCents/100).toFixed(2));
  console.log((shippingPriceCents/100).toFixed(2));
  console.log((totalBeforeTaxCents/100).toFixed(2));
  console.log((taxCents/100).toFixed(2));
  console.log((totalCents/100).toFixed(2));

  //next we need to generate the html for the payment summary, which is the view in MVC
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${updateCartQuantity()}):</div>
        <div class="payment-summary-money">$${currencyFormat(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${currencyFormat(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${currencyFormat(totalBeforeTaxCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${currencyFormat(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${currencyFormat(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;

  document.querySelector('.js-payment-summary-content').innerHTML = paymentSummaryHTML;
  return paymentSummaryHTML;

} 



