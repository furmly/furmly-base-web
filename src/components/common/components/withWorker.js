import React from "react";
import PropTypes from "prop-types";

const WorkerContext = React.createContext(null);

export class WorkerProvider extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.worker = new Worker(this.props.location || "worker.js");
  }
  componentWillUnmount() {
    this.worker.terminate();
  }
  render() {
    return (
      <WorkerContext.Provider value={this.worker}>
        {this.props.children}
      </WorkerContext.Provider>
    );
  }
}

WorkerProvider.propTypes = {
  location: PropTypes.string
};

export default WrappedComponent => {
  class WorkerConsumer extends React.PureComponent {
    render() {
      return (
        <WorkerContext.Consumer>
          {worker => <WrappedComponent {...this.props} worker={worker} />}
        </WorkerContext.Consumer>
      );
    }
  }
  return WorkerConsumer;
};
