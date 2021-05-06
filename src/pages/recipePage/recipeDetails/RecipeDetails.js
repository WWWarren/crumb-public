import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import { updateRecipe } from '../../../store/actions/recipes';

import Form from '../../../components/form/FormContainer';
import Select from '../../../components/form/select/Select';
import PrimaryButton from '../../../components/buttons/Buttons';

import './RecipeDetails.scss';

const RecipeDetails = ({ 
  ingredients, 
  recipes,
  recipe,
  editing,
  editDone,
  updateRecipe
}) => {
  const [invalid, setInvalid] = useState(false);

  function showIngredients() {
    if (ingredients && recipe.ingredients) {
      const list = [];
      recipe.ingredients.forEach((x, i) => {
        const d = ingredients.find(l => l.id === x );
        if (d) {
          const obj = {
            [`ingredient${i}`]: d.id,
            name: d.name,
            type: d.type,
            color: d.color,
          }
          list.push(obj);
        }
        return null;
      });
      return list;
    }
  }

  function showRecipeFields(values) {
    const formFields = values.map((x, i) => {
      return (
        <Field
          key={i}
          name={`ingredient${i}`}
          component={Select}
          props={{
            items: ingredients,
            itemKey: 'name'
          }}
        />
      )
    });

    return formFields;
  }

  function saveRecipe(values) {
    let { name, ...ingredients } = values;

    // Turn ingredient values into array of ids for the recipe object
    ingredients = Object.values(ingredients);

    // Add everything together in one object
    const obj = {
      ...recipe,
      name: values.name,
      ingredients,
    };

    const checkIngredientListIsValid = obj.ingredients.filter((item, index) => obj.ingredients.indexOf(item) !== index);

    // Submit object to database and close edit form
    if (checkIngredientListIsValid.length > 0) {
      setInvalid(true)
    } else {
      updateRecipe(obj);
      editDone();
      setInvalid(false)
    }
  }

  if (!recipe || !recipe.ingredients) return null;

  // Run function to retrieve ingredients for recipes
  const ing = showIngredients();

  // Set up initial values for editing recipe form
  const combinedIngredients = {};
  let initialValues = {}
  if (ing.length > 0) {
    ing.forEach((x, i) => {
      combinedIngredients[`ingredient${i}`] = x[`ingredient${i}`];
    });
    initialValues = {
      ...combinedIngredients,
      name: recipe.name
    };
  }

  return (
    <div className="recipePage-recipeDetails__recipeDetailsContainer">
      {
        editing &&
          <Modal
            isOpen={true}
            contentLabel="Edit Recipe"
            overlayClassName="recipePage-recipeDetails__recipeDetailsModal"
            className="recipePage-recipeDetails__recipeDetailsModalBox"
          >
            <div
              className="recipePage-recipeDetails__recipeDetailsModalBoxHeader"
            >
              <h3>Edit Recipe Ingredients</h3>
              <PrimaryButton
                onClick={editDone}
                border="2px solid grey"
              >
                Return To Recipe
              </PrimaryButton>
            </div>
            <Form
              form="editRecipe"
              onSubmit={(values) => saveRecipe(values)}
              submitText="Save Recipe"
              initialValues={initialValues}
              display="block"
              errorStatus={!!invalid}
              errorMessage="Please remove any duplicated items for the lists"
            >
              {showRecipeFields(ing)}
            </Form>
          </Modal>
      }
      <>
        <div
          className="recipePage-recipeDetails__recipeDetailsIngredientContainer"
        >
          <h3>Ingredients</h3>
          {
            ing.map((ingred, i) => (
              <div
                key={i}
                className="recipePage-recipeDetails__recipeDetailsIngredient"
              >
                <span
                  style={{
                    background: ingred.color,
                  }}
                  className="recipePage-recipeDetails__recipeDetailsIngredientColor"
                />
                {ingred.name}
                <span className="recipePage-recipeDetails__recipeDetailsIngredientType">
                  {ingred.type}
                </span>
              </div>
            ))
          }
        </div>
        {
          recipe.tags &&
            <div
              className="recipePage-recipeDetails__recipeDetailsTagContainer"
            >
              <h3>Tags</h3>
              {
                recipe.tags &&
                <div className="recipePage-recipeDetails__recipeDetailsTagRow">
                  {recipe.tags.map((t, i) => (
                    <div
                      key={i}
                      className="recipePage-recipeDetails__recipeDetailsTag"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              }
            </div>
        }
      </>
    </div>
  )
}

export default connect(
  null,
  {
    updateRecipe
  }
)(RecipeDetails);

RecipeDetails.propTypes = {
  ingredients: PropTypes.array,
  recipes: PropTypes.array,
  recipe: PropTypes.object,
  updateRecipe: PropTypes.func,
  editDone: PropTypes.func,
  editing: PropTypes.bool
}
