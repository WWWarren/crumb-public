import React, { Component } from 'react';

import StarIcon from './icons/StarIcon';

class Icon extends Component {
  renderIcon = (icon) => {
    switch (icon) {
      case 'star': return <StarIcon />;
      default: return null;
    }
  }
  render = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.94 49.94"
      className={this.props.className}
      onClick={this.props.onClick}
    >
      {this.renderIcon(this.props.icon)}
    </svg>
  );
}

export default Icon;
