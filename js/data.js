// داده‌ها در localStorage ذخیره و بارگذاری می‌شوند

export let clients = JSON.parse(localStorage.getItem('clients')) || [];

// ذخیره‌سازی
export function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

// بارگذاری از localStorage
export function loadClients() {
  const stored = localStorage.getItem('clients');
  clients = stored ? JSON.parse(stored) : [];
  return clients;
}

// حذف یک کارمند با اندیس
export function deleteClient(index) {
  clients.splice(index, 1);
  saveClients();
}
