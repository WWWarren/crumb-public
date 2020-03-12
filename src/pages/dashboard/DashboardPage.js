import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRecipes, clearRecipe } from '../../store/actions/recipes';
import { history } from '../../store/store';

import Container from '../../components/layout/Container';
import { SecondaryButton } from '../../components/buttons/Buttons';

import RecipeCard from './recipeCard/RecipeCard';
import AddRecipeModal from './addRecipeModal/AddRecipeModal';
import FilterBar from './filterBar/FilterBar';

import './DashboardPageStyles.scss';

export class DashboardPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      filters: [],
      open: false,
    }
  }

  componentDidMount = () => {
    // Get recipes from database and add them to local state
    this.props.getRecipes();
  }

  componentWillUnmount = () => {
    // Clear selected recipe from store
    this.props.clearRecipe();
  }

  selectRecipe = (id) => {
    // Open modal
    if (id === 'new') {
      this.setState(() => ({
        open: true,
      }))
    } else {
      history.push(`/dashboard/${id}`)
    }
  }

  closeModal = () => {
    // Close modal
    this.setState(() => ({
      open: false,
    }))
  }

  changeFilters = (filters) => {
    this.setState(() => ({
      filters
    }))
  }

  filterList = (values) => {
    const { filters } = this.state;
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

  render() {
    const { recipes } = this.props;
    const { open } = this.state;
    if (!recipes) return null;

    const list = recipes.map(r => {
      let total = 0;
      const rating = r.rating ? r.rating : [];

      if (rating) {
        rating.forEach((r) => {
          let num = r.rating;
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

    const newList = this.filterList(list);
    return (
      <>
      <Container
        flexDirection="column"
      >
        <FilterBar
          filters={this.state.filters}
          changeFilters={this.changeFilters}
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
                  onClick={() => this.selectRecipe(recipe.id)}
                />
              ))
            }
          </div>
        </div>
        <div
          className="dashboard__dashboardActionsRow"
        >
          <SecondaryButton
            onClick={() => this.selectRecipe('new')}
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
            close={this.closeModal}
          />
        }
      </>
    </>
    )
  }
}

export function mapStateToProps({ recipes }) {
  return {
    recipes: recipes.list,
  }
}

export default connect(
  mapStateToProps,
  {
    getRecipes,
    clearRecipe
  }
)(DashboardPage);

DashboardPage.propTypes = {
  getRecipes: PropTypes.func,
  clearRecipe: PropTypes.func,
  recipes: PropTypes.array,
}
