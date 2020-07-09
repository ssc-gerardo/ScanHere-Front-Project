import React from 'react';
// import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
// import { Button, Label } from 'reactstrap';

export default class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    // bound functions
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    // component state
    this.state = {
      email: '',
    };
  }

  // update state as email value changes
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleValidSubmit();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    console.log("msg sended")
    // const { resetPasswordFunction } = this.props;
    // const formData = this.state;
    // resetPasswordFunction(formData.email);

    // using Twilio SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      // 
      to: 'gerardo_fl_ssc@outlook.com',
      from: 'yayot18@hotmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    console.log("msg sended")
  }


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <p>
            Si usted quiere cambiar su conteraseña, por favor escriba su email aqui 
            y se le hara llegar un link a su correo para cambiar su contraseña.
          </p>
          <form >
            {/* <AvGroup> */}
              <label for="userEmail">Email</label>
              <input
                id="userEmail"
                name="email"
                onChange={this.handleEmailChange}
                onKeyPress={this.handleKeyPress}
                placeholder="noreply@scanhere.com"
                required
                type="email"
                value={this.state.email}
              />
              {/* <AvFeedback>A valid email is required to reset your password.</AvFeedback> */}
            {/* </AvGroup> */}
            <button type='submit' className='m-4 button py-2 px-4 registrarPromo ' onClick={this.handleValidSubmit}>Cambiar contraseña</button>
            {/* <button color="primary">Cambiar contraseña</button> */}
          </form>
        </div>
      </div>
    );
  }
}