document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value;

    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');

    // Membuat elemen <span> untuk teks tugas
    const taskText = document.createElement('span');
    taskText.textContent = taskValue;
    li.appendChild(taskText);

    // Mendapatkan jam dan menit saat ini
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0'); // Menambahkan '0' jika kurang dari 10
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
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';
});

// Inisialisasi SortableJS
const taskList = document.getElementById('taskList');
Sortable.create(taskList, {
    animation: 150,
    ghostClass: 'sortable-ghost'
});

// Mendapatkan elemen tanggal utama
const currentDateElement = document.getElementById('currentDate');

// Mendapatkan tanggal saat ini dalam format dd/mm/yyyy
const date = new Date();
const day = date.getDate().toString().padStart(2, '0'); // Menambahkan '0' jika kurang dari 10
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Bulan dimulai dari 0
const year = date.getFullYear();

const dateString = `${day}/${month}/${year}`; // Format dd/mm/yyyy
currentDateElement.textContent = `Today's Date: ${dateString}`;
