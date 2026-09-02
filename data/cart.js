const savedCart = JSON.parse(localStorage.getItem('cart'));

export let cart = [];

if (savedCart && savedCart.length > 0) {
  cart = savedCart;
} 

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (getProductId) {
  let matchingItem;

  cart.forEach((item) => {
    if (getProductId === item.id) {
      matchingItem = item;
    }
  });

  const selector = Number(document.querySelector(
    `.js-quantity-selector-${getProductId}`).value
  );

  if (matchingItem) {
    matchingItem.quantity += selector;
  } else {
    cart.push({
      id: getProductId,
      quantity: selector
    });
  }

  saveCartToLocalStorage();
}

export function updateCartQuantity (getProductId) {
    let cartQuantity = 0;
  
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
  
    if (cartQuantityElement) {
      cartQuantityElement.innerHTML = cartQuantity;
    }
    return cartQuantity;
  }

export function removeFromCart (cartId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.id !== cartId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveCartToLocalStorage();
}

