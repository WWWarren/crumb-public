import React from 'react';
import PropTypes from 'prop-types';

import RatingArea from '../../../components/misc/ratingArea/RatingArea';
import DifficultyArea from '../../../components/misc/difficultyArea/DifficultyArea';

import './RecipeCard.scss';
import CrumbLogo from '../../../images/CrumbLogo';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <>
      <div
        className="dashboard-recipeCard__recipeCard"
        onClick={onClick}
      >
        <div className="dashboard-recipeCard__recipeCardImage">
          <CrumbLogo
            items={recipe.ingredients}
          />
        </div>
        <div
          className="dashboard-recipeCard__recipeCardDetails"
        >
          <h3
            className="dashboard-recipeCard__recipeCardName"
          >
            {recipe.name}
          </h3>
          <div className="dashboard-recipeCard_recipeCardStats">
            <div>
              <DifficultyArea
                difficulty={recipe.difficulty}
                scale={10}
              />
            </div>
            <div>
              <h4>CREATED BY</h4>
              <div>{recipe.createdBy.name || 'Anon'}</div>
            </div>
            <div>
              <RatingArea
                recipe={recipe}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.object,
  onClick: PropTypes.func,
}
