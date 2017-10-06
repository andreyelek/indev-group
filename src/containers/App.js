import React, { Component } from "react";
//import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import Staff from "../components/Staff";
import Search from "../components/Search";

class App extends Component {
  componentWillMount() {
    this.props.actions.getStaffInfo();
  }


  render() {
    const {
      workers,
      posts,
      isFetching,
      editElementId,
      workerName
    } = this.props;
    return (
      <div className="App">
        {isFetching ? (
          <h2>Loading...</h2>
        ) : (
          <div className="content">
            <Search actions={this.props.actions} str={workerName} />
            <Staff
              actions={this.props.actions}
              workers={workers}
              posts={posts}
              editElementId={editElementId}
            />
          </div>
        )}
      </div>
    );
  }
}

const filterElements = (workers, str) => {
  if (!workers[0]) return;
  return workers.filter(
    i =>
      i.first_name.toUpperCase().indexOf(str) + 1 ||
      i.last_name.toUpperCase().indexOf(str) + 1
  );
};

const mapStateToProps = state => {
  const {workers, workerName} = state
  return {
    ...state,
    workers: filterElements(workers, workerName)
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
