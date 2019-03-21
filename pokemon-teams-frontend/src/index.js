const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainTag = document.querySelector('main')
const fetchData = () => {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
}

function renderTrainers(){
mainTag.innerHTML = ''
fetchData()
.then(data => {
  data.forEach(trainer => {
    mainTag.innerHTML +=
    `
    <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
      <button data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul id='${trainer.id}'></ul>
    </div>`
  })
})}
renderTrainers()

function renderPoke(){
  fetchData()
 .then(data => {
   data.forEach(trainer => {
     trainer.pokemons.forEach(poke => {
       let ulId = document.getElementById(`${trainer.id}`)
       ulId.innerHTML += `<li>${poke.nickname} (${poke.species})<button class="release" data-pokemon-id=${poke.id}>Release</button></li>`
     })
   })
 })}
renderPoke()

// let btnId = document.getElementById(`btn${trainer.id}`)
// const bttn = document.getElementsByTagName('button')
// if (bttn.innerText === 'Add Pokemon'){}
 let editPoke = document.addEventListener('click', (e => {
   let btnId = e.target.dataset.trainerId
   // console.log(btnId)
   console.log(e.target.dataset.pokemonId);
   if (e.target.innerHTML === 'Add Pokemon') {
     fetch(POKEMONS_URL,
       {
         method: "POST",
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           trainer_id: btnId
         })
       })
       renderTrainers()
       renderPoke()
   } else if( e.target.innerHTML === 'Release') {
     fetch(POKEMONS_URL + `/${e.target.dataset.pokemonId}`, {
       method: "DELETE"
     })
     renderTrainers()
     renderPoke()
   }
 }))

 let removePoke = document.querySelector('.release')
