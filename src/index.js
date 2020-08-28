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
  });

  url = "http://localhost:3000/toys/"
  const addToyForm = document.querySelector("form.add-toy-form");
  const div = document.querySelector("div#toy-collection");

  // Iterate through toys from url and add to div container using Add AToy func
  function addToys(toys) {
    toys.forEach( toy => addAToy(toy))
  }

  // add a specific toy to the container 
  function addAToy(toy) {
    let card = document.createElement('div')
    card.setAttribute("class", "card")
    let h2 = document.createElement("h2")
    let img = document.createElement("img")
    let p = document.createElement("p")
    let btn = document.createElement("button")
    h2.innerText = toy.name
    img.src = toy.image
    img.setAttribute("class", "toy-avatar")
    p.innerText = `${toy.likes} Likes`
    btn.setAttribute("class", "like-btn")
    btn.innerText = "Like <3"
    card.append(h2, img, p, btn)
    div.append(card)

    // Create Event listener for like button
    btn.addEventListener("click", () => {
      event.preventDefault();
      let config = {
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          likes: toy.likes + 1
        } )
      }
      fetch(url+toy.id, config)
      .then(resp => resp.json())
      .then(updatedToy => {
        toy = updatedToy
        p.innerText = `${updatedToy.likes} Likes`
      })
    })



  }
  // fetch toys and loadthem in div container using addToys Function
  fetch(url)
  .then(resp => resp.json())
  .then(toys => addToys(toys))



  // Event Listener to create card when you submit information
  addToyForm.addEventListener("submit", () => {
    event.preventDefault()
    let name = event.target[0].value;
    let image = event.target[1].value;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0
      })
    }

    fetch(url, config)
    .then(resp => resp.json())
    .then(newToy => {
      addAToy(newToy);

      addToyForm.reset();
      addToy = !addToy;

      addToy ? toyFormContainer.style.display = "block" : toyFormContainer.style.display = "none"
    })


  })
});
