import React, { act, useState } from 'react'
import './Quiz.css'
import "bootstrap/dist/css/bootstrap.min.css";

import questions from '../../questions.js'
import QuestionTimer from '../questionTimer/QuestionTimer.jsx';

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    
    const quizIsComplete = activeQuestionIndex === questions.length

    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prev) => { 
            return [...prev, selectedAnswer]
        })
    }

    if(quizIsComplete){
        return <div>
            <h1>quiz is completed</h1>
        </div>
    }
    const shuffleAnswers = [...questions[activeQuestionIndex].answers]
    shuffleAnswers.sort(() => Math.random() - 0.5)


  return (
    <div id='quiz'  className='col-12 col-sm-10 col-lg-8 col-xl-6'>
        <div id='questions'>
            <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
            <h2>{questions[activeQuestionIndex].text}</h2>
            <ul>
                {shuffleAnswers.map((answer) => (
                    <li key={answer} className='answer'>
                        <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    
  )
}

export default Quiz
