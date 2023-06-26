
//Currently the only two global variables that hold character information. Likely we can use more for things like Monsters and location data
let fetchPlayer, playerCharacter;

//Handles the searchbar functionality

const charSearch = () => {
    const charSearchForm = document.getElementById("character-search")
    charSearchForm.addEventListener("submit", (e) => {
        e.preventDefault()

            const charSearchInput = document.getElementById("char-search").value

            console.log(charSearchInput)
            fetchChar(charSearchInput.toLowerCase()).then(() => {

                const listCharacter = document.getElementById("characters")
                listCharacter.innerHTML = ""

                const addChar = document.createElement("li")
                addChar.textContent = `${fetchPlayer.name}: Str(${fetchPlayer.str}), Dex(${fetchPlayer.dex}), Con(${fetchPlayer.con}), Wis(${fetchPlayer.wis}), Int(${fetchPlayer.int}), Cha(${fetchPlayer.cha})`

                const addConfirm = document.createElement("button")
                addConfirm.className = "btn btn-pushable btn-pushable--black"
                addConfirm.textContent = "Confirm Character?"
                addConfirm.style.width = "150px"
                addConfirm.style.height = "75px"
                addConfirm.addEventListener("click", () => {
                    generateCharacter(fetchPlayer)
                })
                listCharacter.append(addChar, addConfirm)
            })
        })
}
//Takes an object of character information, either from the db.json or from the (eventually) character creation section and adds their stats to the sidebar)
const generateCharacter = (pcInfo) => {

    playerCharacter = pcInfo

    const clearSearchBar = document.getElementById("top-bar")
    clearSearchBar.innerHTML = ""

    const startGame = document.createElement('h2')
    startGame.className = ".stat"
    startGame.textContent = "Good Luck!"

    clearSearchBar.append(startGame)

    const charName = document.getElementById("char-name")
    charName.textContent = playerCharacter.name

    const charHP = document.getElementById("health-number")
    charHP.textContent = `${playerCharacter.currentHp}/${playerCharacter.totalHp}`

    const charStr = document.getElementById("str")
    charStr.textContent = `STR: ${playerCharacter.str}`

    const charDex = document.getElementById("dex")
    charDex.textContent = `DEX: ${playerCharacter.dex}`

    const charCon = document.getElementById("con")
    charCon.textContent = `CON: ${playerCharacter.con}`

    const charWis = document.getElementById("wis")
    charWis.textContent = `WIS: ${playerCharacter.wis}`

    const charInt = document.getElementById("int")
    charInt.textContent = `INT: ${playerCharacter.int}`

    const charCha = document.getElementById("cha")
    charCha.textContent = `CHA: ${playerCharacter.cha}`
    
}
//Takes an input and fetches a character with a matching name; currently only used in charSearch() but could be used elsewhere
async function fetchChar(input) {

    const res = await fetch("http://localhost:3000/characters");

    const characters = await res.json();
    
    fetchPlayer = characters.find(character => character.name.toLowerCase() === input);

    if(fetchPlayer) {
        return fetchPlayer;
    } else {
        alert ('character not found')
    }
}







charSearch()