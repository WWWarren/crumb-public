import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from 'react-scrollbars-custom';

import arrowDownIcon from '../../../images/icons/arrow-down-icon.svg';
import arrowUpIcon from '../../../images/icons/arrow-up-icon.svg';

import './SelectStyles.scss';

class SelectBox extends Component {
  constructor(props) {
    super(props);

    this.root = document.querySelector(`.form-select__${props.id}`);
    this.el = document.createElement('div');
  }

  componentDidMount = () => {
    this.root.appendChild(this.el);
  }

  componentWillUnmount = () => {
    this.root.removeChild(this.el);
  }

  showItems = () => {
    const { items } = this.props;
    if (items) {
      const item = items.map((item, i) => (
        <div
          key={i}
          onClick={() => this.props.selectItem(item)}
          className="form-select__selectOption"
        >
          <span className="form-select__selectOptionName">{item[this.props.itemKey]}</span>
          {item.type ? <div className="form-select__selectOptionType">{item.type}</div> : ''}
        </div>
      ))
      return item;
    };
  }

  render() {
    return ReactDOM.createPortal(
      <Scrollbar
        style={{ width: this.props.selectBoxWidth + 3, height: 125, position: 'fixed', zIndex: 999 }}
      >
        <div
          className="form-select__selectOptions"
        >
          {this.showItems()}
        </div>
      </Scrollbar>,
      this.el,
    );
  }
}


class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.value ? props.value : null,
      open: false,
    }

    this.selectBox = React.createRef();
  }

  toggleOpenOptions = () => {
    this.setState((prevState) => ({
      open: !prevState.open
    }))
  }

  selectItem = (item) => {
    const { input, onClick } = this.props;
    input.onChange(item.id);

    this.setState(() => ({
      open: false,
      selected: item[this.props.itemKey],
    }))

    if (onClick) onClick(item);
  }

  render() {
    const { input } = this.props;

    return (
      <div
        className={`form-select__selectContainer form-select__${input.name}`}
        style={{
          marginBottom: this.props.addMargin ? 10 : 0,
        }}
      >
        <div
          {...input}
          className={`form-select__selectBox ${this.state.open ? 'form-select__selectBox_open' : ''}`}
          onClick={() => this.toggleOpenOptions()}
          ref={this.selectBox}
        >
          {this.state.selected ? this.state.selected : 'Select'}
          <img className="form-select__selectArrow" src={this.state.open ? arrowUpIcon : arrowDownIcon} alt="" />
        </div>
        {
          this.state.open &&
            <SelectBox
              id={input.name}
              items={this.props.items}
              itemKey={this.props.itemKey}
              selectItem={this.selectItem}
              selectBoxWidth={this.selectBox.current ? this.selectBox.current.clientWidth : 0}
            />
        }
      </div>
    )
  }
}

export default Select;
