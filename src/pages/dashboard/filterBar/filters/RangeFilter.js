import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import Slider, { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

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

const RangeFilter = ({ min, max, marks, onChange }) => (
  <Range
    allowCross={false}
    handle={handle}
    min={min}
    max={max}
    marks={marks}
    defaultValue={[min, max]}
    onChange={onChange}
  />
)

export default RangeFilter;

RangeFilter.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.number,
  onChange: PropTypes.func,
}
