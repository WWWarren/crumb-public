import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import moment from 'moment';

import { postSearch } from '../../store/actions/monty';

import Form from '../../components/form/FormContainer';
import IngredientList from '../../components/misc/ingredientList/IngredientList';
import MontyIcon from '../../images/icons/MontyIcon';

import './MontyPage.scss';

const MontyPage = ({ ingredients, form, user, postSearch, history }) => {
  const [groups, setGroups] = useState({
    meatCheese: null,
    sauce: null,
    salad: null,
    misc: null,
  });
  const [submission, setSubmission] = useState({
    invalidSubmission: false,
    invalidSubmissionReason: '',
  });

  useEffect(() => {
    sortIngredientsIntoGroups();
  });

  //
  // Sort the ingredients into revelant type groups and set local state with them
  // for use in the ingredient list component
  function sortIngredientsIntoGroups() {
    const meatCheeseArray = [];
    const sauceArray = [];
    const saladArray = [];
    const miscArray = [];

    ingredients.forEach(ingred => {
      switch (ingred.type) {
        case 'meat':
          meatCheeseArray.push(ingred);
          break;
        case 'cheese':
          meatCheeseArray.push(ingred);
          break;
        case 'sauce':
          sauceArray.push(ingred);
          break;
        case 'salad':
          saladArray.push(ingred);
          break;
        case 'misc':
          miscArray.push(ingred);
          break;
        default:
          break;
      }
    });

    setGroups({
      meatCheese: meatCheeseArray,
      sauce: sauceArray,
      salad: saladArray,
      misc: miscArray,
    })
  }

  //
  // Submit form & search params to database
  function onSubmit(formValues) {
    // Remove duplicate values in Redux Form
    if (form && form.values && form.registeredFields) {
      const fields = Object.entries(form.registeredFields);
      const arr = Object.entries(formValues);
      const ingredientsList = [];
      fields.forEach(f => {
        const neu = arr.filter(a => {
          if (a[0] === f[0]) {
            return (
              a[1]
            )
          }
          return null;
        });

        if (neu) {
          ingredientsList.push(neu[0][1]);
        }
      });

      // Turn ingredients object into array and check if it's a valid list (no duplicates, etc.)
      const checkIngredientListIsValid = ingredientsList.filter((item, index) => ingredientsList.indexOf(item) !== index);
      if (checkIngredientListIsValid.length > 0) {
        setSubmission({
          invalidSubmission: true,
          invalidSubmissionReason: 'Please remove any duplicated items for the lists'
        })
      } else {
        // Create search object and submit to database providing there are ingredients present
        const obj = {
          ingredients: ingredientsList,
          userID: user.id,
          createdOn: moment().locale('en-gb').format('L'),
        };

        if (obj.ingredients.length === 0) {
          setSubmission({
            invalidSubmission: true,
            invalidSubmissionReason: 'Please select at least one ingredient',
          })
        } else {
          postSearch(obj, history);
          setSubmission({
            invalidSubmission: false,
            invalidSubmissionReason: '',
          })
        }
      }
    } else {
      setSubmission({
        invalidSubmission: true,
        invalidSubmissionReason: 'Please select at least one ingredient',
      })
    }
  }

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
        onSubmit={onSubmit}
        submitText="Submit"
        errorStatus={submission.invalidSubmission}
        errorMessage={submission.invalidSubmissionReason}
      >
        <div
          className="monty__form-row"
        >
          <IngredientList
            type="meatCheese"
            name="Meat/Cheese"
            ingredients={groups.meatCheese}
          />
          <IngredientList
            type="sauce"
            name="Sauce"
            ingredients={groups.sauce}
          />
          <IngredientList
            type="salad"
            name="Salad"
            ingredients={groups.salad}
          />
          <IngredientList
            type="misc"
            name="Misc."
            ingredients={groups.misc}
          />
        </div>
      </Form>
    </div>
  )
}

export function mapStateToProps({ ingredients, user, form }) {
  return {
    form: form.searchForm,
    user: user.activeUser,
    ingredients: ingredients.list,
  }
}

export default withRouter(connect(
  mapStateToProps,
  {
    postSearch
  }
)(MontyPage));

MontyPage.propTypes = {
  ingredients: PropTypes.array,
  user: PropTypes.object,
  postSearch: PropTypes.func,
}
