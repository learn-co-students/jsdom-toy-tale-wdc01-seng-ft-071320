let addToy = false;

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
    })
  
  const divToys = document.querySelector('div#toy-collection')
  // get all the toys from server
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => showToys(toys))

  // iterate thru toys to get grab toy
  function showToys(toys) {
    toys.forEach(toy => addTheToy(toy))
  }
  // add toy at a time to browser
  function addTheToy(toy) {
    const div = document.createElement('div')
      div.className = "card"
    const h2 = document.createElement('h2')
      h2.innerText = toy.name 
    const img = document.createElement('img')
      img.src = toy.image 
      img.className = "toy-avatar"
    const p = document.createElement('p')
      p.innerText = toy.likes + " Likes"
    const likeBtn = document.createElement('button')
      likeBtn.className = "like-btn"
      likeBtn.innerText = "Like <3"

          likeBtn.addEventListener("click", (e) => {
            fetch(`http://localhost:3000/toys/${toy.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({
                likes: ++toy.likes
              })
            })
        
            .then(res => res.json())
            .then(updatedToy => {
              toy = updatedToy
              p.innerText = updatedToy.likes + " Likes"
            })
          })
    div.append(h2, img, p, likeBtn)
    divToys.append(div)
  }

  let form = document.querySelector('form.add-toy-form')
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let name = e.target[0].value
    let image = e.target[1].value
    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    })

    .then(res => res.json())
    .then(newtoy => {
      addTheToy(newtoy)
      form.reset()
    })
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })


})