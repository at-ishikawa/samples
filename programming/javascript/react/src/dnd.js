import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

const types = {
  ITEM: 'item'
}

const source = {
  beginDrag: (props) => {
    return props;
  }
}

const target = {
  drop: (props, monitor) => {
    const item = monitor.getItem();
    const sourceIndex = item.index;
    const targetIndex = props.index;
    item.changePosition(sourceIndex, targetIndex);
  },
}

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class Item extends React.Component {
  render() {

    return this.props.connectDragSource(this.props.connectDropTarget(
        <li style={{
          opacity: this.props.isDragging ? 0.5 : 1,
          cursor: 'move',
          backgroundColor: this.props.isOver && this.props.canDrop ? 'green' : 'initial'
        }}>
          { this.props.children }
        </li>
    ));
  }
}

const DndItem = DropTarget(types.ITEM, target, dropCollect)(DragSource(types.ITEM, source, dragCollect)(Item));



class DndList extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      items: [
        {
          text: 'This is the first item',
          order: 1
        },
        {
          text: 'This is the second item',
          order: 2
        },
        {
          text: 'This is the third item',
          order: 3
        },
        {
          text: 'This is the forth item',
          order: 4
        }
      ]
    };
  }

  changePosition (sourceIndex, targetIndex) {
    const items = this.state.items;
    items[sourceIndex].order = items[targetIndex].order;
    const minIndex = Math.min(sourceIndex, targetIndex);
    const maxIndex = Math.max(sourceIndex, targetIndex);
    for (let i = minIndex; i <= maxIndex; i++) {
      if (i == sourceIndex) {
        continue;
      }

      if (sourceIndex > targetIndex) {
        items[i].order++;
      } else {
        items[i].order--;
      }
    }
    this.setState({
      items: items
    });
  }

  render() {
    return (
      <ul>
        { this.state.items.sort((a, b) => a.order - b.order).map((item, index) => {
          return (
            <DndItem index={ index}
                     key={ index }
                     changePosition={ this.changePosition.bind(this) }
              >
              { item.text }
            </DndItem>
          );
        }) }
      </ul>
    );
  }
}



import { DragDropContext } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';

class Application extends React.Component {
  render() {
    return (
      <div>
        Drag and drop list:
        <DndList />
      </div>
    );
  }
}

const DraggableApplication = DragDropContext(Html5Backend)(Application);

import ReactDOM from 'react-dom';

ReactDOM.render((
    <DraggableApplication />
), document.getElementById('example'));
