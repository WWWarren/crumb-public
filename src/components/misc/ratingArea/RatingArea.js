import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateRecipe } from '../../../store/actions/recipes';
import { getRecipeRating } from '../../../store/actions/ratings';

import Icon from '../../../images/Icon';

import './RatingArea.scss';

const RecipeCard = ({ recipe, user, updateRecipe, enableRating }) => {
  const [ratingBoxVisible, setRatingBox] = useState(false);
  const [starHovered, setStarHovered] = useState(0);

  function showRecipeRating() {
    const arr = [];
    for (var i = 0; i < 5; i++) {
      arr.push(i);
    }
    return arr;
  }

  function saveRating(value) {
    let rating = recipe.rating || [];

    // Create new rating object & push to rating array
    const newRating = {
      user: user.id,
      rating: value,
    }

    // Update or add new rating depending if the user has already rated the recipe
    const upsertRating = rating.findIndex(r => r.user === newRating.user);
    if (upsertRating !== -1) {
      rating = rating.map(obj => {
        if (obj.user === newRating.user) {
          return {
            ...newRating,
          };
        }
        return obj;
      });
    } else {
      rating.push(newRating);
    }

    // Build recipe object with new rating array and send to database
    const obj = {
      ...recipe,
      rating
    }

    updateRecipe(obj);
    setRatingBox(false);
    setStarHovered(0);
  }

  // Get rating of recipe and stars
  const rating = getRecipeRating(recipe);
  const stars = showRecipeRating();

  return (
    <div className="recipeCard-ratingArea__ratingAreaContainer">
      <div className="recipeCard-ratingArea__ratingAreaTitle">
        <h4>RATING</h4>
        {
          enableRating &&
            <div
              onClick={() => setRatingBox(!ratingBoxVisible)}
              className="recipeCard-ratingArea__ratingAreaButton"
              style={{
                color: !ratingBoxVisible ? '#7EA16B' : '#DA9F93'
              }}
            >
              - {ratingBoxVisible ? 'Close' : 'Rate Recipe'}
            </div>
        }
      </div>
      {
        !ratingBoxVisible &&
        <div
          className="recipeCard-ratingArea__ratingAreaDetails"
        >
          <Icon
            icon='star'
            className={`
              recipeCard-ratingArea__ratingAreaIcon
              recipeCard-ratingArea__ratingAreaIconActive
            `}
          />
          <span>{rating.totalRating || 0}</span>
          <span>({rating.numberOfRatings || 0})</span>
        </div>
      }
      {
        (enableRating && ratingBoxVisible) &&
          <>
            <div
              className="recipeCard-ratingArea__ratingAreaBox"
            >
              {
                stars.map(s => (
                  <span
                    className="recipeCard-ratingArea__ratingAreaIconBox"
                    key={s}
                    onMouseOver={() => setStarHovered(s + 1)}
                  >
                    <Icon
                      icon='star'
                      className={`
                        recipeCard-ratingArea__ratingAreaIcon
                        ${rating.totalRating >= s + 1 ? 'recipeCard-ratingArea__ratingAreaIconActive' : ''}
                        ${starHovered >= s + 1 ? 'recipeCard-ratingArea__ratingAreaIconHover' : '' }
                      `}
                      onClick={() => saveRating(s + 1)}
                    />
                  </span>
                ))
              }
            </div>
          </>
      }
    </div>
  )
}

export default connect(
  null,
  {
    updateRecipe,
  }
)(RecipeCard);
