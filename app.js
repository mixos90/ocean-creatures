import { animals } from './animals';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css'; // Ensure this file contains the CSS for rotation

const container = document.getElementById('app');
const root = createRoot(container);

const App = () => {
  const [fact, setFact] = useState('');
  const [activeAnimal, setActiveAnimal] = useState(null);

  const handleClick = (e) => {
    const animalName = e.target.alt;
    displayFact(animalName);
    setActiveAnimal(animalName);

    // Remove the animation class after the animation duration
    setTimeout(() => {
      setActiveAnimal(null);
    }, getAnimationDuration(animalName));
  };

  const displayFact = (animalName) => {
    const facts = animals[animalName]?.facts || [];
    const randomFactIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomFactIndex] || 'No fact available.');
  };

  const getAnimationDuration = (animalName) => {
    switch (animalName) {
      case 'dolphin':
        return 1000; // Duration for dolphin
      case 'lobster':
        return 1000; // Duration for lobster
      case 'starfish':
        return 3000; // Duration for starfish
      default:
        return 0;
    }
  };

  const getAnimationClass = (animal) => {
    switch (animal) {
      case 'dolphin':
        return 'rotate-dolphin';
      case 'lobster':
        return 'rotate-lobster';
      case 'starfish':
        return 'rotate-starfish';
      default:
        return '';
    }
  };

  const images = Object.keys(animals).map(animal => {
    const animationClass = animal === activeAnimal ? getAnimationClass(animal) : '';

    return (
      <img
        key={animal}
        className={`${animationClass} animal`}
        alt={animal}
        src={animals[animal].image}
        aria-label={animal}
        role="button"
        onClick={handleClick}
      />
    );
  });

  return (
    <div>
      <img
        className="background"
        alt="ocean"
        src="/images/ocean.jpg"
      />
      <div className="animals">{images}</div>
      <h1>{fact === '' ? 'Click an animal for a fun fact' : 'Fun Fact!'}</h1>
      <p id="fact">{fact}</p>
    </div>
  );
};

// Render the App component into the DOM
root.render(<App />);
