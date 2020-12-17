import { states } from '../constants';

export function getGeneralState(tasks) {
    let areEqual = true;
    let isInProgress = false;

    if (tasks.length === 0) {
        return "";
    };

    if (tasks.length === 1) {
        return tasks[0].state;
    };

    for (var i = 0; i < tasks.length - 1; i++) {
        if (tasks[i].state !== tasks[i + 1].state) {
            areEqual = false;
        };
    };

    if (areEqual) {
        return tasks[0].state;
    } else {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].state === states.IN_PROGRESS) {
                isInProgress = true;
                break;
            };
        };

        if (isInProgress) {
            return states.IN_PROGRESS;
        } else {
            return "";
        };
    };
};
