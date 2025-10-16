// js/data.js
export let clients = JSON.parse(localStorage.getItem('clients')) || [];
export let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

export function loadClients() {
  return clients;
}

export function saveClients(updatedClients) {
  clients = updatedClients;
  localStorage.setItem('clients', JSON.stringify(clients));
}

export function loadInvoices() {
  return invoices;
}

export function saveInvoices(updatedInvoices) {
  invoices = updatedInvoices;
  localStorage.setItem('invoices', JSON.stringify(invoices));
}
