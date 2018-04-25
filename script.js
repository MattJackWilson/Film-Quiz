(function() {
    const myQuestions = [
  {
      question: "Which cinematographer was nominated by the Academy 14 times before eventually winning?",
      answers: {
          a: "Emmanuel Lubezki",
          b: "Adam Arkapaw",
          c: "Roger Deakins",
          d: "Hoyte van Hoytema"
      },
      correctAnswer: "c"
  },
  {
      question: "What was the first film released by Studio Ghibli?",
      answers: {
          a: "The Castle of Cagliostro",
          b: "Nausicaä of the Valley of the Wind",
          c: "My Neighbor Totoro",
          d: "Laputa: Castle in the Sky"
      },
      correctAnswer: "d"
  },
  {
      question: "Who DIDN'T Hans Gruber demand the release of in Die Hard?",
      answers: {
          a: "Warriors of the Sun",
          b: "Asian Dawn",
          c: "Liberté de Québec",
          d: "New Provo Front"
      },
      correctAnswer: "a"
  },
  {
      question: "How many films did Akira Kurosawa make with Japanese legend, Toshiro Mifune?",
      answers: {
          a: "8",
          b: "12",
          c: "16",
          d: "18"
      },
      correctAnswer: "c"
  },
  {
      question: "What Philip K. Dick novel is Blade Runner based on?",
      answers: {
          a: "Ubik",
          b: "Do Andriods Dream of Electric Sheep",
          c: "A Scanner Dakly",
          d: "Flow my Tears, the Policeman Said"
      },
      correctAnswer: "b"
  },
  {
      question: "What kind of shark ate Steve Zissou’s partner, Esteban, in The Life Aquatic with Steve Zissou",
      answers: {
          a: "Whale Shark",
          b: "Jaguar Shark",
          c: "Lynx Shark",
          d: "Hammerhead Shark"
      },
      correctAnswer: "b"
  },
  {
      question: "Which film did Ingmar Bergman make to help him overcome his crippling fear of death?",
      answers: {
          a: "Persona",
          b: "Wild Strawberries",
          c: "The Seventh Seal",
          d: "Autumn Sonata"
      },
      correctAnswer: "c"
  },
  {
      question: "What notebook did Biff use to build a financial empire in Back to the Future 2?",
      answers: {
          a: "Sports Almanak",
          b: "Sports Alminac",
          c: "Sports Alminak",
          d: "Sports Almanac"
      },
      correctAnswer: "d"
  },
  {
      question: "What are humans used for in The Matrix?",
      answers: {
          a: "Food",
          b: "Armies",
          c: "Slaves",
          d: "Batteries"
      },
      correctAnswer: "d"
  },
  {
      question: "Which director moved to the UK to be free from the censorship and interference of Hollywood Studios?",
      answers: {
          a: "Stanley Kubrick",
          b: "Alfred Hitchcock",
          c: "Frank Capra",
          d: "Federico Fellini"
      },
      correctAnswer: "a"
  }

];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                  `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
              `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }


    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }

            var pictures = ["img/Mary_Poppins.jpg", "img/scorsese.jpg", "img/Gone_With_the_Wind.jpg", "img/BvS.jpg", "img/A_Few_Good_Men.png", "img/Gump.jpg"];
            var messages = ["Practically perfect in every way", "You're so smart that Martin Scorsese rings you for advice", "Frankly my dear, you could do better...", "You're about as average as a DC movie", "You REALLY can't handle the truth", "Mama says, 'Stupid is as stupid does.'"];
            var score;

            if (numCorrect <= 1) {
                score = 5;
            }
            if (numCorrect >= 2 && numCorrect <= 3) {
                score = 4;
            }
            if (numCorrect >= 4 && numCorrect <= 5) {
                score = 3;
            }
            if (numCorrect >= 6 && numCorrect <= 7) {
                score = 2;
            }
            if (numCorrect >= 8 && numCorrect <= 9) {
                score = 1;
            }
            if (numCorrect > 9) {
                score = 0;
            }

            document.getElementById("after_submit").style.visibility = "visible";
            document.getElementById("message").innerHTML = messages[score];
            document.getElementById("picture").src = pictures[score];

        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results

    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();