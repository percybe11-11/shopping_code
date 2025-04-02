let orders=JSON.parse(localStorage.getItem('order'))||[];

export function loadOrder(order){
orders.unshift(order);
saveOrders(orders);
}

function saveOrders(orders){
  localStorage.setItem('order',JSON.stringify(orders));
}