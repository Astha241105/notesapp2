import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notecount, setNotecount] = useState([]);
  const [all,setALL]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      arr.push(localStorage.key(i));
    }
    setNotecount(arr.map((key) => ({ t: key, c: localStorage.getItem(key) })));
    setALL(notecount);
  }, [title]);

  function saving() {
    localStorage.setItem(title, content);
    setNotecount([...notecount, { t: title, c: content }]);
    console.log([...notecount, { t: title, c: content }]);
    setALL(notecount);
  }

  function createNewNote() {
    setTitle('');
    setContent('');
  }

  function update(d) {
    setTitle(d);
    setContent(localStorage.getItem(d));
    localStorage.removeItem(d);
  }
  function searching(search) {
    const filteredNotes = notecount.filter(note => 
      note.t.toLowerCase().includes(search.toLowerCase()) 
    );
    setNotecount(filteredNotes); 
  }
  return (
    <>
      <button onClick={createNewNote} id="adding">
        Add a new note
      </button>
      <div id="container">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          cols="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={saving}>Save</button>
        <input placeholder="Search for your notes" value={search} onChange={(e) => {
        const value = e.target.value; setSearch(value);  searching(value);  }} ></input>
        <ol>
          {notecount.map((note) => (
            <li key={note.t} onClick={() => update(note.t)}>
              <div>{note.t}</div>
              <div>{note.c}</div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
