import { dateFormat } from './dayjs.js';
import {renderCheckoutPage} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-oop.js';

renderPaymentSummary();

renderCheckoutPage();

dateFormat();