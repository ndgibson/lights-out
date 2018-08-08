import React, { Component } from 'react';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import Light from '../light';
import { GRID_DIMENSION } from '../../constants';

class Grid extends Component {

  buildRow = rowIndex => {
    const row = [];
    
    for (let columnIndex = 0; columnIndex < GRID_DIMENSION; columnIndex++) {
      row.push(
        <FlexItem key={ columnIndex }>
          <Light id={ rowIndex * GRID_DIMENSION + columnIndex }/>
        </FlexItem>
      );
    }
    
    return row;
  }

  buildRows = () => {
    const rows = [];

    const rowStyle = {
      marginBottom: '1em',
    };

    for (let rowIndex = 0; rowIndex < GRID_DIMENSION; rowIndex++) {
      rows.push(
        <Flex direction="row" key={ rowIndex } style={ rowStyle }>
          { this.buildRow(rowIndex) }
        </Flex>
      );
    }

    return rows;
  };

  render () {
    const gridStyle = {
      margin: '1em',
    };

    return (
      <Flex style={ gridStyle }>
        <Flex direction="column">
          { this.buildRows() }
        </Flex>
      </Flex>
    )
  }
}

export default Grid;