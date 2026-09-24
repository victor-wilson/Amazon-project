import { dateFormat } from './dayjs.js';
import {renderCheckoutPage} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, products } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js'

loadProducts(()=> {
  renderPaymentSummary();

  renderCheckoutPage();

  dateFormat();
});