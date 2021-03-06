const BODYADDRESS = document.querySelector("body");
var reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/
let quizzesArray = [];
let myQuizzesExistence = false;
let myQuizzTemplate = {
    title: "",
    image: "",
    questions: [],
    levels: []
};

function getInputValue(inputAddress) {
    inputValue = document.querySelector(`${inputAddress}`);
    return inputValue;
}

function initiateApp() {
    const quizzesArrayRequisition = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    quizzesArrayRequisition.then(treatSuccess);
    quizzesArrayRequisition.catch(function (answer) {
        const statusCode = answer.response.status;
        console.log(statusCode);
    });
}

function treatSuccess(answer) {
    let quizzesArrayAux = answer.data;
    let myQuizzID = "";
    let myQuizzesExistenceAux = false;

    for (let i = 0; i < quizzesArrayAux.length; i++) {
        myQuizzID = localStorage.getItem(quizzesArrayAux[i].id.toString());
        if(myQuizzID !== null) {
            myQuizzesExistenceAux = true;
        }
    }

    setQuizzesArray(quizzesArrayAux, myQuizzesExistenceAux);
}

function setQuizzesArray(quizzesArrayAux, myQuizzesExistenceAux) {
    quizzesArray = quizzesArrayAux;
    myQuizzesExistence = myQuizzesExistenceAux;
    
    setTimeout(renderizeAllQuizzes, 3000);
}

function renderizeAllQuizzes() {
    displayNewScreen("homePageTemplate");

    let allQuizzesSpaceQuizzesListAddress = document.querySelector(".all-quizzes-space .quizzes-list");
    let myQuizzesSpaceQuizzesListAddress = document.querySelector(".my-quizzes-space .quizzes-list");
    let myQuizzesSpaceQuizzesTitleBoxAdress = document.querySelector(".my-quizzes-space .quizzes-title-box");
    let myQuizzID = "";

    if(myQuizzesExistence == false) {
        const myQuizzesSpaceEmptyBoxAdress = document.querySelector(".my-quizzes-space-empty-box");
        myQuizzesSpaceEmptyBoxAdress.classList.remove("hidden");
    } else {
        myQuizzesSpaceQuizzesTitleBoxAdress.classList.remove("hidden");
        myQuizzesSpaceQuizzesListAddress.classList.remove("hidden")
    }

    for (let i = 0; i < quizzesArray.length; i++) {
        myQuizzID = localStorage.getItem(quizzesArray[i].id.toString());
        if(myQuizzID !== null) {
            myQuizzesSpaceQuizzesListAddress.innerHTML += `
                <li class="quizz-box" onclick="setTestObject(quizzesArray[${i}])" data-identifier="quizz-card">
                    <img src="${quizzesArray[i].image}" class="quizz-box-img">
                    <div class="quizz-box-filter"></div>
                    <h1>${quizzesArray[i].title}</h1>
                </li>`;
        } else {
            allQuizzesSpaceQuizzesListAddress.innerHTML += `
                <li class="quizz-box" onclick="setTestObject(quizzesArray[${i}])" data-identifier="quizz-card">
                    <img src="${quizzesArray[i].image}" class="quizz-box-img">
                    <div class="quizz-box-filter"></div>
                    <h1>${quizzesArray[i].title}</h1>
                </li>`;
        }
    }
}

function displayNewScreen(screenOption) {
    switch(screenOption) {
        case "quizzCreatorTemplatePage1":
            BODYADDRESS.innerHTML = `
                <header>
                    <h1>BuzzQuizz</h1>
                </header>
                <div class="quizz-info-title">
                    <h1>Comece pelo come??o</h1>
                </div>
                <div class="quizz-info">
                    <input id = "my-quizz-title" type="text" placeholder="T??tulo do seu quizz">
                    <input id = "my-quizz-image-URL" type="text" placeholder="URL da imagem do seu quizz">
                    <input id = "my-quizz-questions-number" type="text" placeholder="Quantidade de perguntas do quizz">
                    <input id = "my-quizz-levels-number" type="text" placeholder="Quantidade de n??veis do quizz">
                </div>
                <button onclick="renderizeQuizzCreator2()" class="red-button"><h1>Prosseguir pra criar perguntas<h1></button>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="main.js"></script>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            `;
            break;

        case "quizzCreatorTemplatePage2":
            BODYADDRESS.innerHTML = `
                <header>
                    <h1>BuzzQuizz</h1>
                </header>
                <div class="quizz-info-title">
                    <h1>Crie suas perguntas</h1>
                </div>
                <div class="question-box opened" data-identifier="question">
                </div>
                <button onclick="renderizeQuizzCreator3()" class="red-button"><h1>Prosseguir pra criar n??veis<h1></button>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="main.js"></script>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            `;
            break;
        
        case "quizzCreatorTemplatePage3":
            BODYADDRESS.innerHTML = `
                <header>
                <h1>BuzzQuizz</h1>
                </header>
                <div class="quizz-info-title">
                    <h1>Agora, decida os n??veis!</h1>
                </div>
                <div class="level-box opened" data-identifier="level">
                </div>
                <button onclick="renderize1QuizzCreator4()" class="red-button"><h1>Finalizar Quizz<h1></button>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="main.js"></script>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>            
            `;
            break;

        case "quizzCreatorTemplatePage4":
            BODYADDRESS.innerHTML = `
                <header>
                <h1>BuzzQuizz</h1>
                </header>
                <div class="quizz-info-title">
                    <h1>Seu quizz est?? pronto!</h1>
                </div>
                <button onclick="setTestObject(quizzesArray[50])" class="red-button margin-bottom-0 red-button-final-creation-page"><h1>Acessar Quizz<h1></button>
                <a onclick="window.location.reload()" class="home-on-click">Voltar pra home</a>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="main.js"></script>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>            
            `;
            break;

        case "homePageTemplate":
            BODYADDRESS.innerHTML = `
                <header>
                    <h1>BuzzQuizz</h1>
                </header>
                <main>
                <section class="my-quizzes-space" data-identifier="user-quizzes">
                    <div class="quizzes-title-box hidden">
                        <h1>Seus Quizzes</h1>
                        <ion-icon onclick="renderizeQuizzCreator1()" data-identifier="create-quizz" name="add-circle" class="plus-symbol"></ion-icon>
                    </div>
                    <ul class="quizzes-list hidden">
                    </ul>
                    <div class="my-quizzes-space-empty-box hidden">  
                        <h1>Voc?? n??o criou nenhum quizz ainda :(</h1>
                        <button onclick="renderizeQuizzCreator1()" data-identifier="create-quizz" class="create-quizz">Criar Quizz</button>
                    </div>
                </section>
                <section class="all-quizzes-space" data-identifier="general-quizzes">
                    <div class="quizzes-title-box">
                        <h1>Todos os Quizzes</h1>
                    </div>
                    <ul class="quizzes-list">
                    </ul>
                </section>
                </main>
            `;
            break;

        default:
            BODYADDRESS.innerHTML = `
                <header>
                    <h1>BuzzQuizz</h1>
                </header>
                <div class="loading-conteiner">
                    <img src="img/Loading_gif.gif" class="loading-gif">
                </div>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="main.js"></script>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            `;
            break;
    }
}

function renderizeQuizzCreator1() {
    resetMyQuizzTemplate();
    BODYADDRESS.classList.add("quizz-creation-body");
    displayNewScreen("quizzCreatorTemplatePage1");
}

function renderizeQuizzCreator2() {
    const inputsAddress = document.querySelectorAll("input");

    if(inputsAddress[0].value.length < 20 || inputsAddress[0].value.length > 65) {
        alert("O t??tulo do seu Quizz deve ter no m??nimo 20 caracteres e no m??ximo 65!");
        return;
    } else {
        myQuizzTemplate.title = inputsAddress[0].value;
    }
    if(reg.test(inputsAddress[1].value) == false) {
        alert("URL inv??lido!");
        return;
    } else {
        myQuizzTemplate.image = inputsAddress[1].value;
    }
    if(inputsAddress[2].value < 3) {
        alert("O seu Quizz deve ter pelo menos 3 perguntas!");
        return;
    } else {
        for(let i=0; i<inputsAddress[2].value; i++) {
            myQuizzTemplate.questions.push({
                title: "",
                color: "",
                answers: [{
                    text: "",
                    image: "",
                    isCorrectAnswer: true
                }, {
                    text: "",
                    image: "",
                    isCorrectAnswer: false
                }]
            });
        }
    }
    if(inputsAddress[3].value < 2) {
        alert("O seu Quizz deve ter pelo menos 2 n??veis!");
        return;
    } else {
        for(i=0; i<inputsAddress[3].value; i++) {
            myQuizzTemplate.levels.push({
                title: "",
                image: "",
                text: "",
                minValue: 0
            });
        }
    }

    displayNewScreen("quizzCreatorTemplatePage2");

    let questionBoxAddress = document.querySelector(".question-box");
    questionBoxAddress.innerHTML = `
        <h2>Pergunta 1</h2>
        <ion-icon onclick="openQuestionBoxTab(this)" name="create-outline" class="edit-icon hidden" data-identifier="expand"></ion-icon>
        <input id = "question-text" type="text" placeholder="Texto da pergunta">
        <input id = "question-background" type="text" placeholder="Cor de fundo da pergunta">
        <h3>Resposta correta</h3>
        <input id = "question-right-answer" type="text" placeholder="Resposta correta">
        <input id = "question-right-image" type="text" placeholder="URL da imagem">
        <h3>Respostas incorretas</h3>
        <input id = "question-wrong-answer1" type="text" placeholder="Resposta incorreta 1">
        <input id = "question-wrong-answer1-URL" type="text" placeholder="URL da imagem 1">
        <input id = "question-wrong-answer2" type="text" placeholder="Resposta incorreta 2">
        <input id = "question-wrong-answer2-URL" type="text" placeholder="URL da imagem 2">
        <input id = "question-wrong-answer3" type="text" placeholder="Resposta incorreta 3">
        <input id = "question-wrong-answer3-URL" type="text" placeholder="URL da imagem 3">
    `;

    for(i=(parseInt(inputsAddress[2].value)-1); i>0; i--) {
        questionBoxAddress.insertAdjacentHTML('afterend', `
            <div class="question-box tab" data-identifier="question">
                <h2>Pergunta ${i+1}</h2>
                <ion-icon onclick="openQuestionBoxTab(this)" name="create-outline" class="edit-icon" data-identifier="expand"></ion-icon>
                <input id = "question-text" type="text" placeholder="Texto da pergunta" class="hidden">
                <input id = "question-background" type="text" placeholder="Cor de fundo da pergunta" class="hidden">
                <h3 class="hidden">Resposta correta</h3>
                <input id = "question-right-answer" type="text" placeholder="Resposta correta" class="hidden">
                <input id = "question-right-image" type="text" placeholder="URL da imagem" class="hidden">
                <h3 class="hidden">Respostas incorretas</h3>
                <input id = "question-wrong-answer1" type="text" placeholder="Resposta incorreta 1" class="hidden">
                <input id = "question-wrong-answer1-URL" type="text" placeholder="URL da imagem 1" class="hidden">
                <input id = "question-wrong-answer2" type="text" placeholder="Resposta incorreta 2" class="hidden">
                <input id = "question-wrong-answer2-URL" type="text" placeholder="URL da imagem 2" class="hidden">
                <input id = "question-wrong-answer3" type="text" placeholder="Resposta incorreta 3" class="hidden">
                <input id = "question-wrong-answer3-URL" type="text" placeholder="URL da imagem 3" class="hidden">
            </div>
        `);
    }

}

function resetMyQuizzTemplate() {
    myQuizzTemplate = {
        title: "",
        image: "",
        questions: [],
        levels: []
    };
}

function openQuestionBoxTab(clickedIcon) {
    const openedQuestionBoxAdress = document.querySelector(".opened");
    openedQuestionBoxAdress.classList.add("tab");
    const openedQuestionBoxChild = document.querySelector(".opened").children;
    for(let i=0; i<14; i++) {
        openedQuestionBoxChild[i].classList.add("hidden");
    }
    const openedH2Address = document.querySelector(".opened h2");
    openedH2Address.classList.remove("hidden");
    const openedIconAddress = document.querySelector(".opened ion-icon");
    openedIconAddress.classList.remove("hidden");
    openedQuestionBoxAdress.classList.remove("opened");
    const clickedTab = clickedIcon.parentNode;
    clickedTab.classList.remove("tab");
    clickedIcon.classList.add("hidden");
    clickedTabChild = clickedTab.children;
    clickedTabChild[0].classList.add("hidden");
    for(i=0; i<14; i++) {
        clickedTabChild[i].classList.remove("hidden");
    }
    clickedIcon.classList.add("hidden");
    clickedTab.classList.add("opened");
    clickedTab.scrollIntoView({behavior: 'smooth'});
}

function openLevelBoxTab(clickedIcon) {
    const openedLevelBoxAdress = document.querySelector(".opened");
    openedLevelBoxAdress.classList.add("tab");
    const openedLevelBoxChild = document.querySelector(".opened").children;
    for(let i=0; i<6; i++) {
        openedLevelBoxChild[i].classList.add("hidden");
    }
    const openedH2Address = document.querySelector(".opened h2");
    openedH2Address.classList.remove("hidden");
    const openedIconAddress = document.querySelector(".opened ion-icon");
    openedIconAddress.classList.remove("hidden");
    openedLevelBoxAdress.classList.remove("opened");
    const clickedTab = clickedIcon.parentNode;
    clickedTab.classList.remove("tab");
    clickedIcon.classList.add("hidden");
    clickedTabChild = clickedTab.children;
    clickedTabChild[0].classList.add("hidden");
    for(i=0; i<6; i++) {
        clickedTabChild[i].classList.remove("hidden");
    }
    clickedIcon.classList.add("hidden");
    clickedTab.classList.add("opened");
    clickedTab.scrollIntoView({behavior: 'smooth'});
}

function renderizeQuizzCreator3() {
    let questionBoxesAddress = document.querySelectorAll(".question-box");

    for(let i=0; i<questionBoxesAddress.length; i++) {
        if(questionBoxesAddress[i].children[2].value.length < 20) {
            alert(`O texto da pergunta ${i+1} ?? obrigat??rio e deve ter no m??nimo 20 caracteres!`);
            return;
        } else {
            myQuizzTemplate.questions[i].title = questionBoxesAddress[i].children[2].value;
        }
        if(questionBoxesAddress[i].children[3].value.length == 0 || questionBoxesAddress[i].children[3].value[0] !== '#' || questionBoxesAddress[i].children[3].value.length !== 7) {
            alert(`A cor de fundo da pergunta ${i+1} n??o ?? v??lida!`);
            return;
        } else {
            myQuizzTemplate.questions[i].color = questionBoxesAddress[i].children[3].value;
        }
        if(questionBoxesAddress[i].children[5].value.length == 0) {
            alert(`A pergunta ${i+1} deve ter pelo menos 1 resposta correta!`);
            return;
        } else {
            myQuizzTemplate.questions[i].answers[0].text = questionBoxesAddress[i].children[5].value;
        }
        if(questionBoxesAddress[i].children[6].value.length == 0 || reg.test(questionBoxesAddress[i].children[6].value) == false) {
            alert(`O URL da imagem da resposta correta da pergunta ${i+1} ?? inv??lido!`);
            return;
        } else {
            myQuizzTemplate.questions[i].answers[0].image = questionBoxesAddress[i].children[6].value;
        }
        if(questionBoxesAddress[i].children[8].value.length == 0) {
            alert(`A pergunta ${i+1} deve ter pelo menos 1 resposta errada!`);
            return;
        } else {
            myQuizzTemplate.questions[i].answers[1].text = questionBoxesAddress[i].children[8].value;
        }
        if(reg.test(questionBoxesAddress[i].children[9].value) == false) {
            alert(`O URL da imagem da resposta errada 1 da pergunta ${i+1} ?? inv??lido!`);
            return;
        } else {
            myQuizzTemplate.questions[i].answers[1].image = questionBoxesAddress[i].children[9].value;
        }
        if(questionBoxesAddress[i].children[10].value.length !== 0) {
            if(questionBoxesAddress[i].children[11].value == null || reg.test(questionBoxesAddress[i].children[11].value) == false) {
                alert(`O URL da imagem da resposta errada 2 da pergunta ${i+1} ?? inv??lido!`);
                return;
            } else {
                myQuizzTemplate.questions[i].answers.push({
                    text: questionBoxesAddress[i].children[10].value,
                    image: questionBoxesAddress[i].children[11].value,
                    isCorrectAnswer: false
                });
            }
        }
        if(questionBoxesAddress[i].children[12].value.length !== 0) {
            if(questionBoxesAddress[i].children[13].value == null || reg.test(questionBoxesAddress[i].children[13].value) == false) {
                alert(`O URL da resposta errada 3 da pergunta ${i+1} ?? inv??lido!`);
                return;
            } else {
                myQuizzTemplate.questions[i].answers.push({
                    text: questionBoxesAddress[i].children[12].value,
                    image: questionBoxesAddress[i].children[13].value,
                    isCorrectAnswer: false
                });
            }
        }
    }

    displayNewScreen("quizzCreatorTemplatePage3");

    let levelBoxAddress = document.querySelector(".level-box");
    levelBoxAddress.innerHTML = `
        <h2>N??vel 1</h2>
        <ion-icon onclick="openLevelBoxTab(this)" name="create-outline" class="edit-icon hidden" data-identifier="expand"></ion-icon>
        <input type="text" placeholder="T??tulo do n??vel">
        <input type="text" placeholder="% de acerto m??nima">
        <input type="text" placeholder="URL da imagem do n??vel">
        <input id = "question-right-image" type="text" placeholder="Descri????o do n??vel" class="description">
    `;

    for(i=(myQuizzTemplate.levels.length-1); i>0; i--) {
        levelBoxAddress.insertAdjacentHTML('afterend', `
            <div class="level-box tab" data-identifier="level">
                <h2>N??vel ${i+1}</h2>
                <ion-icon onclick="openLevelBoxTab(this)" name="create-outline" class="edit-icon" data-identifier="expand"></ion-icon>
                <input type="text" placeholder="T??tulo do n??vel" class="hidden">
                <input type="text" placeholder="% de acerto m??nima" class="hidden">
                <input type="text" placeholder="URL da imagem do n??vel" class="hidden">
                <input id = "question-right-image" type="text" placeholder="Descri????o do n??vel" class="description hidden">
            </div>
        `);
    }
    levelBoxAddress.scrollIntoView({behavior: 'smooth'});
}

function renderize1QuizzCreator4() {
    let levelBoxesAddress = document.querySelectorAll(".level-box");

    for(let i=0; i<levelBoxesAddress.length; i++) {
        if(levelBoxesAddress[i].children[2].value.length == 0) {
            alert(`O t??tulo do n??vel ${i+1} ?? obrigat??rio!`);
            return;
        } else {
            myQuizzTemplate.levels[i].title = levelBoxesAddress[i].children[2].value;
        }
        if(levelBoxesAddress[i].children[3].value.length == 0) {
            alert(`A porcentagem m??nima do n??vel ${i+1} ?? obrigat??ria!`);
            return;
        } else {
            myQuizzTemplate.levels[i].minValue = levelBoxesAddress[i].children[3].value;
        }
        if(levelBoxesAddress[i].children[4].value.length == 0 || reg.test(levelBoxesAddress[i].children[4].value) == false) {
            alert(`O URL da imagem do n??vel ${i+1} ?? inv??lido!`);
            return;
        } else {
            myQuizzTemplate.levels[i].image = levelBoxesAddress[i].children[4].value;
        }
        if(levelBoxesAddress[i].children[5].value.length == 0) {
            alert(`A descri????o do n??vel ${i+1} obrigat??ria!`);
            return;
        } else {
            myQuizzTemplate.levels[i].text = levelBoxesAddress[i].children[5].value;
        }
    }
    BODYADDRESS.classList.remove("quizz-creation-body");

    displayNewScreen();

    const quizzCreationRequisition = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", myQuizzTemplate);
    quizzCreationRequisition.then(treatQuizzCreationSuccess);
    quizzCreationRequisition.catch(function (answer) {
        const statusCode = answer.response.status;
        console.log(statusCode);
    });
}

function treatQuizzCreationSuccess(answer) {
    const myQuizzObject = answer.data;
    console.log(myQuizzObject.id);
    localStorage.setItem(myQuizzObject.id.toString(), 'confirmed');
    
    pushIntoQuizzesArray(myQuizzObject);
}

function pushIntoQuizzesArray(myQuizzObject) {
    quizzesArray.push(myQuizzObject);

    setTimeout(renderize2QuizzCreator4, 2000);
}

function renderize2QuizzCreator4() {
    BODYADDRESS.classList.add("quizz-creation-body");
    displayNewScreen("quizzCreatorTemplatePage4");

    let quizzInfoTitleAddress = document.querySelector(".quizz-info-title");
    quizzInfoTitleAddress.insertAdjacentHTML('afterend', `
        <li class="quizz-box margin-bottom-0" onclick="setTestObject(quizzesArray[50])">
            <img src="${quizzesArray[50].image}" class="quizz-box-img">
            <div class="quizz-box-filter"></div>
            <h1>${quizzesArray[50].title}</h1>
        </li>
    `);
}

initiateApp();
/*
function setLocalStorage() {
    const obj = {
        id: 1,
        title: "Acerte os personagens corretos dos Simpsons e prove seu amor!",
        image: "https://lumiere-a.akamaihd.net/v1/images/original_1628718691_los-simpson---star_-_3_e73a2761.jpeg?region=0,379,1300,732&width=960"
    }

    const string1 = JSON.stringify(obj);
    localStorage.setItem("1", string1);
}

setLocalStorage();
*/

const quizzURL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victoryCounter = 0;
let errorCounter = 0;
let percentualScore = 0;
let testObject = {};

function setTestObject(quizzObject) {
    testObject = quizzObject;
    getObjectReturnVisual();
}
/*
let testObject =
{
    id: 1,
    title: "T??tulo do quizz",
    image: "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2010/11/Hogwarts.jpeg",
    questions: [
        {
            title: "T??tulo da pergunta 1",
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
            title: "T??tulo da pergunta 2",
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
            title: "T??tulo da pergunta 3",
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
            title: "VOC?? FOI MTO MAL",
            image: "https://http.cat/411.jpg",
            text: "Descri????o do n??vel 1",
            minValue: 0
        },
        {
            title: "VOC?? FOI MEDIO",
            image: "https://http.cat/412.jpg",
            text: "Descri????o do n??vel 2",
            minValue: 50
        },
        {
            title: "voc?? foi muito bem",
            image: "https://http.cat/413.jpg",
            text: "Descri????o do n??vel 3",
            minValue: 70
        }
    ]
}*/
function createQuizz() {
    console.log("fun????o create quizz sendo executada")
}
function hideMainScreen() {
    console.log("fun????o hideMainScreen sendo executada")
    let main = document.querySelector('.main');
    main.classList.add("hidden");
}
function displayQuizzScreen() {
    console.log("fun????o displayQuizz sendo executada")
    let quizzScreen = document.querySelector('.quizz-screen');
    quizzScreen.classList.remove("hidden");
}
function revealCardsValue(e) {
    console.log("fun????o reveal cards value sendo executada");
    let cards = e.parentNode.parentNode.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.add("whitish")
    }
    e.classList.remove("whitish");
    console.log('OLHE AQUI: ' + e.parentNode.parentNode)
    
    let text = e.parentNode.parentNode.querySelectorAll('.quizz-option-description');
        for (let i = 0; i < text.length; i++) {
            console.log(text)
            if (text[i].parentNode.querySelector('.hidden').innerHTML === 'false'){text[i].classList.add("reddish")
            } else {text[i].classList.add("greenish")}
    }
}
function disableCards(e) {
    console.log("fun????o disable cards sendo executada")
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
    console.log("fun????o add victory counter sendo executada");
    victoryCounter = victoryCounter + 1;
    console.log("Acertos: " + victoryCounter + " Erros: " + errorCounter);
    checkForVictory();
}
function addErrorCounter() {
    console.log("fun????o add error counter sendo executada");
    errorCounter = errorCounter + 1;
    console.log("Acertos: " + victoryCounter + " Erros: " + errorCounter);
    checkForVictory();
}
function checkForVictory() {
    if (errorCounter + victoryCounter == testObject.questions.length) {
        setTimeout (displayScore, 2000);
        setTimeout (scrollToBottom, 2001)
    } else {return}
}
function scrollIntoNextQuestion() {
    let positionCounter = victoryCounter + errorCounter;
    let questionsBoxArr = document.querySelectorAll('.quizz-question');
    console.log(questionsBoxArr)
    questionsBoxArr[positionCounter].scrollIntoView();
}
function displayScore() {
    let questionsArr = document.querySelectorAll('.quizz-question');
    console.log(questionsArr);
    let questionsNumber = questionsArr.length;
    console.log("Voc?? acertou " + victoryCounter + " perguntas de " + questionsNumber);
    percentualScore = (victoryCounter * 100) / questionsNumber;
    percentualScore = Math.ceil(percentualScore);
    displayQuizzResult();
}
function scrollToBottom(){
    window.scrollTo(0,100000)
}
function displayQuizzResult(){
    let reversedLevels = testObject.levels.reverse()
    for (let i = 0; i < testObject.levels.length; i++){
        if (reversedLevels[i].minValue <= percentualScore){
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
    window.scrollTo(0,0);
    let main1 = document.querySelector('body');
    main1.innerHTML = ``
    getObjectReturnVisual();
}
function proceedIntoQuizzCreationPage2() {
    console.log('fun????o proceedIntoQuizzCreationPage2() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.remove('hidden');
}
function proceedIntoQuizzCreationPage3() {
    console.log('fun????o proceedIntoQuizzCreationPage3() sendo executada')
    document.querySelector('.quizz-info-1').classList.add('hidden');
    document.querySelector('.quizz-info-2').classList.add('hidden');
    document.querySelector('.quizz-info-3').classList.remove('hidden');
}
function finishQuizzCreation() {
    alert('fun????o finishQuizzCreation sendo executada')
    createQuizzApi();
}
function createQuizzApi() {
    console.log('creating quizz API');
}
function getObjectReturnVisual() {
    let main1 = document.querySelector('body');
    main1.innerHTML = `
    <header>
            <h1>BuzzQuizz</h1>
    </header>
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
                </div>
            </div>`
                let answerArr = testObject.questions[i].answers.sort((a,b) => 0.5-Math.random())
                for (let j=0; j<answerArr.length; j++){
                    let questionBoxArr = document.querySelectorAll('.quizz-options-container');
                    let answerBox = questionBoxArr[i].querySelector('.quizz-container-lower');
                    answerBox.innerHTML = answerBox.innerHTML +
                    `
                    <div class="quizz-option">
                        <div class="quizz-option-image card" onclick="revealCardsValue(this), addCounter(this),disableCards(this)" style="background-image: url('${answerArr[j].image}');">

                            <p class = 'hidden'>${answerArr[j].isCorrectAnswer}</p>
                        </div>

                        <div class="quizz-option-description">
                            <h2>${answerArr[j].text}</h2>
                        </div>
                    </div>
                    `
                }
        }
}