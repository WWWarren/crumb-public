import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import Form from '../../../components/form/FormContainer';
import Select from '../../../components/form/select/Select';
import PrimaryButton from '../../../components/buttons/Buttons';

import SliderFilter from './filters/SliderFilter';

import './FilterBar.scss';

const FilterBar = ({ users, filters, changeFilters, ingredients }) => {
  function setFilters(item, type, filterName) {
    const name = filterName || item.name;
    const value = item.value ? item.value : (item.id || item);
    let filtersList = [...filters];

    // Create new filter object
    const obj = {
      name,
      value,
      type,
    };

    // Add/Remove filter object from active filters array
    if (filtersList.length > 0) {
      filtersList = filtersList.filter(f => f.name !== obj.name)
    }
    filtersList.push(obj);

    // Submit filters to dashboard
    changeFilters(filtersList);
  }

  return (
    <>
      <Form
        form="filterForm"
      >
        <div
          className="dashboard-filterBar__filterBar"
        >
          <div
            className={`dashboard-filterBar__filter dashboard-filterBar__slider`}
          >
            <h3
              className="dashboard-filterBar__filterTitle"
            >
              Rating
            </h3>
            <SliderFilter
              step={1}
              min={0}
              max={5}
              marks={{ 0: 0, 5: 5 }}
              onChange={(value) => setFilters(value, 'greaterThan', 'totalRating')}
              resetFilter={filters.length === 0}
            />
          </div>
          <div
            className={`dashboard-filterBar__filter dashboard-filterBar__slider`}
          >
            <h3
              className="dashboard-filterBar__filterTitle"
            >
              Difficulty
            </h3>
            <SliderFilter
              step={1}
              min={0}
              max={10}
              marks={{ 0: 0, 10: 10 }}
              onChange={(value) => setFilters(value, 'greaterThan', 'difficulty')}
              resetFilter={filters.length === 0}
            />
          </div>
          <div
            className="dashboard-filterBar__filter"
          >
            <h3
              className="dashboard-filterBar__filterTitle"
            >
              Ingredients
            </h3>
            <Field
              name="ingredients"
              component={Select}
              props={{
                items: ingredients,
                itemKey: 'name',
                onClick: (e) => setFilters(e, 'noMatch', 'ingredients')
              }}
            />
          </div>
          <div
            className="dashboard-filterBar__filter"
          >
            <h3
              className="dashboard-filterBar__filterTitle"
            >
              Created By
            </h3>
            <Field
              name="createdBy"
              component={Select}
              props={{
                items: users,
                itemKey: 'firstName',
                onClick: (e) => setFilters(e, 'match', 'createdBy')
              }}
            />
          </div>
          <div
            className="dashboard-filterBar__filterBtn"
          >
            <PrimaryButton
              type="button"
              onClick={() => changeFilters([])}
            >
              Reset Filters
            </PrimaryButton>
          </div>
        </div>
      </Form>
    </>
  )
}

export function mapStateToProps({ ingredients, user }) {
  return {
    ingredients: ingredients.list,
    users: user.list,
  }
}

export default connect(
  mapStateToProps,
  null
)(FilterBar);

FilterBar.propTypes = {
  users: PropTypes.array,
  ingredients: PropTypes.array,
  filters: PropTypes.array,
  changeFilters: PropTypes.func,
}
