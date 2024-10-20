import React, { useState } from 'react';
import './App.css';

function App() {
  const [title,setTitle]=useState('');
  const [content,setcontent]=useState('');
  const [notecount,setNotecount]=useState([])
  const arr=[];
  for (let i=0;i<localStorage.length;i++){
    arr.push(localStorage.key(i));
  }
  function saving(){
    localStorage.setItem(title,content);
  }
  function createNewNote(){
      setNotecount([...notecount,{t:title
                                  ,c:content}]);
      console.log(notecount);
      setTitle('');
      setcontent('');
  } 
   return (
    <>
      <button onClick={createNewNote} id="adding">
        Add a new note
      </button>
          <div id="container">
          <input placeholder="Title"  value={title} onChange={(e)=>setTitle(e.target.value)}></input>
          <textarea  rows="4" cols="8" value={content}  onChange={(e)=>setcontent(e.target.value) }/>
          <button onClick={saving}>Save</button>
          <ol>{
            arr.map((data)=>
            <li key={data} ><div>{key}</div><div>{localStorage.getItem(data)}</div></li>)}
          </ol>
          </div>
        
    </>
  );
}

export default App;
