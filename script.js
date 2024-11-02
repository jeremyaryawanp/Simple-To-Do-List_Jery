// Mendapatkan elemen tanggal utama
const currentDateElement = document.getElementById('currentDate');

// Mendapatkan tanggal saat ini dalam format dd/mm/yyyy
const date = new Date();
const day = date.getDate().toString().padStart(2, '0'); // Menambahkan '0' jika kurang dari 10
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0
const year = date.getFullYear();

const dateString = `${day}/${month}/${year}`; // Format dd/mm/yyyy
currentDateElement.textContent = `Today's Date: ${dateString}`;

// Fungsi untuk menyimpan tugas ke Local Storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fungsi untuk memuat tugas dari Local Storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.filter(task => {
        // Hanya simpan tugas yang dibuat dalam 24 jam terakhir
        const oneDay = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
        const now = new Date().getTime();
        const taskTime = new Date(task.timestamp).getTime();
        return now - taskTime < oneDay;
    });
}

// Fungsi untuk menampilkan tugas
function renderTask(taskValue, timestamp) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    // Membuat elemen <span> untuk teks tugas
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    li.appendChild(taskText);

    // Mendapatkan jam dan menit dari timestamp
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`; // Format jam:menit

    // Membuat elemen <small> untuk waktu
    const timeElement = document.createElement('small');
    timeElement.textContent = `Added at: ${timeString}`;
    timeElement.style.display = 'block';
    timeElement.style.color = '#666';
    timeElement.style.fontSize = '0.8em';
    timeElement.style.marginTop = '5px';

    li.appendChild(timeElement);

    // Membuat tombol Delete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
        // Hapus dari Local Storage
        const tasks = loadTasksFromLocalStorage().filter(t => t.value !== taskValue || t.timestamp !== timestamp);
        saveTasksToLocalStorage(tasks);
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Fungsi untuk menambahkan tugas
document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    // Buat objek tugas dengan nilai dan timestamp
    const task = {
        value: taskValue,
        timestamp: new Date().toISOString()
    };

    // Simpan tugas ke Local Storage
    const tasks = loadTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

    // Tampilkan tugas di halaman
    renderTask(task.value, task.timestamp);

    taskInput.value = '';
});

// Memuat tugas saat halaman pertama kali dibuka
window.addEventListener('load', function() {
    const tasks = loadTasksFromLocalStorage();
    tasks.forEach(task => renderTask(task.value, task.timestamp));
});

// Inisialisasi SortableJS
const taskList = document.getElementById('taskList');
Sortable.create(taskList, {
    animation: 150,
    ghostClass: 'sortable-ghost'
});
