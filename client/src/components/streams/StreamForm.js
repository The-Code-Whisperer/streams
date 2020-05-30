import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title " />
        <Field name="description" component={this.renderInput} label="Enter Description " />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title"; // this message will show up inside renderInput, because reduxForm automatically looks for a validate function and errors property inside. When it sees the special name property in a Field tag have the same value as the error property, reduxForm sends the error value into renderInput inside an argument called "meta".
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);
