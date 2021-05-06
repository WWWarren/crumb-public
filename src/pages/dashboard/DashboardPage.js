import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { getRecipes, clearRecipe } from '../../store/actions/recipes';

import Container from '../../components/layout/Container';
import { SecondaryButton } from '../../components/buttons/Buttons';

import RecipeCard from './recipeCard/RecipeCard';
import AddRecipeModal from './addRecipeModal/AddRecipeModal';
import FilterBar from './filterBar/FilterBar';

import './DashboardPage.scss';

const DashboardPage = ({ getRecipes, clearRecipe, history, recipes }) => {
  const [filters, setFilters] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getRecipes();

    return () => {
      clearRecipe();
    };
  }, [getRecipes, clearRecipe]);

  function selectRecipe(id) {
    // Open modal
    if (id === 'new') {
      setOpen(true)
    } else {
      history.push(`/dashboard/${id}`)
    }
  }

  function filterList(values) {
    let list = [...values];

    filters.forEach(f => {
      if (f.type === 'greaterThan') {
        list = list.filter(l => {
          return Number(l[f.name]) >= Number(f.value);
        });
      } else if (f.type === 'noMatch') {
        list = list.filter(l => {
          const item = l[f.name].findIndex(i => i === f.value);
          return item !== -1;
        });
      } else if (f.type === 'match') {
        list = list.filter(l => l[f.name].id === f.value);
      }
    });

    return list;
  }

  if (!recipes) return null;
  const list = recipes.map(r => {
    let total = 0;
    const rating = r.rating ? r.rating : [];

    if (rating) {
      rating.forEach((ra) => {
        let num = ra.rating;
        num = Number(num);
        total = total + num;
      });
    }

    const obj = {
      ...r,
      totalRating: (total / rating.length),
    }

    return obj;
  })

  const newList = filterList(list);
  return (
    <>
    <Container
      flexDirection="column"
    >
      <FilterBar
        filters={filters}
        changeFilters={(f) => setFilters(f)}
      />
      <div
        className="dashboard__recipesRow"
      >
        <div
          className="dashboard__recipesColumn"
        >
          {
            newList.map((recipe, i) => (
              <RecipeCard
                key={i}
                recipe={recipe}
                onClick={() => selectRecipe(recipe.id)}
              />
            ))
          }
        </div>
      </div>
      <div
        className="dashboard__dashboardActionsRow"
      >
        <SecondaryButton
          onClick={() => selectRecipe('new')}
        >
          Add Recipe
        </SecondaryButton>
      </div>
    </Container>
    <>
      {
        open &&
        <AddRecipeModal
          open={open}
          close={() => setOpen(false)}
        />
      }
    </>
  </>
  )
}

export function mapStateToProps({ recipes }) {
  return {
    recipes: recipes.list,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    getRecipes,
    clearRecipe
  }
)(DashboardPage));

DashboardPage.propTypes = {
  getRecipes: PropTypes.func,
  clearRecipe: PropTypes.func,
  recipes: PropTypes.array,
}
