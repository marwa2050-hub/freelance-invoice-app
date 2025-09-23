// invoices.js
import { invoices, clients, saveInvoices } from './data.js';

const invoiceForm = document.getElementById('invoiceForm');
const invoiceList = document.getElementById('invoiceList');

function renderInvoices() {
    invoiceList.innerHTML = '';
    invoices.forEach(invoice => {
        const client = clients.find(c => c.id === invoice.clientId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client ? client.name : 'Unknown'}</td>
            <td>${invoice.title}</td>
            <td>${invoice.description}</td>
            <td>${invoice.amount}</td>
            <td>${invoice.date}</td>
            <td>${invoice.paid ? 'Paid' : 'Unpaid'}</td>
            <td>
                <button onclick="togglePaid(${invoice.id})">Toggle Paid</button>
                <button onclick="deleteInvoice(${invoice.id})">Delete</button>
            </td>
        `;
        invoiceList.appendChild(tr);
    });
}

window.togglePaid = function(id) {
    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
        invoice.paid = !invoice.paid;
        saveInvoices();
        renderInvoices();
    }
}

window.deleteInvoice = function(id) {
    const index = invoices.findIndex(i => i.id === id);
    if (index > -1) {
        invoices.splice(index, 1);
        saveInvoices();
        renderInvoices();
    }
}

function addInvoice(e) {
    e.preventDefault();
    const newInvoice = {
        id: Date.now(),
        clientId: parseInt(document.getElementById('clientSelect').value),
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value,
        date: document.getElementById('date').value,
        paid: false
    };
    invoices.push(newInvoice);
    saveInvoices();
    renderInvoices();
    invoiceForm.reset();
}

invoiceForm.addEventListener('submit', addInvoice);

function populateClients() {
    const select = document.getElementById('clientSelect');
    select.innerHTML = '';
    clients.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.name;
        select.appendChild(option);
    });
}

populateClients();
renderInvoices();