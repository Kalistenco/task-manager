import React from 'react';
import { connect } from 'react-redux';
import './styles.css';
import TaskCreation from '../TaskCreation';
import TaskTable from '../TaskTable';
import PropTypes from 'prop-types';
import { colors } from '../../constants';

const TaskManager = ({ generalState }) => {

    return (
        <div>
            <h2>Task Manager</h2>
            <div style={{ color: generalState !== "" ? colors[generalState] : "black", fontWeight: 500 }}>General Status: {generalState}</div>
            <TaskCreation />
            <TaskTable />
        </div>
    );
};

TaskManager.defaultProps = {
    generalState: ""
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