import React from 'react';

import './DifficultyArea.scss';

const DifficultyArea = ({ difficulty, scale }) => (
  <div
    className="recipeCard-difficultyArea__difficultyAreaWrapper"
  >
    <h4>DIFFICULTY</h4>
    <div className="recipeCard-difficultyArea__difficultyAreaBar">
      {difficulty} / {scale}
    </div>
  </div>
);

export default DifficultyArea;
