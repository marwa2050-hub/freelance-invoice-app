// js/main.js
import { loadClients, loadInvoices } from './data.js';

async function loadQuote() {
  const quoteTextEl = document.getElementById('quote-text');
  const quoteAuthorEl = document.getElementById('quote-author');
  if (!quoteTextEl) return;
  try {
    const res = await fetch('data/quotes.json');
    const arr = await res.json();
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('no quotes');
    const chosen = arr[Math.floor(Math.random() * arr.length)];
    quoteTextEl.textContent = chosen.text || 'بدون متن';
    quoteAuthorEl.textContent = chosen.author ? `— ${chosen.author}` : '— Unknown';
  } catch (err) {
    quoteTextEl.textContent = 'نمایش نقل قول امکان‌پذیر نیست.';
    quoteAuthorEl.textContent = '';
    console.error(err);
  }
}

function populateDashboardCounts() {
  const clients = loadClients();
  const invoices = loadInvoices();
  const totalClientsEl = document.getElementById('total-clients');
  const totalInvoicesEl = document.getElementById('total-invoices');
  const totalValueEl = document.getElementById('total-value');
  const paidVsEl = document.getElementById('paid-versus-unpaid');

  if (totalClientsEl) totalClientsEl.textContent = clients.length;
  if (totalInvoicesEl) totalInvoicesEl.textContent = invoices.length;
  if (totalValueEl) {
    const sum = invoices.reduce((s, i) => s + Number(i.amount || 0), 0);
    totalValueEl.textContent = sum.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  if (paidVsEl) {
    const paid = invoices.filter(i => i.paid).length;
    paidVsEl.textContent = `${paid} / ${invoices.length - paid}`;
  }
}

// run on pages
document.addEventListener('DOMContentLoaded', () => {
  loadQuote();
  populateDashboardCounts();
});