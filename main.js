const quizzURL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victoryCounter = 0;
let errorCounter = 0;


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
        cards[i].classList.add('disabled')
    } 
    setTimeout(scrollIntoNextQuestion, 2000)
}
function addVictoryCounter(){
    console.log ("função add victory counter sendo executada");
    victoryCounter = victoryCounter + 1;
    console.log("Acertos: " + victoryCounter);
    checkForVictory();
}
function addErrorCounter(){
    console.log ("função add error counter sendo executada");
    errorCounter = errorCounter + 1;
    console.log("Erros: " + errorCounter);
    checkForVictory();
}
function checkForVictory(){
    let questionsArr = document.querySelectorAll('.quizz-question');
    let questionsNumber = questionsArr.length;
    if (errorCounter + victoryCounter == questionsNumber){
        displayScore();
    } 
}
function scrollIntoNextQuestion(){
    console.log ("função scroll into next question sendo executada");
}
function displayScore(){
    let questionsArr = document.querySelectorAll('.quizz-question');
    console.log(questionsArr);
    let questionsNumber = questionsArr.length;
    console.log("Você acertou " + victoryCounter + " perguntas de " + questionsNumber);
    let percentualScore = (victoryCounter * 100) / questionsNumber;
    percentualScore = Math.ceil(percentualScore);
    alert("Você acertou " + percentualScore + "% das questões");
}
function restartQuizz(){
    victoryCounter = 0;
    errorCounter = 0;
    console.log('restart quizz')
    let cards = document.querySelectorAll('.wrong');
        for (let i = 0; i< cards.length; i++){
        cards[i].classList.remove("whitish")
    }
    let wrongText = document.querySelectorAll('.wrong-text');
    for (let i = 0; i< wrongText.length; i++){
        wrongText[i].classList.remove("reddish")
    }
    let rightText = document.querySelectorAll('.right-text');
    for (let i = 0; i< rightText.length; i++){
        rightText[i].classList.remove("greenish")
    }
    cards[0].scrollIntoView();
}
function proceedIntoQuizzCreationPage2(){
    console.log('função proceedIntoQuizzCreationPage2() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.remove('hidden');
}
function proceedIntoQuizzCreationPage3(){
    console.log('função proceedIntoQuizzCreationPage3() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.add('hidden');
    document.querySelector('.quizz-info-3').classList.remove('hidden');
}
function finishQuizzCreation(){
    alert('função finishQuizzCreation sendo executada')
    createQuizzApi();
}
function createQuizzApi(){
    console.log('creating quizz API');
}