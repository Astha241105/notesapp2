import React, { useState } from 'react';
import './App.css';

function App() {
  const [title,setTitle]=useState('');
  const [content,setcontent]=useState('');
  function saving(){
    localStorage.setItem(title,content);
  }
  function createNewNote(){
      setTitle('');
      setcontent('');
  } 
   return (
    <>
      <button onClick={createNewNote} id="adding">
        Add a new note
      </button>
          <div>
          <input placeholder="Title"  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          <textarea  rows="4" cols="8" value={content}  onChange={(e)=>setcontent(e.target.value) }/>
          <button onClick={saving}>Save</button>
          </div>
        
    </>
  );
}

export default App;
