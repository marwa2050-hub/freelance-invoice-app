// js/data.js

// داده‌ها را از localStorage بارگذاری یا ایجاد کن
export let clients = JSON.parse(localStorage.getItem('clients')) || [];
export let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

// توابع برای مدیریت clients
export function loadClients() {
  return clients;
}

export function saveClients(updatedClients) {
  clients = updatedClients;
  localStorage.setItem('clients', JSON.stringify(clients));
}

// توابع برای مدیریت invoices
export function loadInvoices() {
  return invoices;
}

export function saveInvoices(updatedInvoices) {
  invoices = updatedInvoices;
  localStorage.setItem('invoices', JSON.stringify(invoices));
}
