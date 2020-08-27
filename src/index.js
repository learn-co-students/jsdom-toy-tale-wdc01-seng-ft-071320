let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("div#toy-collection")
  const toyForm = document.querySelector("form.add-toy-form")
  const url = "http://localhost:3000/toys/"
  
  function addOneToy(toy){
    // Make card
    let divCard = document.createElement("div")
    divCard.className = "card"
  
    //create and h2 tag
    let hTag = document.createElement("h2")
    hTag.innerText = toy.name
    divCard.append(hTag)

    // Create image
    let imgTag = document.createElement("IMG")
    imgTag.src = toy.image
    imgTag.style = "width:200px;"
    imgTag.className = "toy-avatar"
    divCard.append(imgTag)

    // Create p tag
    let pTag = document.createElement("p")
    pTag.innerText = `${toy.likes} Likes`
    divCard.append(pTag)

    // Create button
    let likeBtn = document.createElement("button")
    likeBtn.className = "like-btn"
    likeBtn.innerText = "Like <3"
    divCard.append(likeBtn)

  
  likeBtn.addEventListener("click",() => {
    fetch(url + toy.id, {
      method:"PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        likes: toy.likes += 1
      })
    })
    .then(res => res.json())
    .then(function(updatedToy){
      toy = updatedToy; 
      pTag.innerText = `${toy.likes} Likes`
    })
  })
  // Add card to toy collection div
  toyCollectionDiv.append(divCard)
  }


  function appendToys(toys){
  for (const toy of toys){
    addOneToy(toy)
  }
}

  fetch(url)
    .then(res => res.json())
    .then(toys => appendToys(toys))
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
  toyForm.addEventListener("submit",(e) =>{
    e.preventDefault() //include parentheses
    
    let toyName = e.target[0].value
    let toyImage = e.target[1].value

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type":"application/json", 
        "Accept":"application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys", configObj)
    .then(res =>res.json())
    .then(toy => addOneToy(toy))
  })


});
