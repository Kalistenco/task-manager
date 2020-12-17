import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MUIalert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const Alert = ({ open, onClose, message, type, positionVertical, positionHorizontal }) => {
    return (
        <Snackbar open={open} anchorOrigin={{ vertical: positionVertical, horizontal: positionHorizontal }} autoHideDuration={6000} onClose={onClose}>
            <MUIalert onClose={onClose} severity={type}>
                {message}
            </MUIalert>
        </Snackbar>
    );
};

Alert.defaultProps = {
    open: false,
    onClose: () => null,
    message: "",
    type: "success",
    positionHorizontal: "right",
    positionVertical: "top"
};

Alert.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    positionHorizontal: PropTypes.string,
    positionVertical: PropTypes.string
};

export default Alert;