import { loadClients, saveClients } from './data.js';
import { generateId } from './utils.js';

const form = document.getElementById('client-form');
const tableBody = document.querySelector('#clients-table tbody');
let clients = loadClients();

function renderClients() {
  tableBody.innerHTML = '';
  clients.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td>${c.company || ''}</td>
      <td class="actions">
        <button data-id="${c.id}" class="edit">Edit</button>
        <button data-id="${c.id}" class="delete">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
  document.getElementById('total-clients').textContent = clients.length;
}

function clearForm() {
  form.reset();
  document.getElementById('client-id').value = '';
  document.getElementById('client-submit').textContent = 'Add Client';
}

form.addEventListener('submit', e => {
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
    clients = clients.map(c => c.id === id ? { ...c, name, email, company, notes } : c);
  } else {
    clients.push({
      id: generateId(),
      name,
      email,
      company,
      notes,
      createdAt: new Date().toISOString()
    });
  }

  saveClients(clients);
  renderClients();
  clearForm();
});

document.getElementById('client-cancel')?.addEventListener('click', clearForm);

tableBody.addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('delete')) {
    if (!confirm('Delete this client?')) return;
    clients = clients.filter(c => c.id !== id);
    saveClients(clients);
    renderClients();
  } else if (e.target.classList.contains('edit')) {
    const c = clients.find(x => x.id === id);
    document.getElementById('client-id').value = c.id;
    document.getElementById('client-name').value = c.name;
    document.getElementById('client-email').value = c.email;
    document.getElementById('client-company').value = c.company || '';
    document.getElementById('client-notes').value = c.notes || '';
    document.getElementById('client-submit').textContent = 'Update Client';
  }
});

renderClients();
