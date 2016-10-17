import React from 'react';
import ReactDOM from 'react-dom';
import { PhotoshopPicker as ColorPicker } from 'react-color';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      isColorPickerDisplayed: false,
      color: {
        hex: "#aaaaaa"
      },
      selectedColor: {
        hex: "#aaaaaa"
      }
    };
  }

  handleClick() {
    this.setState({
      isColorPickerDisplayed: true
    });
  }

  handleChangeComplete(color) {
    this.setState({
      selectedColor: color
    });
  }

  handleAccept(color) {
    this.setState({
      isColorPickerDisplayed: false,
      color: this.state.selectedColor
    });
  }

  handleCancel() {
    this.setState({
      isColorPickerDisplayed: false,
      selectedColor: this.state.color
    });
  }

  render() {

    const hslColor = this.state.color.hsl ? this.state.color.hsl : null;
    return (
      <div>
        { hslColor ? "h:" + hslColor.h + ", s:" + hslColor.s + ", l:" + hslColor.l : null }
        <button onClick={ this.handleClick }>Pick Color</button>
        { !this.state.isColorPickerDisplayed ?
          null :
          <ColorPicker
               color={ this.state.selectedColor.hex }
               onAccept={ this.handleAccept }
                       onCancel={ this.handleCancel }
                       onChangeComplete={ this.handleChangeComplete }
                         />
        }
      </div>
    );
  }
}

ReactDOM.render((
    <App />
), document.getElementById('example'));
