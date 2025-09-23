// main.js
import { clients, invoices } from './data.js';

const totalClients = document.getElementById('totalClients');
const totalInvoices = document.getElementById('totalInvoices');
const totalValue = document.getElementById('totalValue');
const paidInvoices = document.getElementById('paidInvoices');
const unpaidInvoices = document.getElementById('unpaidInvoices');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');

function updateDashboard() {
    totalClients.textContent = clients.length;
    totalInvoices.textContent = invoices.length;
    totalValue.textContent = "$" + invoices.reduce((sum, i) => sum + parseFloat(i.amount), 0).toFixed(2);
    paidInvoices.textContent = invoices.filter(i => i.paid).length;
    unpaidInvoices.textContent = invoices.filter(i => !i.paid).length;
}

async function loadQuote() {
    try {
        const res = await fetch('./data/quotes.json');
        const data = await res.json();
        const random = data[Math.floor(Math.random() * data.length)];
        quoteText.textContent = `"${random.quote}"`;
        quoteAuthor.textContent = random.author || "Unknown";
    } catch (err) {
        quoteText.textContent = "Quote not available";
        quoteAuthor.textContent = "";
    }
}

updateDashboard();
loadQuote();