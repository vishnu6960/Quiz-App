import React, { useCallback, useRef, useState } from 'react'
import './Quiz.css'
import "bootstrap/dist/css/bootstrap.min.css";

import questions from '../../questions.js'
import QuestionTimer from '../questionTimer/QuestionTimer.jsx';
import Answers from '../answers/Answers.jsx';

const Quiz = () => {
    const [answerState, setAnswerState] = useState('')
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1

    
    const quizIsComplete = activeQuestionIndex === questions.length

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answered')
         setUserAnswers((prev) => { 
            return [...prev, selectedAnswer]
        })

        setTimeout(() => {
            if(selectedAnswer === questions[activeQuestionIndex].answers[0]){
                setAnswerState('correct')
            }
            else{
                setAnswerState('wrong')
            }

            setTimeout(() => {
                setAnswerState('')
            }, 2000)

        }, 1000)
    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if(quizIsComplete){
        return <div>
            <h1>quiz is completed</h1>
        </div>
    }

    
    


  return (
    <div id='quiz'  className='col-12 col-sm-10 col-lg-8 col-xl-6'>
        <div id='questions'>
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
            <h2>{questions[activeQuestionIndex].text}</h2>
              <Answers 
                  key={activeQuestionIndex}
                  answers={questions[activeQuestionIndex].answers}
                  selectedAnswer={userAnswers[userAnswers.length - 1]} 
                  answerState={answerState}
                  onSelect={handleSelectAnswer}      
            />
        </div>
    </div>
    
  )
}

export default Quiz
