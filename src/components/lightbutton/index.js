import React, { Component } from 'react';
import Button from 'mineral-ui/Button';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject("store")
@observer
class LightButton extends Component {

  static propTypes = {
    id: PropTypes.number,
  };

  @computed get onOff () {
    return this.props.store.lightbuttons[this.props.id];
  }
  
  onClick = () => {
    this.props.store.clickLightButton(this.props.id);
  };

  render () {
    const buttonProps = {
      onClick: this.onClick,
      primary: this.onOff,
    };

    return (
      <Button { ...buttonProps }/>
    );
  }
}

export default LightButton;