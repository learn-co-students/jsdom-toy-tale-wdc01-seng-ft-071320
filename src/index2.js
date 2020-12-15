fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(toys => displayAllToys(toys))

const toyCollectDiv = document.querySelector('#toy-collection')
const container = document.querySelector('div.container')

const displayAllToys = (toys) => {
    toys.forEach(toy => {
        displayToy(toy)
    })
}

const displayToy = (toy) => {
    let toyDiv = document.createElement('div')
    toyDiv.className = 'card'

    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image 

    let p = document.createElement('p')
    p.innerText = toy.likes 

    let btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.innerText = 'Like <3'
    btn.addEventListener('click', () => increaseLikes(p, toy) )

    toyDiv.append(h2, img, p, btn)
    toyCollectDiv.append(toyDiv)

}

// Add event listener to add new toy button 

let newToyBtn = document.getElementById('new-toy-btn')
newToyBtn.addEventListener('click', function(){
    container.style.display = 'block'
})

// Get form information and send post request 

let toyForm = document.querySelector('form.add-toy-form')
toyForm.addEventListener('submit', function(e){
    e.preventDefault()
    let toyName = e.target[0].value 
    let toyImage = e.target[1].value 

    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": toyName,
            "image": toyImage, 
            "likes": 0
          })
    }

    fetch('http://localhost:3000/toys', configObj)
    .then(res => res.json())
    .then(toy => displayToy(toy))

    e.target.reset()
    container.style.display = 'none'
})


//increase likes count

function increaseLikes(p, toy){
    
    p.innerText = toy.likes + 1

    let configObj = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify({
            "likes": toy.likes += 1
          })
    }

    fetch('http://localhost:3000/toys/' + toy.id, configObj)
    .then(res => res.json())
    .then(updatedToy => console.log(updatedToy))
}