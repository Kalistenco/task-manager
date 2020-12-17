import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/tasksActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.css';
import { states } from '../../constants';
import PropTypes from 'prop-types';
import Alert from '../../ui/Alert';

const TaskCreation = ({ createTask }) => {

    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        if (value.length < 10) {
            setError(true);
            return;
        };

        const body = {
            //como json-server no genera id's al crear un objeto nuevo, le asigno al id la fecha actual
            "id": Date.now(),
            "description": value,
            "state": states.PENDING
        };

        createTask(body).then(setSuccess(true));
    };

    return (
        <div className="taskCreationContainer">
            <div className="taskCreationItem" id="taskCreationinput">
                <TextField
                    error={error}
                    placeholder="What do i need to do?"
                    value={value}
                    onChange={(event) => {
                        setError(false)
                        setValue(event.target.value)
                    }}
                    variant="outlined"
                    fullWidth
                />
            </div>
            <div className="taskCreationItem">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create
            </Button>
            </div>
            <Alert
                open={error}
                onClose={() => setError(false)}
                message="Description should be at least 10 characters long!"
                type="error" />
            <Alert
                open={success}
                onClose={() => {
                    setSuccess(false);
                    setValue("");
                }}
                message="Task created successfuly!"
                type="success" />
        </div>
    );
};

TaskCreation.defaultProps = {
    createTask: () => null
};

TaskCreation.propTypes = {
    createTask: PropTypes.func
};

const mapActionsToProps = {
    createTask
};

export default connect(
    null,
    mapActionsToProps
)(TaskCreation);