let selectedQuestion = 0;
let rightAnswerId = 0;
let answeredQuestion = [];

$("#prev-btn").hide();
initializeQuestion = () => {
  $("#" + selectedQuestion).addClass("selected-dot");
  const currentQuestion = QUESTIONS.find((x) => x.id === selectedQuestion);
  $("#question").text(currentQuestion.questionText);
  const possibleAnswers = ANSWERS.filter(
    (x) => x.questionId === selectedQuestion
  );
  rightAnswerId = possibleAnswers.find((x) => x.isRightAnswer).id;
  possibleAnswers.forEach((answ, i) => {
    $("#r" + i).attr("id", answ.id);
    $("#" + answ.id + " h5").text(answ.answerText);
    $("#" + answ.id).addClass("answer-hover");
  });
  if (
    answeredQuestion.length === 0 ||
    !answeredQuestion.find((x) => x.questionId === selectedQuestion)
  ) {
    $(".answer").click(function (ev) {
      //   console.log(ev);
      if (+ev.currentTarget.id === rightAnswerId) {
        $("#" + ev.currentTarget.id).addClass("right-answer");
        $("#" + selectedQuestion).addClass("right-answer");
      } else {
        $("#" + ev.currentTarget.id).addClass("wrong-answer");
        $("#" + rightAnswerId).addClass("right-answer");
        $("#" + selectedQuestion).addClass("wrong-answer");
      }

      answeredQuestion.push({
        questionId: selectedQuestion,
        selectedAnswerId: +ev.currentTarget.id,
      });
      $(".answer").off("click");
      $(".answer").each((i, answ) => {
        $("#" + answ.id).attr("id", "r" + i);
      });
      $(".answer").removeClass("answer-hover");
    });
  } else {
    const answeredQuestionId = answeredQuestion.find(
      (x) => x.questionId === selectedQuestion
    ).selectedAnswerId;
    if (answeredQuestionId === rightAnswerId) {
      $("#" + answeredQuestionId).addClass("right-answer");
    } else {
      $("#" + answeredQuestionId).addClass("wrong-answer");
      $("#" + rightAnswerId).addClass("right-answer");
    }

    $(".answer").off("click");
    $(".answer").each((i, answ) => {
      $("#" + answ.id).attr("id", "r" + i);
    });

    $(".answer").removeClass("answer-hover");
  }
};

initializeQuestion();

$(".dot").click(function (ev) {
  $(".answer").each((i, answ) => {
    $("#" + answ.id).attr("id", "r" + i);

    $("#r" + i).removeClass("wrong-answer");
    $("#r" + i).removeClass("right-answer");
  });
  $(".selected-dot").removeClass("selected-dot");
  selectedQuestion = +ev.currentTarget.id;
  if (selectedQuestion === 0) {
    $("#prev-btn").hide();
    $("#next-btn").show();
  } else if (selectedQuestion === 3) {
    $("#prev-btn").show();
    $("#next-btn").hide();
  } else {
    $("#prev-btn").show();
    $("#next-btn").show();
  }
  $("#" + selectedQuestion).addClass("selected-dot");
  initializeQuestion();
});

$("#prev-btn").click(function () {
  $(".answer").each((i, answ) => {
    $("#" + answ.id).attr("id", "r" + i);

    $("#r" + i).removeClass("wrong-answer");
    $("#r" + i).removeClass("right-answer");
  });
  $(".selected-dot").removeClass("selected-dot");
  selectedQuestion -= 1;
  if (selectedQuestion === 0) {
    $("#prev-btn").hide();
    $("#next-btn").show();
  } else if (selectedQuestion === 3) {
    $("#prev-btn").show();
    $("#next-btn").hide();
  } else {
    $("#prev-btn").show();
    $("#next-btn").show();
  }
  $("#" + selectedQuestion).addClass("selected-dot");
  initializeQuestion();
});

$("#next-btn").click(function () {
  $(".answer").each((i, answ) => {
    $("#" + answ.id).attr("id", "r" + i);

    $("#r" + i).removeClass("wrong-answer");
    $("#r" + i).removeClass("right-answer");
  });
  $(".selected-dot").removeClass("selected-dot");
  selectedQuestion += 1;
  if (selectedQuestion === 0) {
    $("#prev-btn").hide();
    $("#next-btn").show();
  } else if (selectedQuestion === 3) {
    $("#prev-btn").show();
    $("#next-btn").hide();
  } else {
    $("#prev-btn").show();
    $("#next-btn").show();
  }
  $("#" + selectedQuestion).addClass("selected-dot");
  initializeQuestion();
});
