let queue = [];
let capacity = 0;
let tollAmount = 0;
let totalVehicles = 0;
let totalEarnings = 0;

const vehicleNumberInput = document.getElementById('vehicleNumber');
const vehicleTypeInput = document.getElementById('vehicleType');
const queueList = document.getElementById('queue');
const message = document.getElementById('message');
const totalVehiclesDisplay = document.getElementById('totalVehicles');
const totalEarningsDisplay = document.getElementById('totalEarnings');

document.getElementById('setQueue').addEventListener('click', () => {
    const inputCapacity = document.getElementById('capacity').value;
    tollAmount = parseFloat(document.getElementById('tollAmount').value);

    if (inputCapacity > 0 && tollAmount >= 0) {
        capacity = inputCapacity;
        message.textContent = `Queue set with capacity of ${capacity} and toll amount of ₹${tollAmount}.`;
    } else {
        message.textContent = "Please enter valid capacity and toll amount.";
    }
});

document.getElementById('addVehicle').addEventListener('click', () => {
    const vehicleNumber = vehicleNumberInput.value.trim();
    const vehicleType = vehicleTypeInput.value.trim();

    if (!vehicleNumber || !vehicleType) {
        message.textContent = "Please enter both vehicle number and type.";
        return;
    }

    if (queue.length >= capacity) {
        message.textContent = "Queue is full. Cannot add more vehicles.";
        return;
    }

    if (queue.some(v => v.vehicleNumber === vehicleNumber)) {
        message.textContent = "This vehicle is already in the queue.";
        return;
    }

    const vehicle = { vehicleNumber, vehicleType, fastag: true };
    queue.push(vehicle);
    updateQueueDisplay();
    message.textContent = `Vehicle ${vehicleNumber} added to the queue.`;
    vehicleNumberInput.value = '';
    vehicleTypeInput.value = '';
});

document.getElementById('processVehicle').addEventListener('click', () => {
    if (queue.length === 0) {
        message.textContent = "Queue is empty. No vehicles to process.";
        return;
    }

    const processedVehicle = queue.shift();
    totalVehicles++;
    totalEarnings += tollAmount;
    updateQueueDisplay();
    message.textContent = `Vehicle ${processedVehicle.vehicleNumber} passed through the toll.`;
    totalVehiclesDisplay.textContent = totalVehicles;
    totalEarningsDisplay.textContent = totalEarnings.toFixed(2);
});

document.getElementById('resetQueue').addEventListener('click', () => {
    queue = [];
    totalVehicles = 0;
    totalEarnings = 0;
    updateQueueDisplay();
    totalVehiclesDisplay.textContent = totalVehicles;
    totalEarningsDisplay.textContent = totalEarnings.toFixed(2);
    message.textContent = "Toll queue has been reset for the next day.";
});

function updateQueueDisplay() {
    queueList.innerHTML = '';
    queue.forEach(vehicle => {
        const li = document.createElement('li');
        li.textContent = `Vehicle Number: ${vehicle.vehicleNumber}, Type: ${vehicle.vehicleType}, Fastag: Yes`;
        queueList.appendChild(li);
    });
}
