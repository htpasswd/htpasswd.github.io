$('body').css({
  'background': 'url("https://res.cloudinary.com/hilnmyskv/image/upload/q_auto/v1586268064/Algolia_com_Website_assets/images/homepage/hero.svg") no-repeat center ',
  'background-size': 'cover',
  'min-height': '100vh'
});
let container = $('#question-container');
//Create Question / Answers / Choices array
v = [{
    'Q': 'How do you write "Hello World" in an alert box?',
    'A': 2,
    'C': ['msg("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");']
  },
  {
    'Q': 'How do you create a function in JavaScript?',
    'A': 3,
    'C': ['function:myFunction()', 'function = myFunction()', 'function myFunction()']
  },
  {
    'Q': 'How to write an IF statement in JavaScript?',
    'A': 1,
    'C': ['if (i == 5)', 'if i = 5 then', 'if i == 5 then']
  },
  {
    'Q': 'How does a FOR loop start?',
    'A': 2,
    'C': ['for (i = 0; i <= 5)', 'for (i = 0; i <= 5; i++)', 'for i = 1 to 5']
  },
  {
    'Q': 'What is the correct way to write a JavaScript array?',
    'A': 3,
    'C': ['var colors = "red", "green", "blue"', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]']
  }
];
//console.log(v);
let qAc = v; //qAc = Q = Question / A = Answer / C = Choices
let goodAnswers = [];
for (let i = 0; i < qAc.length; i++) {
  goodAnswers.push(qAc[i]['A']);
  container.append('<div class="tab-pane fade" id="question-' + i + '" role="tabpanel" aria-labelledby="question-' + i + '-tab">' +
    '<h2 class="text-center text-lobster">' + qAc[i]['Q'] + '</h2><br>' +
    '</div>');
  if (i === 0) {
    $('#question-0').addClass('show active');
  }
  for (let j = 0; j < qAc[i]["C"].length; j++) {
    let val = j + 1;
    $('#question-' + i).append('<button class="btn btn-quiz btn-answer w-100 text-center text-md-left mb-3 p-5" value="' + val + '">' + qAc[i]['C'][j] + '</button>')
  }
}

let answers = [];
let score = 0;
let step = 0;
console.log(goodAnswers[0]);
$('.btn-answer').click(function() {
  let that = $(this);
  $('.btn-answer:visible').off('click');
  let valeur = that.val(); //La valeur du bouton cliqué
  let tabActive = $('.tab-pane.show.active'); //L'onglet visible actuellement
  answers.push(valeur); //J'ajoute la valeur au tableau des reponse (pour plus tard)
  //Si la réponse X correspond a la bonne réponse x on augmente de 1 le score
  if (answers[step] == goodAnswers[step]) {
    that.css('background-image', 'linear-gradient( 0deg,rgb(227, 251, 233) 0%,rgb(205, 225, 207) 100% )')
    score++;
  } else {
    $('.btn-answer:visible[value="' + goodAnswers[step] + '"]').css('background-image', 'linear-gradient( 0deg,rgb(227, 251, 233) 0%,rgb(205, 225, 207) 100% )');
    that.css('background-image', 'linear-gradient( 0deg,rgb(251, 227, 227) 0%,rgb(200, 160, 160) 100% )')
  }
  setTimeout(function() {
    tabActive.removeClass('show active').next('.tab-pane').addClass('show active');
  }, 1500)
  //Si c'est la dernière question on affiche le score
  if (goodAnswers.length === answers.length) {
    $('.tab-pane').removeClass('show active');
    $('#score').addClass('show active');
    $('#nbrPoint').append(score.toString());
    $('#nbrQuestion').append(qAc.length.toString());
    console.log(answers);
    if (score === qAc.length) {
      //Ton aciton en cas de victoire
      alert('Perfect !')
    }
  }
  step++;
});
