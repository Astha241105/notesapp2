import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notecount, setNotecount] = useState([]);
  const [all, setAll] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.endsWith('_marked')) {
        const content = localStorage.getItem(key);
        const marked = localStorage.getItem(`${key}_marked`) === 'true'; 
        arr.push({ t: key, c: content, m: marked });
      }
    }
    setNotecount(arr);
    setAll(arr);
  }, []);

  const saving = () => {
    if (title === '') {
      alert("Give title");
    } else if (content === '') {
      alert("Give content");
    } else {
      const newNote = { t: title, c: content, m: false };
      localStorage.setItem(title, content); 
      localStorage.setItem(`${title}_marked`, false); 
      const updatedNotecount = [...notecount, newNote];
      setNotecount(updatedNotecount);
      setAll(updatedNotecount);
      setTitle('');
      setContent('');
      setSearch('');
    }
  };

  const update = (d) => {
    setTitle(d);
    setContent(localStorage.getItem(d));
    localStorage.removeItem(d); 
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = notecount.filter((note) =>
        note.t.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setAll(results);
    } else {
      setAll(notecount);
    }
    setSearch(keyword);
  };

  const del = (noteTitle) => {
    localStorage.removeItem(noteTitle);
    localStorage.removeItem(`${noteTitle}_marked`); 
    const updatedNotecount = notecount.filter(note => note.t !== noteTitle);
    setNotecount(updatedNotecount);
    setAll(updatedNotecount);
  };

  const toggleMark = (noteTitle) => {
    const updatedNotecount = notecount.map(note => {
      if (note.t === noteTitle) {
        const newMarkedState = !note.m; 
        localStorage.setItem(`${noteTitle}_marked`, newMarkedState); 
        return { ...note, m: newMarkedState }; 
      }
      return note;
    });
    setNotecount(updatedNotecount);
    setAll(updatedNotecount);
  };

  return (
    <div id="container">
      <div id="container1">
      <input placeholder="Title" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Add some content" rows="4" cols="8"id="content"value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={saving} id="save">Save</button>
      </div>
      <div id="container2">
        <input placeholder="Search for your notes" id="search" value={search} onChange={filter} />
        <ul id="noteslist">
          {all.map((note) => (<li key={note.t}>
              <b><div id="div1" style={{ backgroundColor: note.m ? '#E4B1F0' : ' #433878' }}>{note.t} </div> </b>
              <div id="buttons">
                <button onClick={() => update(note.t)} className="operation">Open</button>
                <button onClick={() => toggleMark(note.t)} className="operation">
                  {note.m ? 'Unmark' : 'Mark'}
                </button>
                <button onClick={() => del(note.t)} className="operation">Delete</button></div></li> ))}
        </ul> </div></div>);}

export default App;
