import { loadClients, loadInvoices, saveInvoices } from './data.js';
import { generateId, formatCurrency, findById } from './utils.js';

const invoiceForm = document.getElementById('invoice-form');
const clientSelect = document.getElementById('invoice-client');
const tableBody = document.querySelector('#invoices-table tbody');

let clients = loadClients();
let invoices = loadInvoices();

// پر کردن select مشتریان
function populateClientSelect() {
  if (!clientSelect) return;
  clientSelect.innerHTML = '<option value="">Select a client</option>';
  clients.forEach(c => {
    const option = document.createElement('option');
    option.value = c.id;
    option.textContent = c.name;
    clientSelect.appendChild(option);
  });
}

function renderInvoices() {
  tableBody.innerHTML = '';
  invoices.forEach(inv => {
    const client = findById(clients, inv.clientId);
    const tr = document.createElement('tr');
    tr.className = inv.paid ? 'paid' : 'unpaid';
    tr.innerHTML = `
      <td>${client?.name || 'Unknown'}</td>
      <td>${inv.title}</td>
      <td>${formatCurrency(inv.amount)}</td>
      <td>${inv.date}</td>
      <td>${inv.paid ? 'Paid' : 'Unpaid'}</td>
      <td class="actions">
        <button data-id="${inv.id}" class="edit">Edit</button>
        <button data-id="${inv.id}" class="delete">Delete</button>
        <button data-id="${inv.id}" class="toggle-paid">Toggle Paid</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function clearForm() {
  invoiceForm.reset();
  document.getElementById('invoice-id').value = '';
}

invoiceForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('invoice-id').value;
  const clientId = clientSelect.value;
  const title = document.getElementById('invoice-title').value.trim();
  const desc = document.getElementById('invoice-desc').value.trim();
  const amount = parseFloat(document.getElementById('invoice-amount').value);
  const date = document.getElementById('invoice-date').value;

  if (!clientId || !title || !amount || !date) {
    alert('All fields are required!');
    return;
  }

  if (id) {
    invoices = invoices.map(inv => inv.id === id ? { ...inv, clientId, title, desc, amount, date } : inv);
  } else {
    invoices.push({ id: generateId(), clientId, title, desc, amount, date, paid: false });
  }

  saveInvoices(invoices);
  renderInvoices();
  clearForm();
});

document.getElementById('invoice-cancel')?.addEventListener('click', clearForm);

tableBody.addEventListener('click', e => {
  const id = e.target.dataset.id;
  if (!id) return;

  if (e.target.classList.contains('delete')) {
    if (!confirm('Delete this invoice?')) return;
    invoices = invoices.filter(inv => inv.id !== id);
    saveInvoices(invoices);
    renderInvoices();
  } else if (e.target.classList.contains('edit')) {
    const inv = findById(invoices, id);
    document.getElementById('invoice-id').value = inv.id;
    clientSelect.value = inv.clientId;
    document.getElementById('invoice-title').value = inv.title;
    document.getElementById('invoice-desc').value = inv.desc;
    document.getElementById('invoice-amount').value = inv.amount;
    document.getElementById('invoice-date').value = inv.date;
  } else if (e.target.classList.contains('toggle-paid')) {
    invoices = invoices.map(inv => inv.id === id ? { ...inv, paid: !inv.paid } : inv);
    saveInvoices(invoices);
    renderInvoices();
  }
});

// initialize
populateClientSelect();
renderInvoices();
