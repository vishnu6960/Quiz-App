import React, { useRef } from 'react'

const Answers = ({ answers, selectedAnswer, answerState, onSelect  }) => {

    const shuffleAnswers = useRef()
    
    if(!shuffleAnswers.current){
        shuffleAnswers.current = [...answers]
        shuffleAnswers.current.sort(() => Math.random() - 0.5)
    }
  return (
    <>
        <ul>
            {shuffleAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = ''

                if(answerState === 'answered' && isSelected){
                    cssClass = 'selected'
                }
                if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                    cssClass = answerState
                }
                return (
                    <li key={answer} className='answer'>
                    <button onClick={() => onSelect(answer)} className={cssClass}>{answer}</button>
                </li>
                )
            })}
        </ul>
    </>
  )
}

export default Answers
