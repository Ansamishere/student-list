const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const majorInput = document.getElementById('major');
const addBtn = document.getElementById('addBtn');
const filterAgeInput = document.getElementById('filterAge');
const filterMajorInput = document.getElementById('filterMajor');
const studentTableBody = document.getElementById('studentTableBody');

const students = [];

addBtn.addEventListener('click', addStudent);
filterAgeInput.addEventListener('input', filterStudents);
filterMajorInput.addEventListener('input', filterStudents);

function addStudent() {
  const name = nameInput.value;
  const age =parseInt(ageInput.value);
  const major = majorInput;
  
  const newStudent = {
    name: name,
    age: age,
    major: major,
    status: 'pending',
    isDelete: false
  };
  
  students.push(newStudent);
  
  nameInput.value = '';
  ageInput.value = '';
  majorInput.value = '';
  
  // Display the updated student list
  displayStudents();
}

// Function to display the student list
function displayStudents() {
  // Clear the table body
  studentTableBody.innerHTML = '';
  
  // Filter students based on age and major
  const filterAge = parseInt(filterAgeInput.value);
  const filterMajor = filterMajorInput.value;
  const filteredStudents = students.filter(student => {
    return (isNaN(filterAge) || student.age === filterAge) &&
           (filterMajor === '' || student.major.toLowerCase().includes(filterMajor.toLowerCase()));
  });
  
  // Create table rows for each student
  filteredStudents.forEach(student => {
    const row = document.createElement('tr');
    
    const nameCell = document.createElement('td');
    nameCell.textContent = student.name;
    row.appendChild(nameCell);
    
    const ageCell = document.createElement('td');
    ageCell.textContent = student.age;
    row.appendChild(ageCell);
    
    const majorCell = document.createElement('td');
    majorCell.textContent = student.major;
    row.appendChild(majorCell);
    
    const statusCell = document.createElement('td');
    statusCell.textContent = student.status;
    row.appendChild(statusCell);
    
    const actionCell = document.createElement('td');
    
    if (student.status === 'active' && !student.isDelete) {
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteStudent(student));
      actionCell.appendChild(deleteBtn);
    } else {
      const alertText = document.createElement('span');
      alertText.textContent = 'Not Active';
      actionCell.appendChild(alertText);
    }
    
    row.appendChild(actionCell);
    
    studentTableBody.appendChild(row);
  });
}


function deleteStudent(student) {
  student.isDelete = true;
  displayStudents();
}

function filterStudents() {
  displayStudents();
}


displayStudents();
