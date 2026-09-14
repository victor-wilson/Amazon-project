import { currencyFormat } from "../scripts/utils/money.js";

//Basic test cases
  //test-case 1
  console.log('test suite: currency formating')
 if (currencyFormat(2095) === '20.95'){
  console.log ('passed test for 2095');
 } else {
  console.log('failed test for 2095');
 }

 //test-case 2
 if (currencyFormat(0) === '0.00'){
  console.log('passed test for 0');
 } else {
  console.log('failed test for 0');
 }
 
//Edge test-cases
 //test-case 1
  if (currencyFormat(2000.5) === '20.00'){
    console.log('passed for 2000.4');
  } else {
    console.log('failed for 2000.4');
  }

