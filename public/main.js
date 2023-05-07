//went on youtube to try and figure out how to do an edit button

var edit = document.getElementsByClassName("editBtn");
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

Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        var id = element.parentNode.getAttribute('data-id')
        //creates the form element
        const form = document.createElement('form')

        //makes the text input for the date
        const dateInput = document.createElement('input')
        dateInput.type = 'date'
        dateInput.value = this.parentNode.parentNode.childNodes[1].innerText
        dateInput.id = 'date-input'
        dateInput.name = 'date'
        dateInput.required = true
        form.appendChild(dateInput)

        //makes the text input for subject
        const subjectInput = document.createElement('input')
        subjectInput.type =  'text'
        subjectInput.value = this.parentNode.parentNode.childNodes[4].innerText
        subjectInput.name = 'subj'
        subjectInput.id = 'subj-input'
        subjectInput.required =true
        subjectInput.placeholder = 'Enter Subject'
        form.appendChild(subjectInput)

        //makes the text input for time
        const timeInput = document.createElement('input')
        timeInput.type = 'number'
        timeInput.id = 'time-input'
        timeInput.name = 'time'
        timeInput.required = true
        timeInput.value = this.parentNode.parentNode.childNodes[7].innerText

        console.log(this.parentNode.parentNode.childNodes[7].innerText, '1', this.parentNode.parentNode.childNodes[7], '2')
        form.appendChild(timeInput);

        // Create a submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Update';
        submitButton.classList.add('btn-default')
        submitButton.setAttribute('data-id', id) 
        form.appendChild(submitButton);

        // Insert the form after the edit icon's parent element
        const message = element.parentNode;
        message.insertBefore(form, message.childNodes[3]);

        // Add a submit event listener to the form
        form.addEventListener('submit', (event) => {
          // Prevent the form from submitting
          event.preventDefault();
          // Get the updated values from the form
          const date = document.querySelector('#date-input').value;
          const subj = document.querySelector('#subj-input').value;
          const time = document.querySelector('#time-input').value
          const id2 = event.target.parentNode.getAttribute('data-id');

          console.log(id2)


        fetch(`/studylogs/${id2}`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'date': date,
            'subj': subj,
            'time':time
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });

      form.remove()
});


})

