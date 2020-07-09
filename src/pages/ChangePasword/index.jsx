import React from 'react';

import ChangePasswordPage from './ChangePasswordPage';

export default class  ChangePasswordPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { hash } = this.props.match.params;
    return (
      // <ChangePasswordPage hash={hash} />
      <ChangePasswordPage />
    );
  }
}
