import React, { useEffect, useState } from 'react'

import Question from '../components/Question'

export default function Quiz() {

  const [state, setState] = useState([]);
  const [answers, setAnswers] = useState([null,null,null,null, null]);
  const [isSubmitted, setSubmitted] =useState(false);


  useEffect(()=>{
    if(!isSubmitted){   
      fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(data=>data.json())
      .then(result=>{
        setState(()=>{
          return result.results.map(entry=>{
            let { question, correct_answer,incorrect_answers } = entry;
            const propositions = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5); 
            return { question, correct_answer, incorrect_answers, propositions }
          })
        })
      })
    }
  }, [isSubmitted])

  function changeAnswer(questionID, answerID){
    setAnswers((oldAnswers)=>{
      return oldAnswers.map((ofQuestion, id)=>{
        if(questionID === id) return answerID
        return ofQuestion
      })
    })
  }

  function generateQuestions(){
    if (state!==[]) return state.map((entry, i)=>{return(
      
      <Question 
        key={entry.question}
        id={i}
        question={entry.question}
        correctAnswer={entry.correct_answer}
        propositions={entry.propositions}
        selectedAnswer={answers[i]}
        isSubmitted={isSubmitted}
        changeAnswer={changeAnswer}
      />)
    })
  }

  function countCorrectAnswers(){
    let count=0;
    for(let quest of state){
      if(answers.includes(quest.correct_answer)){
        count++;
      }
    }
    return count;
  }

  return (
    <div className='container'> 
      <div className='questions'>
        {generateQuestions()}
        
      </div>
      <div>

        {
          isSubmitted ?
          (
            <div className='result-container'>
              <span className='result'>You scored {countCorrectAnswers()} correct answers</span>
              <button 
                className='btn'
                onClick={()=>setSubmitted((old)=>false)}
              >
                Play again</button>
            </div>
          ):
          (
            <button 
              className='btn'
              onClick={()=>setSubmitted((old)=>true)}
            >
            Check answers</button>
          )
        }

      </div>
    </div>
  )
}
