import React, { Component } from 'react';
import Button from 'mineral-ui/Button';
import { createStyledComponent } from 'mineral-ui/styles';
import PropTypes from 'prop-types';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';

const StyledButton = createStyledComponent(Button, {
  '&:focus': {
    'box-shadow': 'none',
  },
});

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
      size: 'jumbo',
    };

    return (
      <StyledButton { ...buttonProps }/>
    );
  }
}

export default LightButton;