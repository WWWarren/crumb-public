import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reset } from 'redux-form';
import Modal from 'react-modal';
import moment from 'moment';

import { postRecipe } from '../../../store/actions/recipes';

import PrimaryButton from '../../../components/buttons/Buttons';
import Form from '../../../components/form/FormContainer';
import TextField from '../../../components/form/textfield/TextField';
import TextArea from '../../../components/form/textarea/TextArea';
import IngredientList from '../../../components/misc/ingredientList/IngredientList';

import './AddRecipeModalStyles.scss';

export class AddRecipeModal extends Component {
  state = {
    tags: [],
    ingredients: [],
    invalidSubmission: false,
  }

  removeTag = (values) => {
    const arr = [
      ...this.state.tags,
    ];
    const tags = arr.filter(t => t !== values);
    this.setState(() => ({
      tags,
    }));
  }

  getIngredients = (list) => {
    this.setState(() => ({
      ingredients: list.values,
    }))
  }

  saveRecipe = (values) => {
    const { user } = this.props;
    const { name, difficulty, description, ...ingredients } = values;
    console.log(ingredients);

    const obj = {
      name: values.name,
      description: values.description || '',
      difficulty: values.difficulty,
      createdBy: {
        id: user.id,
        name: `${user.firstName} ${user.lastName ? user.lastName : ''}`,
        createdOn: moment().locale('en-gb').format('L'),
      },
      tags: this.state.tags,
      ingredients: Object.values(ingredients),
    }

    if (obj.ingredients.length === 0) {
      this.setState(() => ({
        invalidSubmission: true,
      }))
    } else {
      console.log(obj);
      this.props.postRecipe(obj, this.props.close);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.open}
        contentLabel="Add Recipe"
        portalClassName="dashboard-addRecipeModal__ModalPortal"
        overlayClassName="dashboard-addRecipeModal__ModalOverlay"
        className="dashboard-addRecipeModal__Modal"
        appElement={document.querySelector('#root')}
      >
        <div className="dashboard-addRecipeModal__AddRecipeModalHeader">
          <h3>Add New Recipe</h3>
          <PrimaryButton
            onClick={this.props.close}
            border="2px solid grey"
          >
            Close
          </PrimaryButton>
        </div>
        <div>
          <Form
            form="editRecipe"
            onSubmit={(values) => this.saveRecipe(values)}
            submitText="Save Recipe"
            errorStatus={!!this.state.invalidSubmission}
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
              ingredients={this.props.ingredients}
              callback={this.getIngredients}
            />
          </Form>
        </div>
      </Modal>
    )
  }
}

const connectAddRecipeModal = withRouter(AddRecipeModal);

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
)(connectAddRecipeModal);

AddRecipeModal.propTypes = {
  user: PropTypes.object,
  ingredients: PropTypes.array,
  postRecipe: PropTypes.func,
  open: PropTypes.bool,
  close: PropTypes.func,
}
