// js/invoices.js
import { loadClients, loadInvoices, saveInvoices } from './data.js';
import { generateId } from './utils.js';

const invoiceForm = document.getElementById('invoice-form');
const clientSelect = document.getElementById('invoice-client');
const tableBody = document.querySelector('#invoices-table tbody');

let invoices = loadInvoices();
let clients = loadClients();

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

function getClientName(clientId) {
  const client = clients.find(c => c.id === clientId);
  return client ? client.name : 'Unknown';
}

function renderInvoices() {
  tableBody.innerHTML = '';
  invoices.forEach(inv => {
    const tr = document.createElement('tr');
    tr.className = inv.paid ? 'paid' : 'unpaid';
    tr.innerHTML = `
      <td>${getClientName(inv.clientId)}</td>
      <td>${inv.title}</td>
      <td>${Number(inv.amount).toFixed(2)}</td>
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

  updateDashboardCounts();
}

function updateDashboardCounts() {
  const totalClientsEl = document.getElementById('total-clients');
  const totalInvoicesEl = document.getElementById('total-invoices');
  const totalValueEl = document.getElementById('total-value');
  const paidVsEl = document.getElementById('paid-versus-unpaid');

  if (totalClientsEl) totalClientsEl.textContent = clients.length;
  if (totalInvoicesEl) totalInvoicesEl.textContent = invoices.length;
  if (totalValueEl) {
    const sum = invoices.reduce((s, i) => s + Number(i.amount || 0), 0);
    totalValueEl.textContent = sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (paidVsEl) {
    const paid = invoices.filter(i => i.paid).length;
    paidVsEl.textContent = `${paid} / ${invoices.length - paid}`;
  }
}

function clearForm() {
  invoiceForm.reset();
  document.getElementById('invoice-id').value = '';
  document.getElementById('invoice-submit').textContent = 'Create / Update Invoice';
}

invoiceForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('invoice-id').value;
  const clientId = clientSelect.value;
  const title = document.getElementById('invoice-title').value.trim();
  const desc = document.getElementById('invoice-desc').value.trim();
  const amount = parseFloat(document.getElementById('invoice-amount').value);
  const date = document.getElementById('invoice-date').value;

  if (!clientId || !title || isNaN(amount) || !date) {
    alert('Please fill all required fields.');
    return;
  }

  if (id) {
    invoices = invoices.map(inv => inv.id === id ? {...inv, clientId, title, desc, amount, date} : inv);
  } else {
    invoices.push({
      id: generateId(),
      clientId,
      title,
      desc,
      amount,
      date,
      paid: false
    });
  }

  saveInvoices(invoices);
  renderInvoices();
  clearForm();
});

document.getElementById('invoice-cancel')?.addEventListener('click', clearForm);

tableBody.addEventListener('click', e => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;

  if (e.target.classList.contains('delete')) {
    if (!confirm('Are you sure you want to delete this invoice?')) return;
    invoices = invoices.filter(inv => inv.id !== id);
    saveInvoices(invoices);
    renderInvoices();
  } else if (e.target.classList.contains('edit')) {
    const inv = invoices.find(inv => inv.id === id);
    if (!inv) return;
    document.getElementById('invoice-id').value = inv.id;
    clientSelect.value = inv.clientId;
    document.getElementById('invoice-title').value = inv.title;
    document.getElementById('invoice-desc').value = inv.desc;
    document.getElementById('invoice-amount').value = inv.amount;
    document.getElementById('invoice-date').value = inv.date;
    document.getElementById('invoice-submit').textContent = 'Update Invoice';
  } else if (e.target.classList.contains('toggle-paid')) {
    invoices = invoices.map(inv => inv.id === id ? {...inv, paid: !inv.paid} : inv);
    saveInvoices(invoices);
    renderInvoices();
  }
});

// initialize
populateClientSelect();
renderInvoices();
س
