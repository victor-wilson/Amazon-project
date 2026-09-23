

class Cart {
  cartItems = [];
  localStorageKey;

  //this line runs the constructor
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  //this line loads the cart from local storage
  loadFromStorage () {
    const savedCart = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (savedCart) {
        this.cartItems = savedCart;
      } else {
        this.cartItems = [
          {
            id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          },
          {
            id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
          }
        ];
    }
  } 
    
  //this line saves the newly added item to local storage
  saveCartToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }  
   
   //this line adds an item to the cart 
   addToCart (getProductId, quantity) {
      let matchingItem;

      this.cartItems.forEach((item) => {
        if (getProductId === item.id) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          id: getProductId,
          quantity: quantity,
          deliveryOptionId: '1'
        });
      }
      this.saveCartToLocalStorage();
    }
    
  // this line updates the cart when an item is added  
  updateCartQuantity (getProductId) {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
 //this line uses DOM to display the cart quantity   
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
    return cartQuantity;
  }
  
  //this line removes item(s) from the cart
  removeFromCart (cartId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.id !== cartId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveCartToLocalStorage();
  }

  //this line updates the item quantity when user clicks the update link to increase the quantity of selected item
  updateCartItemQuantity (cartId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.id === cartId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveCartToLocalStorage();
  }

  //this line handles and displays the delivery option in the checkout page
  updateDeliveryOption (getProductId, deliveryOptionId) {
  let matchingItem;

  this.cartItems.forEach((item) => {
    if (getProductId === item.id) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  this.saveCartToLocalStorage();
  }

}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.addToCart('e4f64a65-1377-42bc-89a5-e572d19252e2', 2);

console.log(cart);
console.log(businessCart);