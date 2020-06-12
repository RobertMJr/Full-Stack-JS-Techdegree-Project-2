/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// declaring global variables for later use: a student list and the amount of items from the list to show on a page
const studentList = document.querySelectorAll('.student-item');
const qtyPerPage = 10;


// showPage takes two arguments (list and page) and lists the items on the selected page
function showPage(list, page) {
   // set a start and end index based on the page number and the max amount of items we want to show on that page
   const startIndex = (page * qtyPerPage) - qtyPerPage;
   const endIndex = (page * qtyPerPage);
   // loop over all the items in the list, show only those that are between the start and end indexes, hide the rest of the items
   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}


// appendPageLinks generates and adds, based on a list of items, hyperlinks representing the page numbers, also provides functionality for the created links to allow navigation through the list items.
const appendPageLinks = (list) => {
   // numPages calculates how many pages are needed for displaying the list by dividing the total number of list items by the max number of items per page
   const numPages = Math.ceil(list.length / qtyPerPage);
   // selects the div with class 'page', creates a div, gives it a 'pagination' class and then adds it as the child of the 'page' div
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   // creates an ul element to later store the pagination links, appends the ul element as a child of the earlier created div with 'pagination' class
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);
   // loop through the numPages, create and add to the unordered list a 'li' element and an 'a' element that holds the page number to the 'li' for each page.
   for (let i = 1; i <= numPages; i += 1){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = `${i}`;
      // adding a href attribute to ensure the a element is a hyperlink
      a.href = '#';
      // adding the class name  'active' to the first pagination link
      if (i === 1){
         a.className = "active";
      }
      ul.appendChild(li);
      li.appendChild(a);
   }
   // adding an event listener on the created ul element leveraging event bubbling, when an 'a' element is clicked it will call the showPage() function to display the appropriare page based on the text content of the 'a' element
   ul.addEventListener('click', (e) => {
      const pageTo = e.target;
      const activeA = document.querySelectorAll('a.active');
      showPage(list, pageTo.textContent);
      // loops over all the pagination links and removes their 'active' class name property
      for (let i = 0; i < activeA.length; i += 1) {
         activeA[i].className = '';
      }
      // adds the 'active' class name property only to the 'a' element that was clicked
      pageTo.className = "active";
   })   
}
/* appendSearchBar creates and adds to the '.page-header' div another div with the class 'student-search' which will hold 3 newly created elements: a paragraph, a an input element and a button element.
   The paragraph element is used to display a message when a search result does not have anything to return
   The input element holds the value to search for in a list of items
   The button element is used to call the function that will search through the list of items
*/
function appendSearchBar () {
   const headerDiv =  document.querySelector('.page-header');
   const studentSearchDiv = document.createElement('div');
   studentSearchDiv.className = 'student-search';
   const input = document.createElement('input');
   // adding a placeholder atrribute to the input element to hint towards the expected values to be inserted in it
   input.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
   const paragraph = document.createElement('p');
   searchButton.textContent = 'Search';
   headerDiv.appendChild(studentSearchDiv);
   studentSearchDiv.appendChild(paragraph);
   studentSearchDiv.appendChild(input);
   studentSearchDiv.appendChild(searchButton);

}
// calling the functions to display the first page using the global variable stundentList, append the pagination links and the search bar
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchBar();

// select the input and button elements after they have been created by calling the appendSearchBar() function
const input = document.querySelector('input');
const button = document.querySelector('button');

/* searchStudent takes in a student parameter representing the student name to search for and searches for it in the studentsList that is provided as the second parameter 
   returns a list of items that contain the value of the student parameter
*/
function searchStudent (student, studentsList) {
   const newList = [];
   for (let i = 0; i < studentsList.length; i +=1 ){
      if (student.value.length !== 0 & studentsList[i].children[0].children[1].textContent.toLowerCase().includes(student.value.toLowerCase())) {
         newList.push(studentsList[i]);
      } else {
         studentsList[i].style.display = 'none';
      }
   }
   return newList;
} 

button.addEventListener('click', () => {
   const result = searchStudent(input, studentList);
   const pagination = document.querySelector('.pagination');
   const paragraph = document.querySelector('.student-search').firstChild;
   if (input.value === '') {
      showPage(studentList, 1);
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = '';
      appendPageLinks(studentList)
   } else if (result.length === 0) {
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = 'No results found';
   } else {
      showPage(result, 1);
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = '';
      appendPageLinks(result);
   }
})


input.addEventListener('keyup', () =>{
   const result = searchStudent(input, studentList);
   const pagination = document.querySelector('.pagination');
   const paragraph = document.querySelector('.student-search').firstChild;
   if (input.value === '') {
      showPage(studentList, 1);
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = '';
      appendPageLinks(studentList)
   } else if (result.length === 0) {
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = 'No results found';
   } else {
      showPage(result, 1);
      if (pagination) {
         pagination.remove();
      }
      paragraph.textContent = '';
      appendPageLinks(result);
   }
})

