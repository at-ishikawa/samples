import React from 'react';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

const types = {
  ITEM: 'item'
}

const source = {
  beginDrag: (props) => {
    return props;
  }
}

const dragCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const target = {
  drop: (props, monitor) => {
    const item = monitor.getItem();
    const sourceIndex = item.index;
    const targetIndex = props.index;
    // item.drop(sourceIndex, targetIndex);
  },
  hover: (props, monitor, component) => {
    const item = monitor.getItem();
    const sourceIndex = item.index;
    const targetIndex = props.index;

    if (item.id == props.id || sourceIndex == targetIndex) {
      return;
    }

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (sourceIndex < targetIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (sourceIndex > targetIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    item.hover(item, props);
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = {
      cursor: 'move',
    };

    return this.props.connectDragSource(this.props.connectDropTarget(
        <li style={ style }>
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
          id: 1,
          text: 'This is the first item',
          order: 1
        },
        {
          id: 2,
          text: 'This is the second item',
          order: 2
        },
        {
          id: 3,
          text: 'This is the third item',
          order: 3
        },
        {
          id: 4,
          text: 'This is the forth item',
          order: 4
        }
      ]
    };
  }

  drop (sourceIndex, targetIndex) {
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
    this.setState(update(this.state, {
      items: items
    }));
  }

  hover (source, target) {
    const items = this.state.items;
    const sourceItem = items.filter(sourceItem => sourceItem.id == source.id)[0];
    const targetItem = items.filter(targetItem => targetItem.id == target.id)[0];
    const sourceIndex = items.indexOf(sourceItem);
    const targetIndex = items.indexOf(targetItem);
    [items[sourceIndex].order, items[targetIndex].order] = [
      items[targetIndex].order,
      items[sourceIndex].order
    ];
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
                     id={ item.id }
                     drop={ this.drop.bind(this) }
                     hover={ this.hover.bind(this) }
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

ReactDOM.render((
    <DraggableApplication />
), document.getElementById('example'));
