import React, { Component } from 'react';
import styled from 'styled-components';

import PrimaryButton from '../buttons/Buttons';

const FormWrapper = styled.form`
  padding: ${props => props.padding || '0'};
  width: ${props => props.width || '100%'};
  position: relative;
`;

const SubmitButtonWrapper = styled.div`
  width: ${props => props.width || '100%'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ErrorMessageWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  background: #EE6352;
  color: #fff;
  border: 2px solid #D35847;
  text-align: center;
  padding: 10px;
`;

const SuccessMessageWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  background: #7EA16B;
  color: #fff;
  border: 2px solid #698759;
  text-align: center;
  padding: 10px;
`;

class Form extends Component {
  render() {
    const {
      handleSubmit,
      children,
      submitText,
      className,
      errorStatus,
      errorMessage,
      successfulSubmission,
      successMessage
    } = this.props;
    return (
      <FormWrapper
        onSubmit={handleSubmit}
        className={className}
      >
        {children}
        {
          submitText &&
            <SubmitButtonWrapper>
              <PrimaryButton
                action="submit"
                border="2px solid grey"
              >
                {submitText}
              </PrimaryButton>
            </SubmitButtonWrapper>
        }
        {
          errorStatus &&
            <ErrorMessageWrapper>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </ErrorMessageWrapper>
        }
        {
          successfulSubmission &&
            <SuccessMessageWrapper>
              <SuccessMessage>{successMessage}</SuccessMessage>
            </SuccessMessageWrapper>
        }
      </FormWrapper>
    )
  }
}

export default Form;
