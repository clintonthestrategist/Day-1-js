let students = [];
let currentFilter = 'all';

const nameInput = document.getElementById('studentname');
const scoreInput = document.getElementById('score');
const addButton = document.getElementById('addstudentbutton');
const studentList = document.getElementById('studentlist');
const filterButtons = document.querySelectorAll('.filterbuttons button');

function getLetterGrade(score) {
    if (score >= 85) return 'A';
    if (score >= 65) return 'B';
    if (score >= 54) return 'C';
    if (score >= 42) return 'D';
    return 'F';
}

function updateStatistics() {
    if (students.length === 0){
        document.getElementById('averagescore').innerText = "0";
        document.getElementById('highest').innerText = "0";
        document.getElementById('passrate').innerText = "0%";
        document.getElementById('totalstudents').innerText = "0";
        return;
    }

    const scores = students.map(s => s.score);
    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
    const average = totalScore / students.length;
    const highest = Math.max(...scores);
    const passingCount = students.filter(s => s.score >= 54).length;
    const passRate = (passingCount / students.length) * 100;

    document.getElementById('averagescore').innerText = average.toFixed(1);
    document.getElementById('highest').innerText = highest;
    document.getElementById('passrate').innerText = `${passRate.toFixed(0)}%`;
    document.getElementById('totalstudents').innerText = students.length;
}
function renderTable() {
    studentList.innerHTML = '';

    let filteredStudents = students;
    if (currentFilter === 'passing') filteredStudents = students.filter(s => s.score >= 54);
    if (currentFilter === 'failing') filteredStudents = students.filter(s => s.score < 54);
    if (currentFilter === 'honors') filteredStudents = students.filter(s => s.score >= 85);

    filteredStudents.forEach(student => {
        const row = document.createElement('tr')
        const statusClass = student.score >= 54 ? 'status-pass' : 'status-fail';

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.grade}</td>
            <td class="${statusClass}">${student.score >= 54 ? 'PASS' : 'FAIL'}</td>
            `;
            studentList.appendChild(row);
    })
}
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const score = parseInt(scoreInput.value);

    if (name === '' || isNaN(score) || score < 0 || score > 100) {
        alert("Please enter a valid name and score (0-100)");
        return;
    }

    const newStudent = {
        name: name,
        score: score,
        grade: getLetterGrade(score)
    };

    students.push(newStudent);

    nameInput.value = '';
    scoreInput.value = '';

    updateStatistics();
    renderTable();
});
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {

        filterButtons.forEach(b => b.classList.remove('filterselect'));
        btn.classList.add('filterselect');

        currentFilter = btn.getAttribute('data-filter');
        renderTable();
    });
});