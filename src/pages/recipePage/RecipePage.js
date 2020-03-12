import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getRecipe, clearRecipe } from '../../store/actions/recipes';
import { history } from '../../store/store';

import CommentArea from './commentArea/CommentArea';
import RatingArea from '../../components/misc/ratingArea/RatingArea';
import DifficultyArea from '../../components/misc/difficultyArea/DifficultyArea';
import RecipeDetails from './recipeDetails/RecipeDetails';
import CrumbLogo from '../../images/CrumbLogo';

import PrimaryButton from '../../components/buttons/Buttons';

import './RecipePageStyles.scss';

export class RecipePage extends Component {
  state = {
    editing: false,
    createdByCurrentUser: false,
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    // Get recipe
    this.props.getRecipe(id, () => this.checkIfUserCreated());
  }

  componentWillUnmount = () => {
    this.props.clearRecipe();
  }

  checkIfUserCreated = () => {
    const { user } = this.props;
    const recipe = this.props.recipes.selected;

    const checkRecipes = user.recipes.findIndex(r => r === recipe.id);

    if (checkRecipes !== -1) {
      this.setState(() => ({
        createdByCurrentUser: true,
      }));
    }
  }

  closeRecipePage = () => {
    history.goBack();
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }))
  }

  render() {
    const recipe = this.props.recipes.selected;
    const { list } = this.props.ingredients;
    if (!recipe) return null;

    return (
      <div className="recipePage__recipePageContainer">
        <div className="recipePage__recipePageActions">
          {
            this.state.createdByCurrentUser &&
              <PrimaryButton
                onClick={this.toggleEditing}
              >
                Edit
              </PrimaryButton>
          }
          <PrimaryButton
            onClick={() => this.closeRecipePage()}
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
                  user={this.props.user}
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
              editing={this.state.editing}
              editDone={this.toggleEditing}
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
}

const connectRecipePage = withRouter(RecipePage);

export function mapStateToProps({ user, ingredients, recipes }) {
  return {
    user: user.activeUser,
    ingredients,
    recipes,
  }
}

export default connect(
  mapStateToProps,
  {
    getRecipe,
    clearRecipe
  }
)(connectRecipePage);

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
