import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.css';
import { connect } from 'react-redux';
import { editTask, deleteTask } from '../../actions/tasksActions';
import { states, colors } from '../../constants';
import PropTypes from 'prop-types';
import Alert from '../../ui/Alert';

const Task = ({ task, editTask, deleteTask, isLoading }) => {

    const [edit, setEdit] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [editError, setEditError] = useState(false);

    //newDescription es el valor del input de texto que aparece al editar una tarea
    //el valor inicial es la descripción anterior
    useEffect(() => {
        if (task) {
            setNewDescription(task.description);
        };
    }, [task]);

    const handleEdit = () => {
        if (newDescription.length < 10) {
            setEditError(true);
            return;
        };

        const body = {
            "id": task.id,
            "description": newDescription,
            "state": task.state
        };

        editTask(body).then(setEdit(false));
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleStateChange = (newState) => {
        const body = {
            "id": task.id,
            "description": task.description,
            "state": newState
        };

        editTask(body);
    };

    return (
        isLoading ?
            <div>
                Loading...
        </div> :
            <div className="taskContainer" style={{ display: task ? "flex" : "none" }}>

                <div className="taskDescription">
                    {
                        edit ?
                            <TextField
                                error={editError}
                                placeholder="What do i need to do?"
                                value={newDescription}
                                onChange={(event) => {
                                    setEditError(false)
                                    setNewDescription(event.target.value)
                                }}
                                variant="outlined"
                                fullWidth
                            /> : <div
                                style={{ color: task ? colors[task.state] : "black" }}>
                                {task ? task.description : ""}
                            </div>
                    }
                </div>

                <div className="taskButtons">

                    <div style={{ display: !edit ? "none" : "flex" }}>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}>
                            Ok
            </Button>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={() => setEdit(false)}>
                            Cancel
            </Button>
                    </div>

                    <div style={{ display: edit ? "none" : "flex" }}>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={() => setEdit(true)}
                            disabled={task ? task.state === states.FINISHED : false}>
                            Edit
            </Button>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={handleDelete}
                            disabled={task ? task.state === states.IN_PROGRESS : false}>
                            Delete
            </Button>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={() => handleStateChange(states.IN_PROGRESS)}
                            disabled={task ? task.state === states.IN_PROGRESS || task.state === states.FINISHED : false}>
                            Start
            </Button>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary"
                            onClick={() => handleStateChange(states.FINISHED)}
                            disabled={task ? task.state === states.SUSPEND || task.state === states.FINISHED : false}>
                            Finish
            </Button>
                        <Button
                            id="button"
                            variant="contained"
                            color="primary" onClick={() => null}
                            onClick={() => handleStateChange(states.SUSPEND)}
                            disabled={task ? task.state === states.SUSPEND || task.state === states.FINISHED : false}>
                            Suspend
            </Button>
                    </div>
                </div>
                <Alert
                    open={editError}
                    onClose={() => setEditError(false)}
                    message="Description should be at least 10 characters long!"
                    type="error"
                    positionVertical="bottom"
                    positionHorizontal="left"
                    />
            </div>
    );
};

Task.defaultProps = {
    editTask: () => null,
    deleteTask: () => null,
    isLoading: true,
    task: {}
};

Task.propTypes = {
    editTask: PropTypes.func,
    deleteTask: PropTypes.func,
    isLoading: PropTypes.bool,
    task: PropTypes.object
};

const mapActionsToProps = {
    editTask,
    deleteTask
};

const mapStateToProps = state => {
    return {
        isLoading: state.reducer.isLoading,
    };
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Task);