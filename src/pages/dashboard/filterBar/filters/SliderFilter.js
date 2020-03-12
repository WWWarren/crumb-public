import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import './SliderFilterStyles.scss';

const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class SliderFilter extends Component {
  state = {
    value: 0,
  }

  componentDidUpdate = (prevProps) => {
    const { resetFilter } = this.props;

    // Reset slider is reset filter prop is true
    if (prevProps.resetFilter !== resetFilter) {
      this.setState(() => ({
        value: 0,
      }))
    }
  }

  onChange = (value) => {
    // Send value to prop to use in filter container, etc.
    this.props.onChange(value);

    // Set slider local state to allow resetting, etc.
    this.setState(() => ({
      value: value,
    }))
  }

  render() {
    const { step, min, max, marks } = this.props;
    return (
      <Slider
        allowCross={false}
        handle={handle}
        step={step}
        min={min}
        max={max}
        marks={marks}
        onChange={this.onChange}
        value={this.state.value}
      />
    )
  }
}

export default SliderFilter;

SliderFilter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.object,
  step: PropTypes.number,
}
