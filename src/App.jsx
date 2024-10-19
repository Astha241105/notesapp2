import { useState } from 'react';

function App() {
  const [count, setCount] = useState([]);
  const createNewNote=()=>{
    const abc=[...count,[]] //taking all elements 
    setCount(abc)
  }

  return (
    <>
    <button onClick={createNewNote}>click me</button>
    {count.map((data,i)=>{
      return(
      <textarea rows="4" cols="8" /> )})}
  </>
  );
  }

export default App
