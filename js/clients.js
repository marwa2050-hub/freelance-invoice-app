import { loadClients, saveClients } from './data.js';
import { generateId } from './utils.js';

let clients = loadClients();

const form = document.getElementById('client-form');
const tableBody = document.querySelector('#clients-table tbody');

function renderClients() {
  tableBody.innerHTML = '';
  clients.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(c.name)}</td>
      <td>${escapeHtml(c.email)}</td>
      <td>${escapeHtml(c.company || '')}</td>
      <td class="actions">
        <button data-id="${c.id}" class="edit">Edit</button>
        <button data-id="${c.id}" class="delete">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  const totalClientsEl = document.getElementById('total-clients');
  if (totalClientsEl) totalClientsEl.textContent = clients.length;
}

function clearForm() {
  form.reset();
  document.getElementById('client-id').value = '';
  document.getElementById('client-submit').textContent = 'Add Client';
}

// اضافه کردن / ویرایش client
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('client-id').value;
  const name = document.getElementById('client-name').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const company = document.getElementById('client-company').value.trim();
  const notes = document.getElementById('client-notes').value.trim();

  if (!name || !email) {
    alert('Name and email are required.');
    return;
  }

  if (id) {
    clients = clients.map(c => c.id === id ? {...c, name, email, company, notes} : c);
  } else {
    const newClient = { 
      id: generateId(), 
      name, 
      email, 
      company, 
      notes, 
      createdAt: new Date().toISOString() 
    };
    clients.push(newClient);
  }

  saveClients(clients);
  renderClients();
  clearForm();
});

// Cancel button
const cancelBtn = document.getElementById('client-cancel');
if (cancelBtn) cancelBtn.addEventListener('click', clearForm);

// Edit / Delete actions
tableBody.addEventListener('click', (e) => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;

  if (e.target.classList.contains('delete')) {
    if (!confirm('Are you sure you want to delete this client?')) return;
    clients = clients.filter(c => c.id !== id);
    saveClients(clients);
    renderClients();
  } else if (e.target.classList.contains('edit')) {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    document.getElementById('client-id').value = client.id;
    document.getElementById('client-name').value = client.name;
    document.getElementById('client-email').value = client.email;
    document.getElementById('client-company').value = client.company || '';
    document.getElementById('client-notes').value = client.notes || '';
    document.getElementById('client-submit').textContent = 'Update Client';
  }
});

// Simple HTML escape
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;');
}

// Initial render
renderClients();
