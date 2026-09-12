export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  },
];

export function getDeliveryOption (deliveryOptionId) {
  let matchingDeliveryOption;

    deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingDeliveryOption = option;
    }
  });
  return matchingDeliveryOption || deliveryOptions[0];
}

//i want to modify the delivery option code so that, when calculating the delivery date, skip all saturdays and sundays. Example: if today Friday, Oct 5, and we choose 1-day delivery, delivery date should be Mon 8 oct (skip the weekend). Friday, Oct 5 + 3 = Wednesday, Oct 10 (skip the weekend). Monday, Oct 1 + 3 days = Thursday, Oct 4 (no weekend in between). Friday, Oct 5 + 7 days = Tuesday, Oct 16 (skip 2 weekends in between). Hint: get the number of days you need to add. Use a while loop, and each time, add 1 day and decrease the remaining days to add. If the date is weekend, skip decreasing the reainng days.