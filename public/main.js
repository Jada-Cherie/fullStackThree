//went on youtube to try and figure out how to do an edit button

var edit = document.getElementsByClassName("editBtn")
var editButtons = document.querySelectorAll('.editBtn');
var trash = document.getElementsByClassName("delete-btn");
var btn = document.querySelector('button')

btn.addEventListener('click', () => {

})

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(e){
    const _id = e.target.dataset.id
    fetch('studylogs', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
})



// Add event listeners to each edit button
editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the ID of the study log from the button's data attribute
    const studyLogId = button.getAttribute('data-id');

    // Get the table row for the study log
    const studyLogRow = button.closest('tr');

    // Create a new form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `/studylogs/${studyLogId}?_method=PUT`;

    // Create a label and input for the date
    const dateLabel = document.createElement('label');
    dateLabel.for = 'date-input';
    dateLabel.textContent = 'Date:';
    form.appendChild(dateLabel);
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date-input';
    dateInput.name = 'date';
    dateInput.value = studyLogRow.querySelector('td:nth-child(1)').textContent;
    dateInput.required = true;
    form.appendChild(dateInput);

    // Create a label and input for the subject
    const subjectLabel = document.createElement('label');
    subjectLabel.for = 'subject-input';
    subjectLabel.textContent = 'Subject:';
    form.appendChild(subjectLabel);
    const subjectInput = document.createElement('input');
    subjectInput.type = 'text';
    subjectInput.id = 'subject-input';
    subjectInput.name = 'subject';
    subjectInput.value = studyLogRow.querySelector('td:nth-child(2)').textContent;
    subjectInput.required = true;
    form.appendChild(subjectInput);

    // Create a label and input for the time
    const timeLabel = document.createElement('label');
    timeLabel.for = 'time-input';
    timeLabel.textContent = 'Time (in minutes):';
    form.appendChild(timeLabel);
    const timeInput = document.createElement('input');
    timeInput.type = 'number';
    timeInput.id = 'time-input';
    timeInput.name = 'time';
    timeInput.value = studyLogRow.querySelector('td:nth-child(3)').textContent;
    timeInput.required = true;
    form.appendChild(timeInput);

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Save Changes';
    form.appendChild(submitButton);

    // Replace the table row with the form
    studyLogRow.parentNode.replaceChild(form, studyLogRow);
  });
});





// Array.from(edit).forEach(function(element) {
//       element.addEventListener('click', function(){
//         var id = element.parentNode.getAttribute('data-id')
//         //creates the form element
//         const form = document.createElement('form')

//         //makes the text input for the date
//         const dateInput = document.createElement('input')
//         dateInput.type = 'date'
//         dateInput.value = this.parentNode.parentNode.childNodes[1].innerText
//         dateInput.id = 'date-input'
//         dateInput.name = 'date'
//         dateInput.required = true
//         form.appendChild(dateInput)

//         //makes the text input for subject
//         const subjectInput = document.createElement('input')
//         subjectInput.type =  'text'
//         subjectInput.value = this.parentNode.parentNode.childNodes[4].innerText
//         subjectInput.name = 'subj'
//         subjectInput.id = 'subj-input'
//         subjectInput.required =true
//         subjectInput.placeholder = 'Enter Subject'
//         form.appendChild(subjectInput)

//         //makes the text input for time
//         const timeInput = document.createElement('input')
//         timeInput.type = 'number'
//         timeInput.id = 'time-input'
//         timeInput.name = 'time'
//         timeInput.required = true
//         timeInput.value = this.parentNode.parentNode.childNodes[7].innerText

//         console.log(this.parentNode.parentNode.childNodes[7].innerText, '1', this.parentNode.parentNode.childNodes[7], '2')
//         form.appendChild(timeInput);

//         // Create a submit button
//         const submitButton = document.createElement('button');
//         submitButton.type = 'submit';
//         submitButton.innerText = 'Update';
//         submitButton.classList.add('btn-default')
//         submitButton.setAttribute('data-id', id) 
//         form.appendChild(submitButton);

//         // Insert the form after the edit icon's parent element
//         const message = element.parentNode;
//         message.insertBefore(form, message.childNodes[3]);

//         // Add a submit event listener to the form
//         form.addEventListener('submit', (event) => {
//           // Prevent the form from submitting
//           event.preventDefault();
//           // Get the updated values from the form
//           const date = document.querySelector('#date-input').value;
//           const subj = document.querySelector('#subj-input').value;
//           const time = document.querySelector('#time-input').value
//           const id2 = event.target.parentNode.getAttribute('data-id');

//           console.log(id2)


//         fetch(`/studylogs/${id2}`, {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'date': date,
//             'subj': subj,
//             'time':time
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });

//       form.remove()
// });


// })

