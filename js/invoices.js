// js/invoices.js
import { loadClients, loadInvoices, saveInvoices } from './data.js';
import { generateId, formatCurrency } from './utils.js';

const invoiceForm = document.getElementById('invoice-form');
const clientSelect = document.getElementById('invoice-client');
const invoicesTableBody = document.querySelector('#invoices-table tbody');

let clients = loadClients();
let invoices = loadInvoices();

function populateClientDropdown() {
  clientSelect.innerHTML = '<option value="">انتخاب مشتری</option>';
  clients.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} ${c.company ? '— ' + c.company : ''}`;
    clientSelect.appendChild(opt);
  });
}

function renderInvoices() {
  invoicesTableBody.innerHTML = '';
  invoices.forEach(inv => {
    const client = clients.find(c => c.id === inv.clientId);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${client ? client.name : 'مشتری حذف‌شده'}</td>
      <td>${escapeHtml(inv.title)}</td>
      <td>${formatCurrency(inv.amount)}</td>
      <td>${inv.date}</td>
      <td>${inv.paid ? 'پرداخت‌شده' : 'پرداخت‌نشده'}</td>
      <td class="actions">
        <button data-id="${inv.id}" class="toggle-paid">${inv.paid ? 'نشانه‌زدن عدم پرداخت' : 'نشان‌زدن پرداخت'}</button>
        <button data-id="${inv.id}" class="edit">ویرایش</button>
        <button data-id="${inv.id}" class="delete">حذف</button>
      </td>
    `;
    invoicesTableBody.appendChild(tr);
  });

  // update dashboard numbers if present
  const totalInvoicesEl = document.getElementById('total-invoices');
  const totalValueEl = document.getElementById('total-value');
  const paidVsEl = document.getElementById('paid-versus-unpaid');
  if (totalInvoicesEl) totalInvoicesEl.textContent = invoices.length;
  if (totalValueEl) {
    const sum = invoices.reduce((s, i) => s + Number(i.amount || 0), 0);
    totalValueEl.textContent = formatCurrency(sum);
  }
  if (paidVsEl) {
    const paid = invoices.filter(i => i.paid).length;
    const unpaid = invoices.length - paid;
    paidVsEl.textContent = `${paid} / ${unpaid}`;
  }
}

invoiceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('invoice-id').value;
  const clientId = document.getElementById('invoice-client').value;
  const title = document.getElementById('invoice-title').value.trim();
  const desc = document.getElementById('invoice-desc').value.trim();
  const amount = Number(document.getElementById('invoice-amount').value);
  const date = document.getElementById('invoice-date').value;

  if (!clientId || !title || !amount || !date) {
    alert('لطفاً همه فیلدهای لازم را پر کنید.');
    return;
  }

  if (id) {
    invoices = invoices.map(inv => inv.id === id ? {...inv, clientId, title, desc, amount, date} : inv);
  } else {
    const inv = { id: generateId(), clientId, title, desc, amount, date, paid: false, createdAt: new Date().toISOString() };
    invoices.push(inv);
  }

  saveInvoices(invoices);
  renderInvoices();
  clearForm();
});

document.getElementById('invoice-cancel').addEventListener('click', clearForm);

invoicesTableBody.addEventListener('click', (e) => {
  const id = e.target.getAttribute('data-id');
  if (!id) return;
  if (e.target.classList.contains('delete')) {
    if (!confirm('حذف شود؟')) return;
    invoices = invoices.filter(i => i.id !== id);
    saveInvoices(invoices);
    renderInvoices();
  } else if (e.target.classList.contains('edit')) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    document.getElementById('invoice-id').value = inv.id;
    document.getElementById('invoice-client').value = inv.clientId;
    document.getElementById('invoice-title').value = inv.title;
    document.getElementById('invoice-desc').value = inv.desc || '';
    document.getElementById('invoice-amount').value = inv.amount;
    document.getElementById('invoice-date').value = inv.date;
    document.getElementById('invoice-submit').textContent = 'بروزرسانی فاکتور';
  } else if (e.target.classList.contains('toggle-paid')) {
    invoices = invoices.map(i => i.id === id ? {...i, paid: !i.paid} : i);
    saveInvoices(invoices);
    renderInvoices();
  }
});

function clearForm() {
  invoiceForm.reset();
  document.getElementById('invoice-id').value = '';
  document.getElementById('invoice-submit').textContent = 'ایجاد/بروزرسانی فاکتور';
}

function escapeHtml(str = '') {
  return String(str).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

// initial load
populateClientDropdown();
renderInvoices();