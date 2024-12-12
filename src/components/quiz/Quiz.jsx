import React, { useState } from 'react'
import './Quiz.css'
import "bootstrap/dist/css/bootstrap.min.css";

import questions from '../../questions.js'

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length

    const handleSelectAnswer = (selectedAnswer) => {
        setUserAnswers((prev) => { 
            return [...prev, selectedAnswer]
        })
    }
  return (
    <div id='quiz'  className='col-12 col-sm-10 col-lg-8 col-xl-6'>
        <div id='questions'>
            <h2>{questions[activeQuestionIndex].text}</h2>
            <ul>
                {questions[activeQuestionIndex].answers.map((answer) => (
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
