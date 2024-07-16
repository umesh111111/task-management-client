// actions/TaskActions.js
import dispatcher from './dispatcher';
import {createTask, putTask, removeTask, getTasks} from '../services/dataService';
import { toast } from 'react-toastify';

export const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  EDIT_TASK: 'EDIT_TASK',
  DELETE_TASK: 'DELETE_TASK',
  GET_TASK: "GET_TASK"
};

export async function addTask(task) {
  try {
    delete task.id;
    const response = await createTask(task);
    if(response) {
      dispatcher.dispatch({
        type: actionTypes.ADD_TASK,
        task: response
      });
      toast.success('Task Created successfully.');
    }
  } catch (error) {
    toast.error('Error while creating task.');
  } 
}

export async function editTask(taskId, updatedTask) {
  try {
    dispatcher.dispatch({
      type: actionTypes.EDIT_TASK,
      taskId,
      updatedTask
    });
    const response = await putTask(updatedTask);
    if(response) {
      dispatcher.dispatch({
        type: actionTypes.EDIT_TASK,
        taskId,
        updatedTask
      });
      toast.success('Task Updated successfully.');
    }
  } catch (error) {
    toast.error('Error while updating task.');
  } 
}

export async function getTask(taskId) {
  try {
    const response = await getTasks(taskId);
    if(response) {
      dispatcher.dispatch({
        type: actionTypes.GET_TASK,
        task: response
      });
    }
  } catch (error) {
    toast.error('Error while getting tasks.');
  } 
}
  export async function deleteTask(task) {
    try {
      const response = await removeTask(task);
      if(response) {
        toast.success('Task Deleted successfully.');
        dispatcher.dispatch({
          type: actionTypes.DELETE_TASK,
          task: task
        });
      }
    } catch (error) {
      toast.error('Error while Deleting tasks.');
    } 
  }
