import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notecount, setNotecount] = useState([]);
  const [all, setALL] = useState([]);
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      arr.push({ t: key, c: localStorage.getItem(key) });
    }
    setNotecount(arr);
    setALL(arr);
  }, []);

  function saving() {
    localStorage.setItem(title, content);
    const updatedNotecount = [...notecount, { t: title, c: content }];
    setNotecount(updatedNotecount);
    setALL(updatedNotecount);
    setTitle('');
    setContent('');
    setSearch(''); 
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

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = notecount.filter((note) =>
        note.t.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setALL(results);
    } else {
      setALL(notecount);
    }

    setSearch(keyword);
  };

  return (
    <>
      <button onClick={createNewNote} id="adding">
        Add a new note
      </button>
      <div id="container">
        <input
          placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea rows="4" cols="8"  value={content} onChange={(e) => setContent(e.target.value)}/>
        <button onClick={saving}>Save</button>
        <input placeholder="Search for your notes" value={search} onChange={filter}/>
        <ul>
          {all.map((note) => (
            <li key={note.t} onClick={() => update(note.t)}>
              <div>{note.t}</div>
              <div>{note.c}</div>
            </li>))}
        </ul>
      </div> </> );
}

export default App;
