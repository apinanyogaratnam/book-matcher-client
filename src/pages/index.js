import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

const NavBar = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'steelblue',
  }}>
    <h3>Home</h3>
    <h3>About</h3>
    <h3>Contact</h3>
  </div>
);

const Form = (props) => {
  const [personality, setPersonality] = useState("Athletic Person");
  const [genre, setGenre] = useState("Horror");

  const handleSubmit = async () => {
    const { data } = await axios.get(`http://localhost:8000?personality=${personality}&genre=${genre}`)
    props.setBooks(data);
    console.log('submitted', personality, genre);
  };

  return (
    <div>
      <select onChange={(e) => setPersonality(e.target.value)}>
        <option>Athletic Person</option>
        <option selected>Joyful Person</option>
        <option>Sad person</option>
        <option>Nerdy Person</option>
      </select>

      <select onChange={(e) => setGenre(e.target.value)}>
        <option>Romance</option>
        <option selected>Horror</option>
        <option>Sci-Fi</option>
        <option>Comedy</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const Books = (props) => {
  return (
    <div style={{
      border: '1px solid steelblue',
      borderRadius: '5px',
    }}>
      {(props.books || []).map((book, index) => (
        <div key={index}>
          <h3>{book}</h3>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [books, setBooks] = useState(['caillou', 'clifford', 'riverdale']);
  const [personality, setPersonality] = useState("Athletic Person");
  const [genre, setGenre] = useState("Horror");

  return (
    <>
      <NavBar />
      <Form personality={personality} setPersonality={setPersonality} genre={genre} setGenre={setGenre} books={books} setBooks={setBooks} />
      <Books books={books}/>
    </>
  )
}
