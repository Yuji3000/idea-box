class Idea {
  constructor(titleInput, bodyInput) {
    this.id = Date.now();
    this.title = titleInput;
    this.body = bodyInput;
    this.starred = false;
    }
    changeStatus() {
      this.starred = !this.starred;
    } 
}