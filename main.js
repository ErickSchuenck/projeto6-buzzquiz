const quizz_URL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
console.log(quizz_URL);

function create_quizz(){
    console.log("função create-quizz sendo executada")
}
function hide_main_screen(){
    console.log("função hide_main_screen sendo executada")
    let main = document.querySelector('.main');
    main.classList.add("hidden");
}
function display_quizz_screen(){
    console.log("função display_quizz sendo executada")
    let quizz_screen = document.querySelector('.quizz-screen');
    quizz_screen.classList.remove("hidden");
}