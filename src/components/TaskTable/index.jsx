import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTasks } from '../../actions/tasksActions';
import Task from '../Task';
import './styles.css';
import PropTypes from 'prop-types';

const TaskTable = ({ tasks, getTasks }) => {

    useEffect(() => getTasks(), []);

    return (
        <div className="taskTable">
            <div className="taskTableHeader">
                <h4 id="taskTableHeaderLeft">Task</h4>
                <h4 id="taskTableHeaderRight">Action</h4>
            </div>
            <div className="tableDivider"></div>
            {
                tasks.length > 0 ?
                    tasks.map(task =>
                        <div className="taskTableRow" key={task.id}>
                            <Task task={task} />
                        </div>
                    ) : null
            }

        </div>
    );
};

TaskTable.defaultProps = {
    getTasks: () => null,
    tasks: []
};

TaskTable.propTypes = {
    getTasks: PropTypes.func,
    tasks: PropTypes.array
};

const mapActionsToProps = {
    getTasks,
};

const mapStateToProps = state => {
    return {
        tasks: state.reducer.data,
    };
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(TaskTable);