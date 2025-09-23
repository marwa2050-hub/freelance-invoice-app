import { clients, saveClients } from './data.js';

const clientForm = document.getElementById('clientForm');
const clientList = document.getElementById('clientList');

function renderClients() {
    clientList.innerHTML = '';
    clients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>${client.company}</td>
            <td>
                <button onclick="editClient(${client.id})">Edit</button>
                <button onclick="deleteClient(${client.id})">Delete</button>
            </td>
        `;
        clientList.appendChild(tr);
    });
}

window.deleteClient = function(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index > -1) {
        clients.splice(index, 1);
        saveClients();
        renderClients();
    }
}

window.editClient = function(id) {
    const client = clients.find(c => c.id === id);
    if (client) {
        document.getElementById('name').value = client.name;
        document.getElementById('email').value = client.email;
        document.getElementById('company').value = client.company;

        clientForm.onsubmit = function(e) {
            e.preventDefault();
            client.name = document.getElementById('name').value;
            client.email = document.getElementById('email').value;
            client.company = document.getElementById('company').value;
            saveClients();
            renderClients();
            clientForm.reset();
            clientForm.onsubmit = addClient;
        }
    }
}

function addClient(e) {
    e.preventDefault();
    const newClient = {
        id: Date.now(),
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value
    };
    clients.push(newClient);
    saveClients();
    renderClients();
    clientForm.reset();
}

clientForm.addEventListener('submit', addClient);
renderClients();