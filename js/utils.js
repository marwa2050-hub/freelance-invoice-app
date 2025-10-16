// js/utils.js

// تولید یک شناسه یکتا
export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

// قالب‌بندی عدد به صورت ارز با دو رقم اعشار
export function formatCurrency(num) {
  const n = Number(num) || 0;
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// پیدا کردن یک شیء در آرایه بر اساس id
export function findById(arr, id) {
  return arr.find(x => x.id === id);
}
