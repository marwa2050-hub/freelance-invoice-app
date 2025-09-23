// js/data.js
export const STORAGE_KEYS = {
  CLIENTS: 'fi_clients_v1',
  INVOICES: 'fi_invoices_v1'
};

export function loadClients() {
  const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
  return raw ? JSON.parse(raw) : [];
}

export function saveClients(clients) {
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
}

export function loadInvoices() {
  const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
  return raw ? JSON.parse(raw) : [];
}

export function saveInvoices(invoices) {
  localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
}