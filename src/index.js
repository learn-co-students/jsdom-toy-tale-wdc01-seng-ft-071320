const url = 'http://localhost:3000/toys/';
const toyCollectionDiv = document.querySelector('div#toy-collection')
const newToyForm = document.querySelector('form.add-toy-form')
const toyFormContainer = document.querySelector(".container");
let addToy = false;

document.addEventListener("DOMContentLoaded", () => { //ONCE ALL THE CONTENTS ON THE DOM 
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  // const toyCollectionDiv = document.querySelector('div#toy-collection') //PUT ANYTHING YOU ARE SELECTING ON TOP OF YOUR CODE
  // const toyForm = document.querySelector('form.add-toy-form') // I am grabbing the form to add new toy

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"; //BLOCK IS FROM THE CSS FILE
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  });


  fetch(url)
  .then(res => res.json())
  //toyArray is whatever we are getting from .then in line 25.
  .then(toyArray => toyArray.forEach(toy => displayToy(toy)))

  function displayToy(toy){
    const div = document.createElement('div')
    div.className = 'card'
    toyCollectionDiv.append(div)

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'

    const p = document.createElement('p')
    p.innerText = toy.likes + ' likes'

    const btn = document.createElement('button')
    btn.innerText = 'Like <3'
    btn.className = 'like-btn'

    const delBtn = document.createElement('button')
    delBtn.innerText = 'delete'

    div.append(h2, img, p, btn, delBtn)

    delBtn.addEventListener('click', () => {
      fetch(url+toy.id, {
        method: 'DELETE'
      })
      .then(() => div.remove())
    })

    //adding functionality to the btn
    btn.addEventListener('click' , () => {
      newLikes = ++toy.likes
      //so we now have to send a patch request so our likes in json server are updated accordingly
      configObj = {
        method: 'PATCH', //in patch we are only adding what we are changing
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })

      }
      fetch(url+toy.id, configObj)
      .then(res => res.json())
      .then(updatedToy => p.innerText = updatedToy.likes + ' likes')
    })
}

newToyForm.addEventListener('submit', () => {
  event.preventDefault()
  nameInput = event.target[0].value
  imgInput = event.target[1].value
  configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
          Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": 0,
      name: nameInput,
      image: imgInput
    })
  }
  fetch(url, configObj)
  .then(res => res.json())
  .then(newToy => {displayToy(newToy) 
    newToyForm.reset()} ) //newToy needs to be called in the displayToy bc that's what I am creating

    addToy = false
    if (addToy) {
      toyFormContainer.style.display = "block"; //BLOCK IS FROM THE CSS FILE
    } else {
      toyFormContainer.style.display = "none";}

} )


  

  
  


























