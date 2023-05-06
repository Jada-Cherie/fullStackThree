var edit = document.querySelectorAll('.fa-pencil')
var save = document.querySelectorAll('.ph-upload-simple')
var trash = document.getElementsByClassName("fa-trash");
// var editInput = document.querySelectorAll(".editEntry")
// var inputEntry = document.querySelector("#entry")
//////////////////////Dates///////////////////////////
var editDateInput = document.querySelectorAll(".editDate")
var dateEntry = document.querySelector("#date")
///////////////////Subject/////////////////////////
var editSubjInput = document.querySelectorAll(".editSubject")
var subjectEntry = document.querySelector("#subj")
//////////////////////Time///////////////////////////
var editTimeInput = document.querySelectorAll(".editTime")
var timeEntry = document.querySelector("#time")

var btn = document.querySelector('button')

btn.addEventListener('click', () => {

})

Array.from(save).forEach(function (element) {
  element.addEventListener('click', function () {
    const date = this.parentNode.parentNode.childNodes[7].value
    const subject = this.parentNode.parentNode.childNodes[9].value
    const time = this.parentNode.parentNode.childNodes[11].value
    console.log(date, subject, time)
    console.log(this.dataset.id)
    fetch('/updateStudylogs', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        subject,
        time,
        id: this.dataset.id
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        
        // window.location.reload(true)
        const date = this.parentNode.parentNode.childNodes[1]
        date.innerText = data.value.date
        const subject = this.parentNode.parentNode.childNodes[3]
        subject.innerText = data.value.subject
        const time = this.parentNode.parentNode.childNodes[5]
        time.innerText = data.value.time
        const cloud = this.parentNode
        const pencil = this.parentNode.parentNode.childNodes[13]
        const editDateInput = this.parentNode.parentNode.childNodes[7]
        const editSubjInput = this.parentNode.parentNode.childNodes[9]
        const editTimeInput = this.parentNode.parentNode.childNodes[11]
        pencil.classList.remove('hide')
        date.classList.remove('hide')
        subject.classList.remove('hide')
        time.classList.remove('hide')
        cloud.classList.add('hide')
        editDateInput.classList.add('hide')
        editSubjInput.classList.add('hide')
        editTimeInput.classList.add('hide')
      })
  });
});

Array.from(edit).forEach(function (element) {
  element.addEventListener('click', function () {
    const date = this.parentNode.parentNode.childNodes[1]
    const subject = this.parentNode.parentNode.childNodes[3]
    const time = this.parentNode.parentNode.childNodes[5]

    const pencil = this.parentNode
    const cloud = this.parentNode.parentNode.childNodes[15]

    const editDateInput = this.parentNode.parentNode.childNodes[7]
    const editSubjInput = this.parentNode.parentNode.childNodes[9]
    const editTimeInput = this.parentNode.parentNode.childNodes[11]

    pencil.classList.add('hide')
    date.classList.add('hide')
    subject.classList.add('hide')
    time.classList.add('hide')
    cloud.classList.remove('hide')
    editDateInput.classList.remove('hide')
    editSubjInput.classList.remove('hide')
    editTimeInput.classList.remove('hide')
    console.log(this.dataset)
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(e){
    const _id = e.target.dataset.id
        console.log(_id)
    fetch('/studylogs', {
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




