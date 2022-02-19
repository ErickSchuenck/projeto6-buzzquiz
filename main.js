const quizzURL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victoryCounter = 0;
let errorCounter = 0;
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
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
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
    let wrongText = e.parentNode.parentNode.querySelectorAll('.wrong-text');
    for (let i = 0; i < wrongText.length; i++) {
        wrongText[i].classList.add("reddish")
    }
    let rightText = e.parentNode.parentNode.querySelectorAll('.right-text');
    for (let i = 0; i < rightText.length; i++) {
        rightText[i].classList.add("greenish")
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
    console.log(verification);
    if (verification.value == true) {addVictoryCounter}
    else {addErrorCounter};
}
function addVictoryCounter() {
    console.log("função add victory counter sendo executada");
    victoryCounter = victoryCounter + 1;
    console.log("Acertos: " + victoryCounter);
    checkForVictory();
}
function addErrorCounter() {
    console.log("função add error counter sendo executada");
    errorCounter = errorCounter + 1;
    console.log("Erros: " + errorCounter);
    checkForVictory();
}
function checkForVictory() {
    if (errorCounter + victoryCounter == testObject.questions.length) {
        displayScore();
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
    let percentualScore = (victoryCounter * 100) / questionsNumber;
    percentualScore = Math.ceil(percentualScore);
    alert("Você acertou " + percentualScore + "% das questões");
}
function restartQuizz() {
    victoryCounter = 0;
    errorCounter = 0;
    console.log('restart quizz')
    let cards = document.querySelectorAll('.wrong');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.remove("whitish")
    }
    let wrongText = document.querySelectorAll('.wrong-text');
    for (let i = 0; i < wrongText.length; i++) {
        wrongText[i].classList.remove("reddish")
    }
    let rightText = document.querySelectorAll('.right-text');
    for (let i = 0; i < rightText.length; i++) {
        rightText[i].classList.remove("greenish")
    }
    cards[0].scrollIntoView();
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
    console.log(testObject);
    console.log(testObject.title);
    let main1 = document.querySelector('body');
    
    let main2;
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
            `
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
                    `
                }
        }
}
