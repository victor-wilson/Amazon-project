import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


export function dateFormat (){
  const dateElement = dayjs();
  const numberOfDays = dateElement.add(1, 'month');
  console.log(numberOfDays.format('dddd'));
}

export function isWeekend(date) {
  const day = date.day();
  return day === 0 || day === 6;
}

export function calculateDeliveryDate(startDate, deliveryDays) {
  let deliveryDate = startDate;
  let remainingDays = deliveryDays;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate;
}

