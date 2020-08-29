# Toy Tale

You've got a friend in need! Your friend Andy recently misplaced all their toys!
Help Andy recover their toys and get the toys back in the toy collection.

## Create Your Server

All of the toy data is stored in the `db.json` file. You'll want to access this
data using a JSON server. In order to do this, run the following two commands:

   * `npm install -g json-server`
   * `json-server --watch db.json`
   
This will create a server storing all of our lost toy data with restful routes
at `http://localhost:3000/toys`. You can also check out
`http://localhost:3000/toys/:id`

## Fetch Andy's Toys

On the `index.html` page, there is a `div` with the `id` "toy-collection."

When the page loads, make a 'GET' request to fetch all the toy objects. With the
response data, make a `<div class="card">` for each toy and add it to the
toy-collection `div`. [CREATE IT FOR EACH TOY][WE NEED TO GO TO 3000/TOYS TO FETCH ALL THE TOYS]

## Add Toy Info to the Card

Each card should have the following child elements:

  * `h2` tag with the toy's name
  * `img` tag with the `src` of the toy's image attribute and the class name "toy-avatar"
  * `p` tag with how many likes that toy has
  * `button` tag with a class "like-btn"

After all of that, the toy card should resemble:

```html
  <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
```

## Add a New Toy

* When a user submits the toy form, a `POST` request is sent to `http://localhost:3000/toys` and the new toy is added to Andy's Toy Collection.
* The toy should conditionally render to the page.
* In order to send a POST request via Fetch, give the Fetch a second argument of an object. This object should specify the method as `POST` and also provide the appropriate headers and the JSON-ified data for the request. If your request isn't working, make sure your header and keys match the documentation.

```
POST http://localhost:3000/toys
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
})
```

* For examples, refer to the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).

## Increase Toy's Likes

When a user clicks on a toy's like button, two things should happen:

  * Conditional increase to the toy's like count without reloading the page
  * A patch request sent to the server at `http://localhost:3000/toys/:id` updating the number of likes that the specific toy has
  * Headers and body are provided below (If your request isn't working, make sure your header and keys match the documentation.)
  
```
PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "likes": <new number>
})
```

  //   // ## Fetch Andy's Toys
//   //getting all the toys from server
//   fetch('http://localhost:3000/toys')
//   .then(res => res.json())
//   .then(toys => displayToys(toys))

//   //array iteration
//   function displayToys(toys){
//     toys.forEach(toy => appendToy(toy))
//   }
//    //single toy
//   function appendToy(toy){
//     console.log(toy)
  
// // I AM PUTTING ALL THE INFO OF THE TOY UNDER APPENDTOY FUNCTION BC IT'S FOR EACH TOY
//   //Add Toy Info to the Card
//   // <div class="card">
//   //   <h2>Woody</h2>
//   //   <img src=toy_image_url class="toy-avatar" />
//   //   <p>4 Likes </p>
//   //   <button class="like-btn">Like <3</button>
//   // </div>

//   const div = document.createElement('div');
//    div.className = 'card'

//    const h2 = document.createElement('h2');
//     h2.innerText = toy.name

//     const img = document.createElement('img');
//     img.src = toy.image
//     img.className = 'toy-avatar'

//     const p = document.createElement('p');
//     p.innerText = toy.likes + ' Likes' //this line will give me 4 likes/ I put space so it will give space

//     const btn = document.createElement('button');
//     btn.className = 'like-btn'
//     btn.innerText = 'Like <3'

// // adding functionality to the likes button
//     btn.addEventListener('click', () => {
//       fetch('http://localhost:3000/toys/${toy.id}',{
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },

//       body: JSON.stringify({
//         likes: ++toy.likes //toy.likes = toy.likes + 1 //toy.likes++ will increment the likes will still return the current value instead use ++i
//       })
//     })
//       .then(res =res.json ())
//       .then(console.log)
//     })
  


//     div.append(h2, img, p, btn) //ONLY USE APPEND. Appendchild will only append one node at a time. Append can accept anything. 

//     toyCollectionDiv.append(div)} //On the `index.html` page, there is a `div` with the `id` "toy-collection."

//     //Add a New Toy

//     toyForm.addEventListener('submit', () => { 
//       event.preventDefault()

//       let name = event.target[0].value
//       let image = event.target[1].value

//       fetch('http://localhost:3000/toys', {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//         body: JSON.stringify({
//         name: name,
//         image: image,
//         likes: 0
//       })
//     })
    

//       .then(res =res.json()) //DOM manipulation
//       .then(newToy => {
//         //add a new toy on DOM
//         appendToy(newToy)
//         //  //clear form
//         // toyForm.reset()

//     })
//   })
  
  


// });

