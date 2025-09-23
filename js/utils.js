// utils.js
export function generateID() {
    return Date.now();
}

export function findClientById(id) {
    return clients.find(client => client.id === id);
}

export function formatCurrency(amount) {
    return "$" + parseFloat(amount).toFixed(2);
}