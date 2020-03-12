import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getSearch, clearSearch } from '../../../store/actions/monty';
import { history } from '../../../store/store';

import RecipeCard from '../../dashboard/recipeCard/RecipeCard';
import PrimaryButton from '../../../components/buttons/Buttons';

import './ResultsPageStyles.scss';

export class ResultsPage extends Component {
  state = {
    recipeList: [],
    selectedRecipe: null,
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;

    this.props.getSearch(id, () => this.showResults());
  }

  componentWillUnmount = () => {
    this.props.clearSearch();
  }

  showResults = () => {
    const { recipes, searchRecord } = this.props;
    const recipeList = [];

    if (searchRecord) {
      recipes.forEach(r => {
        const showRecipe = this.searchRecipes(r, searchRecord.ingredients);

        if (showRecipe) {
          recipeList.push(r);
        }
      })
    }

    if (recipeList.length > 0) {
      this.setState(() => ({
        recipeList,
        selectedRecipe: searchRecord.id,
      }))
    }
  }

  searchRecipes = (recipe, ingredients) => {
    const ingredientsArr = [];
    recipe.ingredients.forEach(r => {
      const ingredientMatches = ingredients.find(i => i === r);
      if (ingredientMatches) {
        ingredientsArr.push(ingredientMatches);
      }
    });

    const removeDupes = ingredientsArr.filter((item, index) => ingredientsArr.indexOf(item) === index);
    if (removeDupes.length === ingredients.length) {
      return true;
    }
    return false;
  }

  selectRecipe = (id) => {
    const { selectedRecipe } = this.state;
    // Add id of recipe to url
    history.push(`/monty/${selectedRecipe}/recipe/${id}`);
  }

  render() {
    const { recipeList } = this.state;
    if (this.state.recipeList.length === 0) {
      return (
        <div className="monty-results__noResultsBox">
          <h2>No Results :(</h2>
          <p>
            Monty was unsuccessful in finding a recipe from his own persona cookbook
            containing all the ingredients you've specified. Please return to the
            previous page, select some new ingredients and see whether Monty can redeem
            himself.
          </p>
          <PrimaryButton
            onClick={() => history.push('/monty')}
            className="monty-results__noResultsBoxButton"
          >
            Try Again
          </PrimaryButton>
        </div>
      )
    };

    return (
      <>
        <div
          className="monty-results__header"
        >
          <h2>Your recipes are here</h2>
          <p>
            Monty has returned and brought some recipes straight from his own personal cookbook.
            These recipes are based on the ingredients specified by yourself and can be viewed to
            see other user's ratings and comments on the recipe.
          </p>
        </div>
        <div className="monty-results__resultsRow">
          {
            recipeList.map((recipe, i) => (
              <RecipeCard
                key={i}
                recipe={recipe}
                onClick={() => this.selectRecipe(recipe.id)}
              />
            ))
          }
        </div>
      </>
    )
  }
}

export function mapStateToProps({ recipes, monty }) {
  return {
    searchRecord: monty.selected,
    recipes: recipes.list,
  }
}

export default connect(
  mapStateToProps,
  {
    getSearch,
    clearSearch
  }
)(ResultsPage);

ResultsPage.propTypes = {
  getSearch: PropTypes.func,
  match: PropTypes.object,
  clearSearch: PropTypes.func,
  recipes: PropTypes.array,
  searchRecord: PropTypes.object,
}
