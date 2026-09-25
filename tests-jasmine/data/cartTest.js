import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

//create a test suite for the add to cart function


  //creates a test suite for when a new product is added to the cart
  describe('Test suite: addToCart', () =>{
    it ('adds a new product in the cart', () => {
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);

    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
      <select class="js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
        <option selected value="1">1</option>
      </select>`;
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    });
  });



