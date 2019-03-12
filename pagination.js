
const studentLiItems = document.getElementsByClassName('student-item');
let interimLst = [];


function start() {

    const searchD = document.createElement('div');
    const paginationD = document.createElement('div');
    const noResultsD = document.createElement('div');

    const paginationUL = document.createElement('ul');

    const inputField = document.createElement('input')
    const searchBtn = document.createElement('button');

    const pageNav = document.querySelector('.page').appendChild(paginationD);
    const search = document.querySelector('.page-header').appendChild(searchD);
    const noResults = document.querySelector('.student-list').appendChild(noResultsD);

    pageNav.className = 'pagination';

    pageNav.appendChild(paginationUL);

    search.appendChild(inputField);
    search.appendChild(searchBtn);

    search.className = 'student-search';
    inputField.placeholder = 'Search for students...';
    searchBtn.innerText = 'Search';

    noResultsD.innerText = 'No results found.';
    noResults.className = 'no-results';
    noResults.style.display = 'none';
}

//filter ten records 
function pagination(numberStudents) {
    const pageNav = document.querySelector('.pagination ul');
    let pages = Math.ceil(numberStudents / 10);
    let pageHTML = '';

    for (let i = 1; i <= pages; i++) {
        pageHTML += '<li>';
        if (i === 1) {
            pageHTML += '<a class=\"active\" href=\"#\">' + i + '</a>';
        } else {
            pageHTML += '<a href=\"#\">' + i + '</a>';
        }
        pageHTML += '</li>';
    }
    pageNav.innerHTML = pageHTML;
}

//show ten, omit rest <li> items
function showTen(page, viewStudents) {
    let numStudents = viewStudents.length;
    let studentEndLst = (page * 10) - 1;
    let studentBegLst = (page * 10) - 10;
    interimLst = viewStudents;

    for (let i = 0; i < numStudents; i++) {
        if (i <= studentEndLst && i >= studentBegLst) {
            interimLst[i].style.display = 'block';
        }
        else {
            interimLst[i].style.display = 'none';
        }
    }

}

function pageListener(action) {
    const btnLnk = document.querySelectorAll('.pagination ul li a');

    if (action.target.tagName === 'A') {
        for (let i = 0; i < btnLnk.length; i++) {
            if (btnLnk[i].innerText != action.target.innerText) {
                btnLnk[i].className = '';
            }
            else {
                action.target.className = 'active';
            }
        }
        showTen(parseInt(action.target.innerText), interimLst);
    }
}

//search for individual <li> record
function search() {
    let searchResults = [];
    let searchTerm = document.querySelector('.student-search input').value.toLowerCase();
    const noResult = document.querySelector('.no-results');


    for (let i = 0; i < studentLiItems.length; i++) {
        let studentItem = studentLiItems[i];
        let studentName = studentLiItems[i].firstElementChild.firstElementChild.nextElementSibling.innerText;
        let studentEmail = studentLiItems[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        studentLiItems[i].style.display = 'none';

        if (studentName.toLowerCase().indexOf(searchTerm) > - 1 || studentEmail.toLowerCase().indexOf(searchTerm) > - 1) {
            noResult.style.display = 'none';
            searchResults.push(studentItem);
        }

        if (searchResults.length === 0) {
            noResult.style.display = 'block';
        }
    }

    showTen(1, searchResults);
    pagination(searchResults.length);
}

start();
pagination(studentLiItems.length);
showTen(1, studentLiItems);

document.querySelector('.student-search input').addEventListener('keyup', search);
document.querySelector('.pagination').addEventListener('click', pageListener);