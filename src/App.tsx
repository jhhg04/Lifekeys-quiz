import React, { useState } from 'react';
import Card from './components/Card';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setEnd(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNum(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!end) {
      const answer = e.currentTarget.value;
      const correct = questions[questionNum].correct_answer === answer;
      if (correct) setScore((prevScore) => prevScore + 1);
      const answerObj = {
        question: questions[questionNum].question,
        answer,
        correct,
        correctAnswer: questions[questionNum].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = questionNum + 1;

    if (nextQuestion === TOTAL_QUESTIONS) setEnd(true);
    else setQuestionNum(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <header>
          <h1>Lifekeys Quiz</h1>
          {(end || userAnswers.length === TOTAL_QUESTIONS) && (
            <button className='start-btn' onClick={startQuiz}>
              Start quiz
            </button>
          )}
          {!end && <p className='score'>Score: {score}</p>}
          {loading && <p>Loading...</p>}
        </header>
        <main>
          {!loading && !end && (
            <Card
              questionNum={questionNum}
              questionsTotal={TOTAL_QUESTIONS}
              question={questions[questionNum].question}
              answers={questions[questionNum].answers}
              userAnswer={userAnswers && userAnswers[questionNum]}
              cb={checkAnswer}
            />
          )}
          {!end &&
            !loading &&
            userAnswers.length === questionNum + 1 &&
            questionNum !== TOTAL_QUESTIONS - 1 && (
              <button className='next-btn' onClick={nextQuestion}>
                Next
              </button>
            )}
        </main>
      </Wrapper>
    </>
  );
}

export default App;
