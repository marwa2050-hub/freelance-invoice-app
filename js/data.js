// js/data.js

// بارگذاری clients از localStorage
export function loadClients() {
  const stored = localStorage.getItem('clients');
  return stored ? JSON.parse(stored) : [];
}

// ذخیره clients در localStorage
export function saveClients(clients) {
  localStorage.setItem('clients', JSON.stringify(clients));
}

// بارگذاری invoices
export function loadInvoices() {
  const stored = localStorage.getItem('invoices');
  return stored ? JSON.parse(stored) : [];
}

// ذخیره invoices
export function saveInvoices(invoices) {
  localStorage.setItem('invoices', JSON.stringify(invoices));
}
