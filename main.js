const quizzURL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victoryCounter = 0;


function createQuizz(){
    console.log("função create quizz sendo executada")
}
function hideMainScreen(){
    console.log("função hideMainScreen sendo executada")
    let main = document.querySelector('.main');
    main.classList.add("hidden");
}
function displayQuizzScreen(){
    console.log("função displayQuizz sendo executada")
    let quizzScreen = document.querySelector('.quizz-screen');
    quizzScreen.classList.remove("hidden");
}
function revealCardsValue(e){
    console.log ("função reveal cards value sendo executada");
    let cards = e.parentNode.parentNode.querySelectorAll('.wrong');
        for (let i = 0; i< cards.length; i++){
        cards[i].classList.add("whitish")
    }
    let wrongText = e.parentNode.parentNode.querySelectorAll('.wrong-text');
    for (let i = 0; i< wrongText.length; i++){
        wrongText[i].classList.add("reddish")
    }
    let rightText = e.parentNode.parentNode.querySelectorAll('.right-text');
    for (let i = 0; i< rightText.length; i++){
        rightText[i].classList.add("greenish")
    }
}
function disableCards(e){
    console.log ("função disable cards sendo executada")
    let cards = e.parentNode.parentNode.querySelectorAll('.card');
    for (let i = 0; i< cards.length; i++){
        cards[i].onclick.disabled = true
    } 
    setTimeout(scrollIntoNextQuestion, 2000)
}
function addVictoryCounter(){
    console.log ("função add victory counter sendo executada");
    victoryCounter = victoryCounter + 1;
    console.log(victoryCounter);
}
function scrollIntoNextQuestion(){
    console.log ("função scroll into next question sendo executada");
}
function restartQuizz(){
    console.log('restart quizz')
}