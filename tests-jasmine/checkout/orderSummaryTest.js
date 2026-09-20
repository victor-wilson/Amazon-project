import { renderCheckoutPage } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";


const prodID = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const prodID2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('Test Suite: renderCheckoutPage', () =>{
  it ('Displays the cart', () => {
    document.querySelector('.js-test-container')
      .innerHTML = 
      `<div class="js-checkout-quantity"></div>
      <div class="js-order-summary"></div>`;

      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([
          {
            id: prodID,
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            id: prodID2,
            quantity: 1,
            deliveryOptionId: '2'
          }
        ]);   
      });
      loadFromStorage();
      renderCheckoutPage();

      expect (document.querySelectorAll('.js-cart-container-test').length).toEqual(2);

      expect (document.querySelector(`.js-quantity-test-${prodID}`).innerText).toContain('Quantity: 2');

      expect (document.querySelector(`.js-quantity-test-${prodID2}`).innerText).toContain('Quantity: 1');
  });
});
