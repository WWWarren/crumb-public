import React, { useState } from 'react';
import uniqid from 'uniqid';
import { Field } from 'redux-form';

import Select from '../../form/select/Select';
import PrimaryButton from '../../buttons/Buttons';

import './IngredientList.scss';

const IngredientList = ({ ingredients, name, callback }) => {
  const [list, setList] = useState([]);

  //
  // Add an ingredient item/field to a component
  function addListItem() {
    const listItems = [...list];

    // Assign an id to the field which can be used in other functions to select it
    const id = `ingredient${uniqid()}`;

    const item =
      <div
        key={id}
        id={id}
        className="misc-ingredientList__item"
      >
        <Field
          name={id}
          component={Select}
          props={{
            items: ingredients,
            itemKey: 'name'
          }}
        />
        <PrimaryButton
          type="button"
          onClick={() => removeListItem(id)}
        >
          Remove
        </PrimaryButton>
      </div>

    listItems.push(item);
    setList(listItems);
    // if (callback && listItems) callback(listItems);
  }

  function removeListItem(id) {
    const arr = [...list];
    const listItems = arr.filter(f => f.props.id !== id);

    setList(listItems);
  }

  return (
    <div className="misc-ingredientList__container">
      <div className="misc-ingredientList__header">
        <h3>{name}</h3>
        <PrimaryButton
          type="button"
          onClick={() => addListItem()}
          border="2px solid grey"
        >
          Add Item
        </PrimaryButton>
      </div>
      <div className="misc-ingredientList__content">
        {
          list.length === 0 &&
          <div className="misc-ingredientList__noFieldsMessage">
            <h4>To add an ingredient press the 'Add Item' button above this message :)</h4>
          </div>

        }
        {list.map(f => f)}
      </div>
    </div>
  )
}

export default IngredientList;
