// stores/TaskStore.js
import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import { actionTypes } from './taskActions';

let tasks = [];

class TaskStore extends EventEmitter {
  constructor() {
    super();
    dispatcher.register(this.handleActions.bind(this));
  }

  getTasks() {
    return tasks;
  }

  editTask(taskId, updatedTask) {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        this.emit('change');
    }
}


  handleActions(action) {
    switch(action.type) {
      case actionTypes.ADD_TASK:
        tasks.push(action.task);
        this.emit('change');
        break;
      case actionTypes.EDIT_TASK:
        this.editTask(action.taskId, action.updatedTask);
        this.emit('change');
        break;
      case actionTypes.GET_TASK:
        tasks = action.task;
        this.emit('change');
        break;
      case actionTypes.DELETE_TASK:
        tasks.splice(tasks.indexOf(action.task, 1))
        this.emit('change');
        break;
      default:
    }
  }
}

const taskStore = new TaskStore();
export default taskStore;
