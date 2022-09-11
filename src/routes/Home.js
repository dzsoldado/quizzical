import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="intro"> 
      <h1>Quizzical</h1>
      <p>Test your brain, take a quiz!</p>
      <Link to='/quiz'><button className='btn'>Start quiz</button></Link>
    </main>
  )
}
