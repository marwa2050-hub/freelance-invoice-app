// js/utils.js
export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

export function formatCurrency(num) {
  const n = Number(num) || 0;
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function findById(arr, id) {
  return arr.find(x => x.id === id);
}
