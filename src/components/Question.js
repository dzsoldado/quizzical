import React from 'react'

export default function Question(props) {

  const { 
    id : questionID, 
    question,
    propositions,
    correctAnswer,
    selectedAnswer, 
    changeAnswer,
    isSubmitted
  } = props; 
  
  function classCalculator(propo){
    if(!isSubmitted){
      return 'proposition ' + ((selectedAnswer === propo)? '--selected' : '')
    }
    if(propo === correctAnswer){
      return 'proposition --right'
    }
    if(propo === selectedAnswer){
      return 'proposition --wrong'
    }
    return 'proposition --not-selected'
  }

  return (
    <div className='question'>
      <p className='question-text'>{question}</p>
      <div className='propositions'>
        {
          propositions.map((propo, propositionID)=>(
            <>
              <label 
                htmlFor={questionID+'-'+propositionID}
                className={classCalculator(propo)}
                >{propo}
              </label>
              <input 
                key={propo}
                type="radio"
                name={questionID}
                id={questionID+'-'+propositionID}
                checked={selectedAnswer === propo}
                onChange={()=>{
                  if(!isSubmitted) changeAnswer(questionID, propo)
                }}
              />
            </>
          ))
        }
      </div>
      <hr />
    </div>
  )
}
