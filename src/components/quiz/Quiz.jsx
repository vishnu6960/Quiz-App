import React, { act, useCallback, useState } from 'react'
import './Quiz.css'
import "bootstrap/dist/css/bootstrap.min.css";

import questions from '../../questions.js'
import QuestionTimer from '../questionTimer/QuestionTimer.jsx';

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
    const shuffleAnswers = [...questions[activeQuestionIndex].answers]
    shuffleAnswers.sort(() => Math.random() - 0.5)


  return (
    <div id='quiz'  className='col-12 col-sm-10 col-lg-8 col-xl-6'>
        <div id='questions'>
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
            <h2>{questions[activeQuestionIndex].text}</h2>
            <ul>
                {shuffleAnswers.map((answer) => {
                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = ''

                    if(answerState === 'answered' && isSelected){
                        cssClass = 'selected'
                    }
                    if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                        cssClass = answerState
                    }
                    return (
                        <li key={answer} className='answer'>
                        <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                    </li>
                    )
                })}
            </ul>
        </div>
    </div>
    
  )
}

export default Quiz
