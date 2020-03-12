import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Form from './Form';

export function mapStateToProps(state, props) {
  return {
    initialValues: props.initialValues,
  };
}

const FormComponent = reduxForm(
  {
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
  },
  (state, props) => (
    {
      form: props.form,
    }
  )
)(Form);

const FormContainer = connect(
  mapStateToProps
)(FormComponent);

export default FormContainer;
