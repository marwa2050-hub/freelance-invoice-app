// ----- Clients -----
export function loadClients() {
  return JSON.parse(localStorage.getItem('clients')) || [];
}

export function saveClients(clients) {
  localStorage.setItem('clients', JSON.stringify(clients));
}

// ----- Invoices -----
export function loadInvoices() {
  return JSON.parse(localStorage.getItem('invoices')) || [];
}

export function saveInvoices(invoices) {
  localStorage.setItem('invoices', JSON.stringify(invoices));
}
