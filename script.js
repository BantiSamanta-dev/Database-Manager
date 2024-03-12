document.addEventListener('DOMContentLoaded', () => {
    const studentList = document.getElementById('studentList');
    const addStudentForm = document.getElementById('addStudentForm');

    // Fetch student data and display it
    fetchStudents();

    // Event listener for form submission
    addStudentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value;
        const score = parseFloat(document.getElementById('scoreInput').value);
        const type = document.getElementById('typeInput').value;

        await addStudent({ name, scores: [{ score, type }] });
        fetchStudents();
        addStudentForm.reset();
    });

    async function fetchStudents() {
        try {
            const response = await fetch('http://localhost:5000/api/students');
            const students = await response.json();
            displayStudents(students);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    function displayStudents(students) {
        studentList.innerHTML = '';
        students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.innerHTML = `
                <p>Name: ${student.name}</p>
                <p>Scores: ${formatScores(student.scores)}</p>
                <form onsubmit="updateScore(event, '${student._id}')">
                    <input type="number" placeholder="Enter new score" required>
                    <select required>
                        <option value="exam">Exam</option>
                        <option value="quiz">Quiz</option>
                        <option value="homework">Homework</option>
                    </select>
                    <button type="submit">Update Score</button>
                </form>
                <button onclick="deleteStudent('${student._id}')">Delete Student</button>
            `;
            studentList.appendChild(studentItem);
        });
    }
    
    function formatScores(scores) {
        if (!scores || !Array.isArray(scores)) {
            return '';
        }
    
        return scores.map(score => `${score.type}: ${score.score}`).join(', ');
    }

    async function addStudent(studentData) {
        try {
            await fetch('http://localhost:5000/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }

    async function deleteStudent(studentId) {
        try {
            await fetch(`http://localhost:5000/api/students/${studentId}`, {
                method: 'DELETE'
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }

    async function updateScore(event, studentId) {
        event.preventDefault();
        const newScore = parseFloat(event.target.querySelector('input').value);
        const type = event.target.querySelector('select').value;

        try {
            await fetch(`http://localhost:5000/api/students/${studentId}/score/${type}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score: newScore })
            });
            fetchStudents();
        } catch (error) {
            console.error('Error updating score:', error);
        }
    }
});
