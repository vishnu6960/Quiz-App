import React, { useEffect, useState } from 'react'

const QuestionTimer = ({timeout, onTimeout}) => {
    const [remainingTime, setRemainingTime] = useState(timeout)
    useEffect(() =>{
        setTimeout(onTimeout, timeout);
    }, [timeout, onTimeout])

    useEffect(() => {
        setInterval(() => {
            setRemainingTime((prev) => prev - 100)
        }, 100);
    }, [])
  return (
    <>
        <progress id='question-timer' max={timeout} value={remainingTime} />
    </>
  )
}

export default QuestionTimer
