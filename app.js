/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable strict */

const store = {
  questions: [
    {
      // eslint-disable-next-line quotes
      question: "Who is the actor who plays the role of Joker in the movie 'Joker'?",
      answers: [
        '1. Joaquin Phoenix',
        '2. Robert De Niro',
        '3. Anthony Hopkins',
        '4. Brad Pitt'
      ],
      correctAnswer: '1. Joaquin Phoenix' ,
      image : 'movie-joker.jpg', 
      explain : 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver.The film, based on DC Comics characters,stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character.'
    },
    {
      question: 'Which movie is the top Life time grosses?',
      answers: [
        '1. Avatar',
        '2. Titanic',
        '3. Avengers : End Game',
        '4. Avengers : Infinity War'
      ],
      correctAnswer: '3. Avengers : End Game',
      image : 'movie-boxoffice.jpg',
      explain: "The film with the highest worldwide revenue was 'Avengers End Game', which earned $2,797,800,564." 
    },
    {
      question: "When is the movie 'The Lion King' released?",
      answers: [
        '1. June, 2019',
        '2. July, 2019',
        '3. September, 2019',
        '4. December, 2019'
      ],
      correctAnswer: '2. July, 2019',
      image : 'movie-the-lion-king.jpg',
      explain: "'The Lion King' release date was July 19, 2019."
    },
    {
      question: "Which of the following is not Jim Carrey's film appearance ?",
      answers: [
        '1. The Mask',
        '2. The Truman Show',
        '3. Eternal Sunshine of the Spotless Mind',
        '4. Catch Me If You Can'
      ],
      correctAnswer: '4. Catch Me If You Can',
      image : 'actor-jim-carrey.jpg',
      explain: "Jim Carrey appears in the films 'The Mask', 'The Truman Show' and 'Eternal Sunshine of the Spotless Mind'."
    },
    {
      question: "Which movie is the director David Fincher's first film?",
      answers: [
        '1. Seven',
        '2. Fight Club',
        '3. Alien 3',
        '4. Panic Room'
      ],
      correctAnswer: '3. Alien 3',
      image : 'director-david-fincher.jpg',
      explain: "He made his directorial debut in 1992 with the science-fiction horror film Alien 3. Since then, he has gone on to direct several films in the thriller genre, including Seven (1995), The Game (1997), Fight Club (1999), Panic Room (2002), Zodiac (2007), The Girl With the Dragon Tattoo (2011), and Gone Girl (2014)."
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  correct: 0 ,
  incorrect : 0 
};

function generateMain(){
  return `<div class="startpage">
  <h1>Movie Quiz</h1>  
    <img src="./movie/movie-screens.jpg" alt="movie-slate" class="start-image">
    <h3>Take this quiz to see how much you love movies.</h3>
      <button id="start-button">Click Me!!</button>
  </div>`;
}


function generateQuestion(){
  let quiz = store.questions[store.questionNumber];
  let answer = quiz.answers.map((answer, prop) =>{
    return `<input type="radio" id="answer${prop}" name="answer" value="${answer}" required/>
    <label for="answer${prop}" class="answer-radio">${answer}<br>`;
  });
  return `<div class="quizPage">
  <h2>QUIZ${store.questionNumber + 1}</h2>
<h4>${store.questionNumber + 1} OF ${store.questions.length}</h4>
  <img src="./movie/${store.questions[store.questionNumber].image}" alt="${store.questions[store.questionNumber].image}">
  <p>${quiz.question}</p>
  <form method="post" id="submit-button" class="answer=radio">
  ${answer.join("")}
  <button type="submit">submit</button>
  </form>
  <p class="correct-qtty">correct : ${store.correct}  incorrect : ${store.incorrect}</p>
  </div>
`;
}


function generateFinal(){
  return `<div class="finalPage">
  <h1>Movie Quiz Result</h1>  
    <img src="./movie/movie-screens.jpg" alt="movie-screen" class="start-image">
    <h2>Good Job</h2>
    <h3>You got ${store.correct} of the ${store.questions.length}!</h3>
    <h4>If you want to retry, press the button</h4>
      <button class="restart-button">Click Me!!</button>
</div>`;
}

function checkTheAnswer(answer){
  if(answer === store.questions[store.questionNumber].correctAnswer){
    store.correct +=1 ;
    $('main').html(`<div class="checkpage">
    <h3 class="answer">You're answer is correct</h3>
    <p>${store.questions[store.questionNumber].explain}</p>
    <p class="correct-qtty">correct : ${store.correct}  incorrect : ${store.incorrect}</p>
    <button id="next-button">Next</button>
  </div>`) ;
  }
  else{
    store.incorrect +=1;
    $('main').html(`<div class="checkpage">
            <h3 class="answer">You're answer is incorrect</h3>
            <p>${store.questions[store.questionNumber].explain}</p>
            <p class="correct-qtty">correct : ${store.correct}  incorrect : ${store.incorrect}</p>
            <button id="next-button">Next</button>
          </div>`);
  }
}

function StartQuizButton(){
  $('main').on('click', '#start-button', function(event){
    console.log("start!");
    store.quizStarted = true;
    renderQuizApp();
  });
}

function SubmitQuizButton(){
  $('main').on('submit', '#submit-button', function(event){
    event.preventDefault();
    let chooseAnswer = $("input[name='answer']:checked").val();
    checkTheAnswer(chooseAnswer);
  });
}

function NextQuizButton(){
  $('main').on('click', '#next-button', function(event){
    store.questionNumber ++ ;
    renderQuizApp();
  });
}

function restartQuizButton(){
  $('main').on('click', '.restart-button', function(event){
    console.log("restart");
    store.questionNumber = 0;
    store.correct = 0;
    store.incorrect = 0;
    store.quizStarted = false ; 
    renderQuizApp();
  });
}

function renderQuizApp(){
  let quizApp = '';
  if(store.quizStarted){
    if(store.questionNumber === store.questions.length){
      quizApp = generateFinal();
    }
    else{
      quizApp = generateQuestion();
    }
  }
  else{
    quizApp = generateMain();
  }
  $('main').html(quizApp); 
}

function main(){
  renderQuizApp();
  generateMain();
  generateFinal();
  generateQuestion();
  StartQuizButton();
  SubmitQuizButton();
  restartQuizButton();
  NextQuizButton();
}

$(main);
