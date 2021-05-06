import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reset } from 'redux-form';
import Modal from 'react-modal';
import moment from 'moment';

import { postRecipe } from '../../../store/actions/recipes';

import PrimaryButton from '../../../components/buttons/Buttons';
import Form from '../../../components/form/FormContainer';
import TextField from '../../../components/form/textfield/TextField';
import TextArea from '../../../components/form/textarea/TextArea';
import IngredientList from '../../../components/misc/ingredientList/IngredientList';

import './AddRecipeModal.scss';

const AddRecipeModal = ({ user, ingredients, postRecipe, open, close }) => {
  // const [tags, setTags] = useState(null);
  const [invalidSubmission, setInvalidSubmission] = useState(false);

  // function removeTag(values) {
  //   if (tags) {
  //     const arr = [
  //       ...tags,
  //     ];
  //     const filteredTags = arr.filter(t => t !== values);
  //     setTags(filteredTags);
  //   }
  // }

  function generateIngredients(values) {
    // extract ingredients from form values
    const filteredIngredients = Object.keys(values)
      .filter(key => key.startsWith('ingredient'))
      .reduce((obj, key) => {
        obj[key] = values[key];
        return obj;
      }, {});

    // generate array of ingredients for the recipe
    const ingredientList = Object.values(filteredIngredients)

    return ingredientList;
  }

  function saveRecipe(values) {
    const { name, difficulty, description } = values;

    const obj = {
      name: name,
      description: description || '',
      difficulty: difficulty,
      createdBy: {
        id: user.id,
        name: `${user.firstName} ${user.lastName ? user.lastName : ''}`,
        createdOn: moment().locale('en-gb').format('L'),
      },
      // tags: tags,
      ingredients: generateIngredients(values),
    }

    if (obj.ingredients.length === 0) {
      setInvalidSubmission(true);
    } else {
      postRecipe(obj, close);
    }
  }

  return (
    <Modal
      isOpen={open}
      contentLabel="Add Recipe"
      portalClassName="dashboard-addRecipeModal__ModalPortal"
      overlayClassName="dashboard-addRecipeModal__ModalOverlay"
      className="dashboard-addRecipeModal__Modal"
      appElement={document.querySelector('#root')}
    >
      <div className="dashboard-addRecipeModal__AddRecipeModalHeader">
        <h3>Add New Recipe</h3>
        <PrimaryButton
          onClick={close}
          border="2px solid grey"
        >
          Close
        </PrimaryButton>
      </div>
      <div>
        <Form
          form="editRecipe"
          onSubmit={(values) => saveRecipe(values)}
          submitText="Save Recipe"
          errorStatus={!!invalidSubmission}
          errorMessage="Please select one or more ingredients"
        >
          <div className="dashboard-addRecipeModal__recipeDetails">
            <Field
              name="name"
              labelText="Recipe Name"
              required
              showRequiredField
              component={TextField}
            />
            <Field
              name="description"
              labelText="Recipe Description"
              placeholder="Enter Description.."
              component={TextArea}
            />
            <Field
              name="difficulty"
              labelText="Recipe Difficulty"
              type="number"
              min={1}
              max={10}
              required
              showRequiredField
              component={TextField}
            />
          </div>
          <IngredientList
            name="Ingredients"
            ingredients={ingredients}
          />
        </Form>
      </div>
    </Modal>
  )
}

export function mapStateToProps({ user, ingredients }) {
  return {
    user: user.activeUser,
    ingredients: ingredients.list,
  }
}

export default connect(
  mapStateToProps,
  {
    reset,
    postRecipe
  }
)(AddRecipeModal);

AddRecipeModal.propTypes = {
  user: PropTypes.object,
  ingredients: PropTypes.array,
  postRecipe: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
}
