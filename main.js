const quizz_URL = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
let victory_counter = 0;


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
function reveal_cards_value(e){
    console.log ("função reveal cards value sendo executada");
    let cards = e.parentNode.parentNode.querySelectorAll('.wrong');
        for (let i = 0; i< cards.length; i++){
        cards[i].classList.add("whitish")
    }
    let wrong_text = e.parentNode.parentNode.querySelectorAll('.wrong-text');
    for (let i = 0; i< wrong_text.length; i++){
        wrong_text[i].classList.add("reddish")
    }
    let right_text = e.parentNode.parentNode.querySelectorAll('.right-text');
    for (let i = 0; i< right_text.length; i++){
        right_text[i].classList.add("greenish")
    }
}
function disable_cards(e){
    console.log ("função disable cards sendo executada")
    let cards = e.parentNode.parentNode.querySelectorAll('.card');
    for (let i = 0; i< cards.length; i++){
        cards[i].onclick.disabled = true
    } 
    setTimeout(scroll_into_next_question, 2000)
}
function add_victory_counter(){
    console.log ("função add victory counter sendo executada");
    victory_counter = victory_counter + 1;
    console.log(victory_counter);
}
function scroll_into_next_question(){
    console.log ("função scroll into next question sendo executada");
}
function restart_quizz(){
    console.log('restart quizz')
}