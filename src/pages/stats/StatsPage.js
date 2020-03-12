import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IngredientsChart from './ingredientsChart/IngredientsChart';
import StatsIcon from '../../images/icons/StatsIcon';

import './StatsPageStyles.scss';

export class StatsPage extends Component {
  showNumberOfComments = (comments) => {
    const { user } = this.props;
    const commentsWritten = comments.filter(c => c.userID === user.id);
    return commentsWritten.length || 0;
  }

  showNumberOfRatings = (recipes) => {
    const { user } = this.props;
    const timesRated = [];

    recipes.forEach(re => {
      if (re.rating) {
        re.rating.forEach(ra => {
          if (ra.user === user.id) {
            timesRated.push(ra);
          }
        })
      }
    })

    return timesRated.length || 0;
  }

  showPopularIngredients = (comments, recipes) => {
    const { user, ingredients } = this.props;
    const recipesInteractedWith = [];
    const ingredientsPresent = [];

    // Create array of recipes the user has interacted with via ratings and comments
    comments.forEach(c => {
      if (c.userID === user.id) {
        recipesInteractedWith.push(c.recipe);
      }
    })
    recipes.forEach(re => {
      if (re.rating) {
        re.rating.forEach(ra => {
          if (ra.user === user.id) {
            recipesInteractedWith.push(re.id);
          }
        })
      }
    })

    // Return null if no interaction with recipes else gather interactions
    if ((comments.length > 0 || recipes.length > 0) && recipesInteractedWith.length > 0) {
      // Filter through recipes array to make sure there's no duplicates
      const filteredRecipeList = recipesInteractedWith.filter((r, i) => recipesInteractedWith.indexOf(r) === i);

      // Loop through array to get ingredients from recipes
      filteredRecipeList.forEach(f => {
        recipes.forEach(r => {
          if (f === r.id && r.ingredients) {
            ingredientsPresent.push(r.ingredients);
          }
        })
      })

      // Reduce ingredients arrays into one array
      const masterIngredientArray = ingredientsPresent.reduce((a, b) => (a.concat(b)));

      // Loop through ingredients array to get the ingredients used
      const ingredientList = [];
      masterIngredientArray.forEach(m => {
        ingredients.forEach(i => {
          if (i.id === m) {
            ingredientList.push(i);
          }
        });
      })

      // Count how many times an ingredient is present in the array
      const ingredientsCount = {};
      ingredientList.forEach((i) => {
        ingredientsCount[i.name] = (ingredientsCount[i.name]||0) + 1;
      });

      // Convert the count object to an array ready for the chart
      const finalArray = Object.keys(ingredientsCount).map((key) => ({
        name: key,
        total: ingredientsCount[key],
        color: '#ccc',
      }));

      // Sort array to show highest number first
      const data = finalArray.sort((a, b) => (b.total - a.total));

      return data;
    } else {
      return null;
    }
  }

  render() {
    const { user, recipes, comments } = this.props;
    const ingredientData = this.showPopularIngredients(comments, recipes);
    return (
      <div className="stats__container">
        <div className="stats__header">
          <div className="stats__title">
            <StatsIcon
              className="stats__icon"
            />
            <h1>Stats</h1>
          </div>
          <p>
            As you use crumb stats about your interactions with recipes will appear here.
            These will range from simple number values from comments to charts showing your
            favourite ingredients within recipes you've interacted with.
          </p>
        </div>
        <div className="stats__row">
          <div className="stats__statBox">
            <h3
              className="stats__statBoxTitle"
            >
              Recipes Rated
            </h3>
            <div className="stats__statBoxNumber">
              {this.showNumberOfRatings(recipes)}
            </div>
          </div>
          <div className="stats__statBox">
            <h3
              className="stats__statBoxTitle"
            >
              Comments Written
            </h3>
            <div className="stats__statBoxNumber">
              {this.showNumberOfComments(comments)}
            </div>
          </div>
          <div className="stats__statBox">
            <h3
              className="stats__statBoxTitle"
            >
              Recipes Added
            </h3>
            <div className="stats__statBoxNumber">
              {
                user.recipes ?
                user.recipes.length :
                0
              }
            </div>
          </div>
        </div>
        <div className="stats__row stats__chartRow">
          <h3
            className="stats__statBoxTitle"
          >
            Most Popular Ingredients (These are ingredients included on recipes that you've rated or commented on)
          </h3>
          <IngredientsChart
            data={ingredientData}
            dataKey="total"
            barColorKey="color"
          />
        </div>
      </div>
    )
  }
}

export function mapStateToProps({ user, comments, recipes, ingredients }) {
  return {
    user: user.activeUser,
    comments: comments.list,
    recipes: recipes.list,
    ingredients: ingredients.list,
  }
}

export default connect(
  mapStateToProps,
  null
)(StatsPage);

StatsPage.propTypes = {
  user: PropTypes.object,
  comments: PropTypes.array,
  recipes: PropTypes.array,
  ingredients: PropTypes.array,
}
