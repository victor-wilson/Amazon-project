export const orders = localStorage.getItem('itemOrders') || [];

export function addOrders (order) {
  orders.unshift(order);
  saveToStorage()
}

function saveToStorage () {
  localStorage.setItem('itemOrders', JSON.stringify(orders));
}