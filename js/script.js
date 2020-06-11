/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelectorAll('.student-item');
const qtyPerPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, page) {
   const startIndex = (page * qtyPerPage) - qtyPerPage;
   const endIndex = (page * qtyPerPage);
   for (let i = 0; i < list.length; i += 1) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   
   // 1. Detetmine how many pages are needed for the list by dividing the total number of list items by the max number of items per page
   const numPages = Math.ceil(list.length / qtyPerPage);
   // 2. Create a div, give it the 'pagination' class, and append it to the .page div
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);

   // 3. Add a ul to the 'pagination' div to store the pagination links
   const ul = document.createElement('ul');
   paginationDiv.appendChild(ul);
   // 4. for every page, add li and a tags with the page number text
   for (let i = 1; i <= numPages; i += 1){
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = `${i}`;
      a.href = '#';
      if (i === 1){
         a.className = "active";
      }
      ul.appendChild(li);
      li.appendChild(a);
   }
   // 5. Add an event listener to each a tag. When they are clicked call the showPage function to display the appropriate page
   ul.addEventListener('click', (e) => {
      const pageTo = e.target;
      const activeA = document.querySelectorAll('a.active');
      showPage(list, pageTo.textContent);
      // 6. Loop over the pagiantion links to remove active class from all links
      for (let i = 0; i < activeA.length; i += 1) {
         activeA[i].className = '';
      }
      // 7. Add the active class to the link we just clicked. You can identify that clicked link using event.target
      pageTo.className = "active";
   })   
}

function appendSearchBar () {
   const headerDiv =  document.querySelector('.page-header');
   const studentSearchDiv = document.createElement('div');
   studentSearchDiv.className = 'student-search';
   const input = document.createElement('input');
   input.placeholder = 'Search for students...';
   const searchButton = document.createElement('button');
   searchButton.textContent = 'Search';
   headerDiv.appendChild(studentSearchDiv);
   studentSearchDiv.appendChild(input);
   studentSearchDiv.appendChild(searchButton);

}

showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchBar();

const input = document.querySelector('input');
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

input.addEventListener('keyup', (e) =>{
   const result = searchStudent(e.target, studentList);
   if (result.length === 0) {
      showPage(studentList, 1);
   } else{
      showPage(result, 1);
      const pagination = document.querySelector('.pagination');
      pagination.remove();
      appendPageLinks(result);
   }
})

/*
   const newList = [];
   for (let i = 0; i < studentList.length; i+= 1){
      if (input.value.length !== 0 & studentList[i].children[0].children[1].textContent.toLowerCase().includes(input.value.toLowerCase())) {
         newList.push(studentList[i]);
      } else {
         studentList[i].style.display = 'none';
      }
      
   }*/

// showPage(newList, 1);
// Remember to delete the comments that came with this file, and replace them with your own code comments.