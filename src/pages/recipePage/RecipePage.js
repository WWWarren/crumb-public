import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { getRecipe, clearRecipe } from '../../store/actions/recipes';

import CommentArea from './commentArea/CommentArea';
import RatingArea from '../../components/misc/ratingArea/RatingArea';
import DifficultyArea from '../../components/misc/difficultyArea/DifficultyArea';
import RecipeDetails from './recipeDetails/RecipeDetails';
import CrumbLogo from '../../images/CrumbLogo';

import PrimaryButton from '../../components/buttons/Buttons';

import './RecipePage.scss';

const RecipePage = ({
  user,
  recipes,
  match,
  history,
  ingredients,
  getRecipe,
  clearRecipe
}) => {
  const [editing, setEditing] = useState(false);
  const [createdByUser, setCreated] = useState(false);

  useEffect(() => {
    getRecipe(match.params.id, () => checkIfUserCreated());
    return () => {
      clearRecipe();
    };
  }, []);

  function checkIfUserCreated() {
    const recipe = recipes.selected;
    const checkRecipes = user.recipes.findIndex(r => r === recipe.id);

    if (checkRecipes !== -1) {
      setCreated(true)
    }
  }

  const recipe = recipes.selected;
  const { list } = ingredients;
  if (!recipe) return null;
  return (
    <div className="recipePage__recipePageContainer">
      <div className="recipePage__recipePageActions">
        {
          createdByUser &&
            <PrimaryButton
              onClick={() => setEditing(!editing)}
            >
              Edit
            </PrimaryButton>
        }
        <PrimaryButton
          onClick={() => history.goBack()}
        >
          Back
        </PrimaryButton>
      </div>
      <div className="recipePage__recipePageWrapper">
        <div className="recipePage__recipePageDetails">
          <div>
            <h2>{recipe.name}</h2>
            <div className="recipePage__recipePageStats">
              <DifficultyArea
                difficulty={recipe.difficulty}
                scale={10}
              />
              <div>
                <h4>CREATED BY</h4>
                <div>{recipe.createdBy.name || 'Anon'}</div>
              </div>
              <RatingArea
                recipe={recipe}
                user={user}
                enableRating
              />
            </div>
          </div>
          <div className="recipePage__recipePageImage">
            <CrumbLogo
              items={recipe.ingredients}
            />
          </div>
        </div>
        <div className="recipePage_recipePageIngredients">
          <RecipeDetails
            recipe={recipe}
            ingredients={list}
            editing={editing}
            editDone={() => setEditing(false)}
          />
        </div>
        <CommentArea
          recipeId={recipe.id}
          commentIds={recipe.comments}
        />
      </div>
    </div>
  )
}

export function mapStateToProps({ user, ingredients, recipes }) {
  return {
    user: user.activeUser,
    ingredients,
    recipes,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getRecipe,
    clearRecipe
  }
)(RecipePage));

RecipePage.propTypes = {
  user: PropTypes.object,
  ingredients: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  recipes: PropTypes.object,
  getRecipe: PropTypes.func,
  clearRecipe: PropTypes.func,
}
