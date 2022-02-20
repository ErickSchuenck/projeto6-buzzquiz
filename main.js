const quizzURL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victoryCounter = 0;
let errorCounter = 0;
let percentualScore = 0;
let testObject =
{
    id: 1,
    title: "Título do quizz",
    image: "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2010/11/Hogwarts.jpeg",
    questions: [
        {
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Texto da resposta 3",
                    image: "https://http.cat/413.jpg",
                    isCorrectAnswer: false
                },
                {
                    text: "Texto da resposta 4",
                    image: "https://http.cat/414.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 2",
            color: "red",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 3",
            color: "green",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [
        {
            title: "VOCÊ FOI MTO MAL",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "VOCÊ FOI MEDIO",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        },
        {
            title: "você foi muito bem",
            image: "https://http.cat/413.jpg",
            text: "Descrição do nível 3",
            minValue: 70
        }
    ]
}


function createQuizz() {
    console.log("função create quizz sendo executada")
}
function hideMainScreen() {
    console.log("função hideMainScreen sendo executada")
    let main = document.querySelector('.main');
    main.classList.add("hidden");
}
function displayQuizzScreen() {
    console.log("função displayQuizz sendo executada")
    let quizzScreen = document.querySelector('.quizz-screen');
    quizzScreen.classList.remove("hidden");
}
function revealCardsValue(e) {
    console.log("função reveal cards value sendo executada");
    let cards = e.parentNode.parentNode.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("whitish")
    }
    e.classList.remove("whitish");
    console.log('OLHE AQUI: ' + e.parentNode.parentNode)
    let text = e.parentNode.parentNode.querySelectorAll('.quizz-option-description');
        for (let i = 0; i < text.length; i++) {
            if (e.querySelector('.hidden').innerHTML == 'false'){text[i].classList.add("reddish")
            } else {text[i].classList.add("greenish")}
    }
}
function disableCards(e) {
    console.log("função disable cards sendo executada")
    let cards = e.parentNode.parentNode.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add('disabled')
    }
    setTimeout(scrollIntoNextQuestion, 2000)
}
function addCounter(e){
    console.log('adding counter...')
    let verification = e.querySelector('.hidden');
    console.log(verification.innerHTML);
    if (verification.innerHTML == 'true') {addVictoryCounter()}
    else {addErrorCounter()};
}
function addVictoryCounter() {
    console.log("função add victory counter sendo executada");
    victoryCounter = victoryCounter + 1;
    console.log("Acertos: " + victoryCounter + " Erros: " + errorCounter);
    checkForVictory();
}
function addErrorCounter() {
    console.log("função add error counter sendo executada");
    errorCounter = errorCounter + 1;
    console.log("Acertos: " + victoryCounter + " Erros: " + errorCounter);
    checkForVictory();
}
function checkForVictory() {
    if (errorCounter + victoryCounter == testObject.questions.length) {
        setTimeout (displayScore, 2000);
    } else {return}
}
function scrollIntoNextQuestion() {
    console.log("função scroll into next question sendo executada");
}
function displayScore() {
    let questionsArr = document.querySelectorAll('.quizz-question');
    console.log(questionsArr);
    let questionsNumber = questionsArr.length;
    console.log("Você acertou " + victoryCounter + " perguntas de " + questionsNumber);
    percentualScore = (victoryCounter * 100) / questionsNumber;
    percentualScore = Math.ceil(percentualScore);
    displayQuizzResult();
}
function displayQuizzResult(){
    let reversedLevels = testObject.levels.reverse()
    for (let i = 0; i < testObject.levels.length; i++){
        if (reversedLevels[i].minValue < percentualScore){
            let quizzResult = document.querySelector('body');
            console.log(quizzResult);
            quizzResult.innerHTML = quizzResult.innerHTML +
                `
            <div class="quizz-result">
                <div class="quizz-result-header">
                    <h1>${percentualScore}% de acerto: ${testObject.levels[i].title}</h1>
                </div>
                <div class="quizz-result-image" style="background-image: url(${testObject.levels[i].image});"></div>
                <div class="quizz-result-text">
                    <h1>${testObject.levels[i].text}</h1>
                </div>
                <button class="restart-button" onclick="restartQuizz()">
                    <h1>Reiniciar Quizz</h1>
                </button>
                <button class="return-home" onclick="returnHome()">
                    <h1>Voltar pra home</h1>
                </button>
            </div>
            `
            break;
        }
    }
}
function returnHome(){
    window.location.reload();
}
function restartQuizz() {
    victoryCounter = 0;
    errorCounter = 0;
    console.log('restart quizz')
    window.scrollTo(0,0);
}
function proceedIntoQuizzCreationPage2() {
    console.log('função proceedIntoQuizzCreationPage2() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.remove('hidden');
}
function proceedIntoQuizzCreationPage3() {
    console.log('função proceedIntoQuizzCreationPage3() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.add('hidden');
    document.querySelector('.quizz-info-3').classList.remove('hidden');
}
function finishQuizzCreation() {
    alert('função finishQuizzCreation sendo executada')
    createQuizzApi();
}
function createQuizzApi() {
    console.log('creating quizz API');
}
function getObjectReturnVisual() {
    let main1 = document.querySelector('body');
    main1.innerHTML = `
    <div class="header">
            <h1>BuzzQuizz</h1>
    </div>
    <div class="quizz-screen">
    <div class="quizz-header" style="background-image: url('${testObject.image}');">
            <div class="black-filter">
                <h1>${testObject.title}</h1>
            </div>
    </div>
    `
        for (let i=0; i< testObject.questions.length; i++){
            main1.innerHTML = main1.innerHTML + 
            `<div class = "content">
                <div class="quizz-options-container">
                    <div class="quizz-question" style="background-color:${testObject.questions[i].color};">
                        <h1>${testObject.questions[i].title}</h1>
                    </div> 
                    <div class="quizz-container-lower"></div>
                </div>`
                for (let j=0; j<testObject.questions[i].answers.length; j++){
                    let questionBoxArr = document.querySelectorAll('.quizz-options-container');
                    let answerBox = questionBoxArr[i].querySelector('.quizz-container-lower');
                    answerBox.innerHTML = answerBox.innerHTML +
                    `
                    <div class="quizz-option">
                        <div class="quizz-option-image card" onclick="revealCardsValue(this), addCounter(this),disableCards(this)" style="background-image: url('${testObject.questions[i].answers[j].image}');">

                            <p class = 'hidden'>${testObject.questions[i].answers[j].isCorrectAnswer}</p>
                        </div>

                        <div class="quizz-option-description">
                            <h2>${testObject.questions[i].answers[j].text}</h2>
                        </div>
                    </div>
                    
            </div>`
                }
        }
}
