import React from 'react';
import { Field, reduxForm } from 'redux-form'; // this is for... well i'll copy paste what i wrote from reducers/index.js: // see the documentation and cool stuff like wizard (though not used here I think) so we can have a form module (use variable) inside this reducer, and name it formReducer so we know it comes from redux-form library within this page. 
// also apparently it wraps the coding for response to onChange parts of the DOM, the action creator, and reducer, into one somehow??
// to use, wrap the class component in the way shown at the bottom with the export default.
// reduxForm function allows us to call an action creator and get some form data into our component automatically (I guess without the typical onChange -> action creator -> reducer etc method)

// make a class instead of a functional component because of helper functions
class StreamForm extends React.Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        // keep in mind, semantic ui by default hides ui error messages. Have to add an error classname to the CSS in form. Error is specially recogized as a classname in semantic ui to allow displaying of errors in forms.
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // for our Field component prop. renderInput will be passed some properties by reduxForm, since it is what we are assigning the component property. These properties include input (which includes a pre-hooked onChange) and meta. So we could write <input onChange={formProps.input.onChange} value={formProps.input.value} />.
  // Remember, anytime we have an input element, whether in React, Redux, or reduxForm, there has to be an onChange callback handler to handle the value property of the input.
  // We can use a shortened syntax instead of the onChange stuff, according to the documentation: <input {...formProps.input} />. This takes all properties of input and add them as properties to the input element. This is better since it uses all the properties instead of just those onChange and Value onces like in our previous example.
  // also for shortening, we use destructuring, since repeatedly typing formProps is redundant.
  // also remember to use an arrow function so the "this" is in the current context.
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}` // touched is true if touched by the user. Use this to modify classname based on whether meta has an error and the user has touched the form. If so, add the error classname to the Form component div. As a reminder, this operator is called the ternary operator, with a condition ? if true : if false.
    return (
      <div className={className}>
        <label>{label}</label>
        <input autoComplete="off" {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  // so usually the event object passed in has a default behaviour that refreshes the page, and we write in event.preventDefault. But reduxForm is connected to this helper function, because the helper function is written within a class component wrapped in reduxForm. The pre-set props within a reduxForm component has a prop called handleSubmit(), which we can pass this.onSubmit into. When we do that, handleSubmit automatically puts in event as an argument and calls event.preventDefault(), so the page is not refreshed when we do this. Doesn't have to be called event btw, we call it formValues because handleSubmit passes in an object with the properties being key value pairs of the names and values of the form inputs, so great!

  // need to make a request to our API
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.onSubmit(formValues);
  }
  // where are we actually submitting this shit? How do I set up the API server that holds the streams, and submit to it? Well to set up the json server, go to npmjs.com/package/json-server. We use json server instead of setting up something from scratch with Express or others because json server adheres to REST conventions, meaning route paths will work normally.
  // make a foldier called api, npm init in it, package.json will be installed, so we can install the json server library in (npm install --save json-server)
  // json server documentation says make a db.json file which will automatically save all data, here with only one resource type: streams. (resource just means data). inside the db, start it by manually saving in { "streams": []}. In package.json file, delete the default test script, to auto-start the db.json server by typing in "start": "json-server -p 3001 -w db.json" meaning using json server, run in port 3001, watching the db.json file for any changes.

  render() {
    // if you console.log(this.props) here you'll see many usable properties which came from redux form once hooked up
    // console.log(this.props);
    // the Field component imported from the redux form library at the top
    return (
      // ui form makes this shit automatically look okay. Error, despite being pre-set css, looks pretty decent here for validation checking. Add error so display is set to show errors instead of none (set to none by default).
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        {/* Field has been imported at the top, pre-written by reduxForm. it requires the name prop, giving the name of the property this field enters to. Not a title or label on the screeen. This will be called title since it refers to the title of the stream. Field will automatically be part of the redux form system, but by itself does not make anything on the screen such as a text input appear. The only way to make anything render is to put a component prop which we have to input the desired JSX into. We can further customize this Field element by using any of the pre-set props, such as label. Now that label is a property, we can further customize it inside the renderInput component function, as Field will pass label into the component function as a property for us. Keep in mind this label won't actually show up as a label in Field otherwise! It's not a special name that Field recognizes as a label, we define it ourselves in this.renderInput! */}
        <Field name="title" component={this.renderInput} label="Enter Title " />
        <Field name="description" component={this.renderInput} label="Enter Description " />
        {/* ui button primary comes from semantic ui. Remember, semantic.min.css has already been loaded into our html page, so it will specially understand the semantic ui library. */}
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// we need some validation! We don't want any streams with literally no inputs, right? Hard at first but it's just a pattern. 1. form is rendered or user interacts with form (clicking on, away, types, well maybe not types) 2. validate(formValues) 3. check did the user enter valid inputs?
// this function is not within the formRedux class component. It just doesn't need to be. This is a reusable independent function instead of a helper function. Although I feel like it might be helpful since it would have access to all those props, for detecting formChanges. But I guess not, since the class can call it whenever it detects a change itself with a helper function.
// as we said in the first step, this function is run every time there is interaction with the form. How? Because the validate keyword has been wrapped inside form (it's a special keyword and looks for a validate function on the page).
const validate = (formValues) => {
  const errors = {};
  // if there is no formValues title property
  if (!formValues.title) {
    // make a key value pair inside the errors object
    errors.title = "You must enter a title"; // a key-value pair will show up as a property of an argument called meta inside renderInput. ReduxForm automatically looks for a validate function on the same page (when the validate keyword is wrapped) and errors property inside. When it sees the name property in a Field tag have the same value as the error property, reduxForm will send that pair in the meta argument.
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors; // if this object is empty then reduxForm will know our form has no errors. If it does, display the contents.
}

// package it in a special reduxForm way instead of using connect. Technically we could send this right to the App render as a component but we never call StreamForm in the App render. Instead we just package it up, and allow StreamCreate and other components to call StreamForm to have a ready made form :) just use the onSubmit keyword (in docs but also common to other form html syntax) to use the result from this form, as seen in StreamCreate and in this page. Also validate by the docs is just an argument I can add require validation (non empty fields)
export default reduxForm({ // now that reduxForm has been hooked up, this class will be given a ton of pre-made props. The point is to pick out whatever props we want to build out our form.
  form: 'streamForm', // this is to tell reduxForm what the form name is
  validate // this tells reduxForm to include validation
})(StreamForm);
