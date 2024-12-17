import React, { useEffect, useState } from 'react'

const QuestionTimer = ({timeout, onTimeout}) => {
    const [remainingTime, setRemainingTime] = useState(timeout)
    useEffect(() =>{
        const timer = setTimeout(onTimeout, timeout);
        return () => {
            clearTimeout(timer)
        }

    }, [timeout, onTimeout])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prev) => prev - 100)
        }, 100);

        return () => {
            clearInterval(interval)
        }
    }, [])
  return (
    <>
        <progress id='question-timer' max={timeout} value={remainingTime} />
    </>
  )
}

export default QuestionTimer
