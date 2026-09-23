function Cart(){
    const cart = {
    cartItems: [],

    loadFromStorage () {
    const savedCart = JSON.parse(localStorage.getItem('cart-oop'));

    if (this.savedCart) {
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
  },

    saveCartToLocalStorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
    },

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
    },

    updateCartQuantity (getProductId) {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      const cartQuantityElement = document.querySelector('.js-cart-quantity');
    
      if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
      }
      return cartQuantity;
    },

    removeFromCart (cartId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.id !== cartId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;
    this.saveCartToLocalStorage();
  },

    updateCartItemQuantity (cartId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.id === cartId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveCartToLocalStorage();
  },

    updateDeliveryOption (getProductId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (getProductId === item.id) {
        matchingItem = item;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    this.saveCartToLocalStorage();
  },

  }
  return cart;
}

const cart = Cart();
const businessCart = Cart();

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
