// data.js
export let clients = JSON.parse(localStorage.getItem('clients')) || [];
export let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

export function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

export function saveInvoices() {
  localStorage.setItem('invoices', JSON.stringify(invoices));
}

// ✅ این دو تابع برای main.js لازم است
export function loadClients() {
  clients = JSON.parse(localStorage.getItem('clients')) || [];
  return clients;
}

export function loadInvoices() {
  invoices = JSON.parse(localStorage.getItem('invoices')) || [];
  return invoices;
}
