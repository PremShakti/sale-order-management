let activeOrders = [];
let completedOrders = [];

export const fetchActiveOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(activeOrders);
    }, 1000);
  });
};

export const fetchCompletedOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(completedOrders);
    }, 1000);
  });
};

export const saveOrder = async (newOrder) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderWithProfile = {
        name: newOrder.name,
        price: newOrder.price,
        id: activeOrders.length + 1,
        invoice_date: new Date().toISOString(),
      };
      activeOrders.push(orderWithProfile);
      resolve(newOrder);
    }, 500);
  });
};

