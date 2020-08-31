let addToy = false

document.addEventListener("DOMContentLoaded", () => 
{
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  const  toyForm = document.querySelector("form.add-toy-form")
  addBtn.addEventListener("click", () => 
  {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) 
    {
      toyFormContainer.style.display = "block"
    } 
    else 
    {
      toyFormContainer.style.display = "none"
    }
  })

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => renderToys(toys))
  function renderToys(toys)
  {
    toys.forEach(toy => 
    {
      let toyDiv = document.createElement('div')
      toyDiv.className = 'card'
      let toyH2 = document.createElement('h2')
      let toyImg = document.createElement('img')
      toyImg.className = "toy-avatar"
      let toyP = document.createElement('p')
      let toyButton = document.createElement('button') 
      toyButton.className = "like-btn"
      
      toyH2.innerText = toy.name
      toyP.innerText = toy.likes + " Likes"
      toyImg.src = toy.image
      
      toyButton.innerText = "Like"
      toyButton.addEventListener("click",() =>
      {
        fetch ("http://localhost:3000/toys/${toy.id}", 
        {
          method: PATCH
          headers: 
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify
          ({
            likes: toy.likes + 1
          })
        })
        .then(res=> res.json)
        .then(updatedToy => 
          {
            toy = updatedToy
            p.innerText = updatedToy.likes " Likes"
          })
      })
        
        toyDiv.append(toyH2,toyP,toyButton,toyImg) 
        let toysDiv = document.querySelector('div#toy-collection')
        toysDiv.append(toyDiv)
    }) 
  }

    toyForm.addEventListener("submit", () =>
    {
      event.preventDefault()
      let name = e.target[0].value
      let image = e.target[1].value
      
      fetch ("http://localhost:3000/toys", 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json"
          "Accept": "application/json"
        },
        body: JSON.stringify
          ({
            name,
            image,
            likes: 0
          })
      })
      .then (res => res.json())
      .then (newToy => 
      {
        renderToys(newToy)
        // reset form 
        toyForm.reset()
        // close form
        addToy = !addToy
        if (addToy) {
          toyFormContainer.style.display = "block"
        } else {
          toyFormContainer.style.display = "none"
        }
      })
    })
  })
  
  
  
  