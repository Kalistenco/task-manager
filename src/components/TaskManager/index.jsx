import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import TaskCreation from '../TaskCreation';
import TaskTable from '../TaskTable';
import PropTypes from 'prop-types';

const TaskManager = ({ generalState }) => {

    return (
        <div>
            <h2>Task Manager</h2>
            <h4>General Status: {generalState}</h4>
            <TaskCreation />
            <TaskTable />
        </div>
    );
};

TaskManager.defaultProps = {
    generalState: () => null
};


TaskManager.propTypes = {
    generalState: PropTypes.string
};

const mapStateToProps = state => {
    return {
        generalState: state.reducer.generalState
    };
};

export default connect(
    mapStateToProps,
    null
)(TaskManager);