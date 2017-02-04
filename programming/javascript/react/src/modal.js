import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Modal from 'react-modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      modalOpened: false
    };
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onClick = this.onClick.bind(this);
  }


  onStart () {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop () {
    this.setState({activeDrags: --this.state.activeDrags});
  }

  onClick () {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
  }

  render() {

    const customStyles = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};

    const boxStyle = {
      boxSizing: "border-box",
      background: "#fff",
      border: "1px solid #999",
      borderRadius: "3px",
      width: "180px",
      height: "180px",
      margin: "10px",
      padding: "10px",
      float: "left",
      position: "relative"
    };

    return (
        <h1>
          <Draggable
             zIndex={100}
             { ...dragHandlers }
             >
            <div style={ boxStyle }>
              <span>Something</span>
            </div>
          </Draggable>

          <button onClick={ this.onClick }>
            Open a modal
          </button>

          <Modal isOpen={ this.state.modalOpened }
                 style={ customStyles }
                 contentLabel="Label"
                 >
            <h2>Modal Content</h2>
            <button onClick={ this.onClick }>Close</button>
          </Modal>
      </h1>
    );
  }
}

ReactDOM.render((
    <App />
), document.getElementById('example'));
