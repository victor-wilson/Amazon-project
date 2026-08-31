export const cart = [
  {
    id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
  },{
    id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

export function addToCart (getProductId){
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
}

export function updateCartQuantity (getProductId) {
  //this is for the cart quantity to be updated and also be visible on the cart icon on the page     
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
      });
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(cart);
}

