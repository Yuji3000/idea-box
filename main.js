var newIdea = new Idea()
var allIdeas = []



var titleInput = document.querySelector('.input-title')
var bodyInput = document.querySelector('.input-body')
var saveBtn = document.querySelector('.save-button')
var deleteImage = document.querySelector('#delete-image')
var cardGrid = document.querySelector('.card-grid')
var star = document.querySelector('#star-icon')

saveBtn.disabled = true

saveBtn.addEventListener('click', (event) => {
  event.preventDefault()
  activateSaveBtn()
  createIdeaCard()
})

titleInput.addEventListener('keyup', activateSaveBtn)
bodyInput.addEventListener('keyup', activateSaveBtn)
// star.addEventListener('click', changeFavoriteStatus)

cardGrid.addEventListener('click', (event) => {
  if (event.target.id === 'delete-image') { 
    deleteIdeaCard(event)
    displayAllIdeas()
  } else if (event.target.id === 'star-icon') {
    changeFavoriteStatus(event)
  }
});
//functions

function changeFavoriteStatus(event) {
  var articleElement = event.target.closest('article');
  var ideaId = articleElement.getAttribute('card-id');
  for (var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].id == ideaId) {
      allIdeas[i].changeStatus();
    }
  }
  displayAllIdeas()
};

function createIdeaCard() {
  let title = titleInput.value
  let body = bodyInput.value
  
  newIdea = new Idea(title, body)
  allIdeas.push(newIdea)
  displayAllIdeas()
}

function deleteIdeaCard(event) {
  var articleElement = event.target.closest('article');
  var deleteId = articleElement.getAttribute('card-id');
  for (var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].id == deleteId) {
      allIdeas.splice(i, 1)
    }
  }
}

function displayAllIdeas() {
  const ideasHTML = allIdeas.map(idea => {
    return `
    <article class="idea-card" card-id=${idea.id}>
      <div class="toolbar-images">
        <img class="small-images star" src="${starImageSwitch(idea)}" id="star-icon">
        <img class="small-images delete" src="./assets/delete-image.svg" id="delete-image">
      </div>
      <div class="idea-title-body">
        <h2 class="idea-title">${idea.title}</h2>
        <h4 class="idea-body">${idea.body}</h4>
      </div>
    </article>
    `
  }) 
  document.querySelector('.card-grid').innerHTML = ideasHTML.join('')
  resetInputValues()
}

function starImageSwitch(idea) {
  if (idea.starred == true) {
    return "./assets/star-active.svg"
  } else {
    return "./assets/star.svg"
  }
}

function resetInputValues() {
  titleInput.value = ''
  bodyInput.value = ''
}

function activateSaveBtn() {
  if (titleInput.value == "" || bodyInput.value == "") {
    saveBtn.disabled = true
  } else if (titleInput.value && bodyInput.value ) {
    saveBtn.disabled = false
  };
}