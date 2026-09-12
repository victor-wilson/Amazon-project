const savedCart = JSON.parse(localStorage.getItem('cart'));

export let cart = [];

if (savedCart && savedCart.length > 0) {
  cart = savedCart;
} else {
  cart = [
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
      quantity: selector,
      deliveryOptionId: '1'
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

export function updateCartItemQuantity (cartId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.id === cartId) {
      cartItem.quantity = newQuantity;
    }
  });

  saveCartToLocalStorage();
}

export function updateDeliveryOption (getProductId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((item) => {
    if (getProductId === item.id) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  
  saveCartToLocalStorage();
}
