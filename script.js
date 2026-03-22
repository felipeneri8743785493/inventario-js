let inventory = JSON.parse(localStorage.getItem('my_inventory')) || [];

const form = document.getElementById('inventory-form');
const tableBody = document.getElementById('inventory-body');
const totalDisplay = document.getElementById('total-inventory-value');

// Función para guardar y renderizar
function updateUI() {
    localStorage.setItem('my_inventory', JSON.stringify(inventory));
    renderTable();
    calculateTotal();
}

function renderTable() {
    tableBody.innerHTML = '';
    
    inventory.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.quantity * item.price;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>
                <div class="qty-control">
                    <button class="btn-qty" onclick="changeQty(${index}, -1)">-</button>
                    <span class="${item.quantity < 5 ? 'text-danger' : ''}">${item.quantity}</span>
                    <button class="btn-qty" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button class="btn-del" onclick="deleteItem(${index})">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function calculateTotal() {
    const total = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    totalDisplay.textContent = `$${total.toFixed(2)}`;
}

// Eventos
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newItem = {
        name: document.getElementById('name').value,
        quantity: parseInt(document.getElementById('quantity').value),
        price: parseFloat(document.getElementById('price').value)
    };

    inventory.push(newItem);
    form.reset();
    updateUI();
});

function changeQty(index, amount) {
    inventory[index].quantity = Math.max(0, inventory[index].quantity + amount);
    updateUI();
}

function deleteItem(index) {
    if(confirm('¿Eliminar este producto?')) {
        inventory.splice(index, 1);
        updateUI();
    }
}

function clearInventory() {
    if(confirm('¿Seguro que quieres borrar TODO el inventario?')) {
        inventory = [];
        updateUI();
    }
}

// Inicializar
renderTable();
calculateTotal();