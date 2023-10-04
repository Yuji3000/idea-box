var newIdea = new Idea()
var allIdeas = []
var starredIdeas = []



var titleInput = document.querySelector('.input-title')
var bodyInput = document.querySelector('.input-body')
var saveBtn = document.querySelector('.save-button')
var deleteImage = document.querySelector('#delete-image')
var cardGrid = document.querySelector('.card-grid')
var star = document.querySelector('#star-icon')
var showStarredIdeasBtn = document.querySelector('.starred-ideas-btn')

saveBtn.disabled = true

saveBtn.addEventListener('click', (e) => {
  e.preventDefault()
  activateSaveBtn()
  createIdeaCard()
})

titleInput.addEventListener('keyup', activateSaveBtn)
bodyInput.addEventListener('keyup', activateSaveBtn)
showStarredIdeasBtn.addEventListener('click', createStarredIdeas)

cardGrid.addEventListener('click', (e) => {
  if (e.target.id === 'delete-image') { 
    deleteIdeaCard(allIdeas)
    deleteIdeaCard(starredIdeas)
    if (showStarredIdeasBtn.innerText == "Show All Ideas") {
      displayIdeas(starredIdeas)
    } else {
      displayIdeas(allIdeas)
    }
  } else if (e.target.id === 'star-icon') {
    changeFavoriteStatus(e)
    showStarredIdeas()
  }
});

function createStarredIdeas() {
  for(var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].starred == true && starredIdeas.includes(allIdeas[i]) == false) {
      starredIdeas.push(allIdeas[i])
    }
  }
  showStarredIdeas()
}

function showStarredIdeas() {
  if (event.target.innerText === "Show Starred Ideas"){
    event.target.innerText = "Show All Ideas"
    displayIdeas(starredIdeas)
  }
  else if (event.target.innerText = "Show All Ideas") {
      event.target.innerText = "Show Starred Ideas";
      displayIdeas(allIdeas)
    }
}

function changeFavoriteStatus(e) {
  var articleElement = e.target.closest('article');
  var ideaId = articleElement.getAttribute('card-id');
  for (var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].id == ideaId) {
      allIdeas[i].changeStatus();
    }
  }
};

function createIdeaCard() {
  let title = titleInput.value
  let body = bodyInput.value
  
  newIdea = new Idea(title, body)
  allIdeas.push(newIdea)
  displayIdeas(allIdeas)
}

function deleteIdeaCard(ideas) {
  var articleElement = event.target.closest('article');
  let deleteId = articleElement.getAttribute('card-id');
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id == deleteId) {
      ideas.splice(i, 1)
    }
  }
}

function displayIdeas(ideas) {
  const ideasHTML = ideas.map(idea => {
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
  }
}