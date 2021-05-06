import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import './SliderFilter.scss';

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

const SliderFilter = ({ resetFilter, onChange, step, min, max, marks }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(0);
  }, [resetFilter]);

  function changeValue(value) {
    // Send value to prop to use in filter container, etc.
    if (value > 0) {
      onChange(value);
    }

    // Set slider local state to allow resetting, etc.
    setValue(value);
  }

  return (
    <Slider
      allowCross={false}
      handle={handle}
      step={step}
      min={min}
      max={max}
      marks={marks}
      onChange={(v) => changeValue(v)}
      value={value}
    />
  )
}

export default SliderFilter;

SliderFilter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.object,
  step: PropTypes.number,
}
