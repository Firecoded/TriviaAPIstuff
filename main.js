$(document).ready(callWhenPageLoads);
var correctFinalAnswer;
var score = 0;
var category = null;
var difficulty = null;

function callWhenPageLoads(){
  addClickHandlers();
  showSettings();
}
function addClickHandlers(){
$('.go').click(handleGoClick);
$('.option1').click(function(){
  checkAnswer('option1')
});
$('.option2').click(function(){
  checkAnswer('option2')
});
$('.option3').click(function(){
  checkAnswer('option3')
});
$('.option4').click(function(){
  checkAnswer('option4')
});
$('.save-sets').click(hideSettings);
$('.gear').click(showSettings);
}

function handleGoClick(){
  getTriviaData(category, difficulty);
  $('.go').text('Next');
}
function changeSettings(){
  var cat = $('#category :selected');
  var catValue = cat.val();
  category = '&category='+ catValue;
  var diff = $('#diff :selected');
  var diffValue = diff.val();
  difficulty = '&difficulty='+ diffValue;
}
function getTriviaData(category, difficulty){
  var custUrl = 'https://opentdb.com/api.php?amount=1&type=multiple';
  if (category){
    custUrl+= category;
  }
  if (difficulty){
    custUrl+= category;
  }
  $('.answer').text('...');
    var ajaxConfig = {
        dataType: 'json',
        method: 'get',
        url: custUrl,
        success: function(result) {
            filterCharacters(result.results[0].question, result.results[0].correct_answer, result.results[0].incorrect_answers);
          },
        error: console.log('error')
        }
    $.ajax(ajaxConfig);
}
function filterCharacters(question, correctAnswer, wrongAnswers){
  correctAnswer = correctAnswer.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&eacute;/g, 'e').replace(/&amp;/g, '&');
  var question = question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&eacute;/g, 'e').replace(/&amp;/g, '&');
  for(var i = 0; i<wrongAnswers.length; i++){
    wrongAnswers[i] = wrongAnswers[i].replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&eacute;/g, 'e').replace(/&amp;/g, '&');
  }
  sortData(question, correctAnswer, wrongAnswers)
}
function sortData(question, correctAnswer, wrongAnswers){
  var shuffledArray = [];
  wrongAnswers.push(correctAnswer);
  while(wrongAnswers.length>0){
    var x = 0;
    for(var i = 1; i<wrongAnswers.length; i++){
      x = Math.floor(Math.random() * wrongAnswers.length)
    }
    var temp = wrongAnswers.splice(x, 1)
    shuffledArray.push(temp)
  }
  correctFinalAnswer = correctAnswer;
  displayData(question, shuffledArray)
}
function displayData(question, shuffledArray){
var answers =[];
for(var arrI = 0; arrI<shuffledArray.length; arrI++){
  answers[arrI] = shuffledArray[arrI];
  var element = 'option'+(arrI+1);
  $('.'+ element).text(shuffledArray[arrI]);
}
  $('.question').text(question);
  $('.answer').text(' ');
}
function checkAnswer(element){
  var temp = $('.'+element).text();
  if(temp === correctFinalAnswer){
    $('.answer').text('Correct!')
    score+= 2;
    updateScore();
  } else{
    $('.answer').text('Try Again!');
    score--;
    updateScore();
  }
}
function updateScore(){
  $('.score').text('Score: '+ score)
}
function hideSettings(){
  $('.settings-cont, label, .settings1, .settings2, .save-cont, .save-sets, .settings-title, .form-control').addClass('hidden');
  $('label, .settings1, .settings2, .save-cont, .save-sets, .settings-title, .form-control').addClass('hidden2');
  handleGoClick();
}
function showSettings(){
  $('.settings-cont, label, .settings1, .settings2, .save-cont, .save-sets, .settings-title, .form-control').removeClass('hidden');
  $('label, .settings1, .settings2, .save-cont, .save-sets, .settings-title, .form-control').removeClass('hidden2');
}
