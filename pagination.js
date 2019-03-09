const pageList = document.querySelector('ul');
const everyStudent = pageList.children;
const studentsOnPage = 10;
const btnDiv = document.querySelector('.pagination');
const btnUl = btnDiv.querySelector('ul');
const searchDiv = document.querySelector('.student-search');
const noResult = document.querySelector('.no-result');

// Arrives at number of pages based on number of students (list items)
// pageList.children represents total list items
function numberOfPages() {
    let pages = Math.ceil(everyStudent.length / studentsOnPage);
    return pages;
}

// Creates page buttons based on numberOfPages()
for (let i = 1; i <= numberOfPages(); i++) {
    let pgli = document.createElement('li');
    let pgLink = document.createElement('a');
    pgLink.className = 'active';
    pgLink.href = '#';
    pgLink.textContent = i;
    btnUl.appendChild(pgli);
    pgli.appendChild(pgLink);
}

// Upon loading, automatically displays first ten students
function loadTen() {
    for (let i = 0; i < everyStudent.length; i++) {
        if (i < studentsOnPage) {
            everyStudent[i].style.display = '';
        } else {
            everyStudent[i].style.display = 'none';
        }
    }
}

// search box
let findNames = document.createElement('input');
let findBtn = document.createElement('button');
function findStudent() {
    findNames.placeholder = 'Search for students...';
    findBtn.textContent = 'Search';
    searchDiv.appendChild(findNames);
    searchDiv.appendChild(findBtn);
}

const studentSearch = [];
findBtn.addEventListener('click', () => {
    let filter = findNames.value.toLowerCase();
    studentSearch.length = 0;
    for (let i = 0; i < everyStudent.length; i++) {
        if (everyStudent[i].innerHTML.indexOf(filter) > -1) {
            everyStudent[i].style.display = '';

        } else {
            everyStudent[i].style.display = 'none';
            studentSearch.push(i);
        }
    }
    // <h1> No Results </h1> 
    if (studentSearch.length === everyStudent.length) {
        noResult.innerHTML = '<h1>No Results</h1>';
    } else {
        noResult.innerHTML = '';
    }
});

// btnDiv shows 10 per page
btnDiv.addEventListener('click', (event) => {
    noResult.innerHTML = '';
    let btnNo = parseInt(event.target.textContent);
    let maxCount = btnNo * 10;
    let minCount = maxCount - 10;
    for (let i = 0; i < everyStudent.length; i++) {
        if (i >= minCount && i < maxCount) {
            everyStudent[i].style.display = '';
        } else {
            everyStudent[i].style.display = 'none';
        }
    }
});

// at load time, show first ten
loadTen();

// search box
findStudent();