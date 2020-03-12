import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { postSearch } from '../../store/actions/monty';

import Form from '../../components/form/FormContainer';
import IngredientList from '../../components/misc/ingredientList/IngredientList';
import MontyIcon from '../../images/icons/MontyIcon';

import './MontyPageStyles.scss';

export class MontyPage extends Component {
  state = {
    meatCheese: null,
    sauce: null,
    salad: null,
    bread: null,
    invalidSubmission: false,
    invalidSubmissionReason: '',
  }

  componentDidMount = () => {
    this.sortIngredientsIntoGroups();
  }

  //
  // Sort the ingredients into revelant type groups and set local state with them
  // for use in the ingredient list component
  sortIngredientsIntoGroups = () => {
    const ingredients = this.props.ingredients;
    const meatCheeseArray = [];
    const sauceArray = [];
    const saladArray = [];
    const breadArray = [];

    ingredients.forEach(ingred => {
      switch (ingred.type) {
        case 'meat':
          meatCheeseArray.push(ingred);
          break;
        case 'sauce':
          sauceArray.push(ingred);
          break;
        case 'salad':
          saladArray.push(ingred);
          break;
        case 'bread':
          breadArray.push(ingred);
          break;
        default:
          break;
      }
    });

    this.setState(() => ({
      meatCheese: meatCheeseArray,
      sauce: sauceArray,
      salad: saladArray,
      bread: breadArray,
    }))
  }


  //
  // Submit form & search params to database
  onSubmit = (formValues) => {
    // Remove duplicate values in Redux Form
    const fields = Object.entries(this.props.form.registeredFields);
    const arr = Object.entries(formValues);
    const ingredientsList = [];
    fields.forEach(f => {
      console.log(f);
      const neu = arr.filter(a => {
        if (a[0] === f[0]) {
          return (
            a[1]
          )
        };
        return null;
      });

      if (neu) {
        ingredientsList.push(neu[0][1]);
      }
    });

    // Turn ingredients object into array and check if it's a valid list (no duplicates, etc.)
    const checkIngredientListIsValid = ingredientsList.filter((item, index) => ingredientsList.indexOf(item) !== index);
    if (checkIngredientListIsValid.length > 0) {
      this.setState(() => ({
        invalidSubmission: true,
        invalidSubmissionReason: 'Please remove any duplicated items for the lists'
      }))
    } else {
      // Create search object and submit to database providing there are ingredients present
      const obj = {
        ingredients: ingredientsList,
        userID: this.props.user.id,
        createdOn: moment().locale('en-gb').format('L'),
      };

      if (obj.ingredients.length === 0) {
        this.setState(() => ({
          invalidSubmission: true,
          invalidSubmissionReason: 'Please select at least one ingredient',
        }))
      } else {
        this.props.postSearch(obj);
        this.setState(() => ({
          invalidSubmission: false,
        }))
      }
    }
  }

  render() {
    return (
      <div
        className="monty__container"
      >
        <div className="monty__header">
          <div className="monty__title">
            <MontyIcon
              className="monty__icon"
            />
            <h1>Monty</h1>
          </div>
          <p>Monty is here to help with all your cooking needs.
          Lacking inspiration for a meal or unsure of what to cook?
          Enter your ingredients below and hit the submit button to activate Monty.</p>
        </div>
        <Form
          form="searchForm"
          className="monty__form"
          onSubmit={this.onSubmit}
          submitText="Submit"
          errorStatus={this.state.invalidSubmission}
          errorMessage={this.state.invalidSubmissionReason}
        >
          <div
            className="monty__form-row"
          >
            <IngredientList
              type="meatCheese"
              name="Meat/Cheese"
              ingredients={this.state.meatCheese}
            />
            <IngredientList
              type="sauce"
              name="Sauce"
              ingredients={this.state.sauce}
            />
            <IngredientList
              type="salad"
              name="Salad"
              ingredients={this.state.salad}
            />
            <IngredientList
              type="bread"
              name="Bread"
              ingredients={this.state.bread}
            />
          </div>
        </Form>
      </div>
    )
  }
}

export function mapStateToProps({ ingredients, user, form }) {
  return {
    form: form.searchForm,
    user: user.activeUser,
    ingredients: ingredients.list,
  }
}

export default connect(
  mapStateToProps,
  {
    postSearch
  }
)(MontyPage);

MontyPage.propTypes = {
  ingredients: PropTypes.array,
  user: PropTypes.object,
  postSearch: PropTypes.func,
}
