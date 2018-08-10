import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import Flex from 'mineral-ui/Flex';
import TextInput from 'mineral-ui/TextInput';
import { createThemedComponent } from 'mineral-ui/themes';

const Input = createThemedComponent(TextInput, ({ theme }) => ({
  TextInput_backgroundColor: 'transparent',
  TextInput_color: 'white',
  TextInput_borderColor: 'transparent',
  TextInput_paddingHorizontal: '0em',
}));

@inject('store')
@observer
class BoardPicker extends Component {

  @computed get currentPresetBoardNumber () {
    return this.props.store.presetBoardNumber;
  }

  changeBoard = (e) => {
    const {
      target: {
        value,
      }
    } = e;
    
    if(isNaN(value)){
      return;
    }

    this.props.store.changePresetBoardNumber(e.target.value);
  }

  render () {
    const textInputProps = {
      onChange: this.changeBoard,
      value: `${this.currentPresetBoardNumber}`,
      style: {
        width: '4.2em',
        textAlign: 'center',
        fontWeight: 'bold',
      }
    }

    return (
      <Flex direction="row" margin="auto">
        <Input { ...textInputProps } />
      </Flex>
    );
  }
}

export default BoardPicker;