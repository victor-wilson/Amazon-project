import { dateFormat } from './dayjs.js';
import {renderCheckoutPage} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, products } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{   
      resolve('value 1');
    });
  }),

  new Promise((resolve) =>{
    loadCart(() =>{
      resolve('value 2');
    });
  })
]).then((val) =>{
  console.log(val)
  renderCheckoutPage();
  dateFormat();
  renderPaymentSummary()
});


/*new Promise((resolve)=>{
  loadProducts(()=>{   
    resolve();
  });

}).then(()=>{
  return new Promise((resolve) =>{
    loadCart(() =>{
      resolve()
    });
  });

}).then(() =>{
  renderCheckoutPage();
  dateFormat();
  renderPaymentSummary()
});*/


/*loadProducts(()=> {
  renderPaymentSummary();
  renderCheckoutPage();
  dateFormat();
});*/


/*function callback (nextFunc) {
  console.log('call just this function');
  return nextFunc();
}
callback(theCalled)


function theCalled () {
  const a = 5;
  const b = 10;
  const c = a + b
  console.log(c);
}*/