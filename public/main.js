var edit = document.getElementsByClassName("editBtn");
var trash = document.getElementsByClassName("delete-btn");
var btn = document.querySelector('button')

btn.addEventListener('click', () => {

})

Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        var id = element.parentNode.getAttribute('data-id')
        //creates the form element
        const form = document.createElement('form')
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':thumbUp
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
});

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
});
