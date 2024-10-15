const questions = [
    {
        question: "What is the extension of java code files?",
        answers: [
            {text: ".js", correct: false},
            {text: ".class", correct: false},
            {text: ".py", correct: false},
            {text: ".java", correct: true}
        ]
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        answers: [
            {text: "Polymorphism", correct: false},
            {text: "Inheritance", correct: false},
            {text: "Compilation", correct: true},
            {text: "Encapsulation", correct: false}
        ]
    },
    {
        question: "Which of these are selection statements in Java?",
        answers: [
            {text: "if()", correct: true},
            {text: "continue", correct: false},
            {text: "for()", correct: false},
            {text: "break", correct: false}
        ]
    },
    {
        question: "Which of these keywords is used to define interfaces in Java?",
        answers: [
            {text: "intf", correct: false},
            {text: "interface", correct: true},
            {text: "IntF", correct: false},
            {text: "Interface", correct: false}
        ]
    },
    {
        question: "Which one of the following is not an access modifier?",
        answers: [
            {text: "protected", correct: false},
            {text: "public", correct: false},
            {text: "void", correct: true},
            {text: "private", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 

    currentQuestion.answers.forEach(ans=>{
        const btn = document.createElement("button");
        btn.innerHTML = ans.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);

        if(ans.correct){   // add all answers on buttons...
            btn.dataset.correct = ans.correct;
        }
        btn.addEventListener("click", selectAnswer);
    })
}

function resetState(){  
    nextBtn.style.display = "none";

    while(answerBtn.firstChild){ // remove previous(html) attributes...
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; // set remains button are disable...
    })
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})



startQuiz();


