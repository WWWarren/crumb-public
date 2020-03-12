import React, { Component } from 'react';
// import { connect } from 'react-redux';
import uniqid from 'uniqid';
import { Field } from 'redux-form';

import Select from '../../form/select/Select';
import PrimaryButton from '../../buttons/Buttons';

import './IngredientListStyles.scss';

class IngredientList extends Component {
  state = {
    fields: [],
  }

  //
  // Add an ingredient item/field to a component
  addListItem = () => {
    const fields = [...this.state.fields];

    // Assign an id to the field which can be used in other functions to select it
    const id = `ingredient${uniqid()}`;

    const field =
      <div
        key={id}
        id={id}
        className="misc-ingredientList__item"
      >
        <Field
          name={id}
          component={Select}
          props={{
            items: this.props.ingredients,
            itemKey: 'name'
          }}
          onChange={
            (status) => {
              console.log(status);
            }
          }
        />
        <PrimaryButton
          type="button"
          onClick={() => this.removeListItem(id)}
        >
          Remove
        </PrimaryButton>
      </div>

    fields.push(field);
    this.setState(() => ({
      fields,
    }))
  }

  removeListItem = (id) => {
    const arr = [...this.state.fields];
    const fields = arr.filter(f => f.props.id !== id);

    this.setState(() => ({
      fields,
    }));
  }

  render() {
    const { name } = this.props;
    return (
      <div className="misc-ingredientList__container">
        <div className="misc-ingredientList__header">
          <h3>{name}</h3>
          <PrimaryButton
            type="button"
            onClick={() => this.addListItem()}
            border="2px solid grey"
          >
            Add Item
          </PrimaryButton>
        </div>
        <div className="misc-ingredientList__content">
          {
            this.state.fields.length === 0 &&
            <div className="misc-ingredientList__noFieldsMessage">
              <h4>To add an ingredient press the 'Add Item' button above this message :)</h4>
            </div>

          }
          {
            this.state.fields.map(f => f)
          }
        </div>
      </div>
    )
  }
}

export default IngredientList;
