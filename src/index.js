let addToy = false;
let url = "http://localhost:3000/toys/"
const divAllToys = document.querySelector('div#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

getAllToys()

function getAllToys(){
  fetch(url)
  .then(resp => resp.json())
  .then(toyArray => toyArray.forEach(toy => displayToy(toy)))
}

function displayToy(toy){
  const divCard = document.createElement('div')
  divCard.className = "card"
  divAllToys.append(divCard)
    const h2Tag = document.createElement('h2')
    h2Tag.innerText = toy.name
    divCard.append(h2Tag)
      const imgTag = document.createElement('img')
      imgTag.src = toy.image
      imgTag.setAttribute("class", "toy-avatar")
      divCard.append(imgTag)
        const pTag = document.createElement('p')
        pTag.innerText = `${toy.likes} Likes`
        divCard.append(pTag)
          const btn = document.createElement('button')
          btn.className = 'like-btn'
          btn.innerText = "Like"
          divCard.append(btn)
    
            btn.addEventListener("click", () => {
              const newLikeCount = toy.likes + 1
              const confObj = {
                  method: "PATCH",
                  headers: {"Content-Type": "application/json",
                            "Accept": "application/json"},
                  body: JSON.stringify({likes: newLikeCount})}
            
              fetch(url+toy.id, confObj)
              .then(res => res.json())
              .then(updatedToy => {
                toy = updatedToy
                pTag.innerText = `${updatedToy.likes} Likes`
              })
                })
  }




const form = document.querySelector('form')

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let name = e.target[0].value
  let image = e.target[1].value
  const newToy = {
    name: name,
    image: image
  }
  let configObj = {
    method: "POST",
    headers: {"Content-Type": "application/json",
              "Accept": "application/json"},
    body: JSON.stringify(newToy)
  }
  fetch(url, configObj)
  .then(resp => resp.json())
  .then(toy => {
    displayToy(toy)
  })
  e.target.reset()
})

