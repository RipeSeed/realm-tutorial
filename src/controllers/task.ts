import {useQuery, useRealm, useUser} from '@realm/react';
import {BSON} from 'realm';
import {AddTaskType, TaskType} from '../types/task';
import {
  GET_ALL_TASKS_THERE,
  GET_ONLY_MY_TASKS,
  TASK_MODAL_NAME,
} from '../constants/realmConstants';
import {useEffect, useState} from 'react';
import {Task} from '../models/task';

export const TaskController = () => {
  const realm = useRealm();
  const user = useUser();
  const [getMine, setGetMine] = useState(false);
  const allTask = useQuery(TASK_MODAL_NAME);

  useEffect(() => {
    if (getMine) {
      realm.subscriptions.update(mutableSubscription => {
        mutableSubscription.removeByName(GET_ALL_TASKS_THERE);
        mutableSubscription.add(
          realm.objects(Task).filtered(`userId == $0`, user.id),
          {name: GET_ONLY_MY_TASKS},
        );
      });
    } else {
      console.log('asad', user.id);
      realm.subscriptions.update(mutableSubscription => {
        mutableSubscription.removeByName(GET_ONLY_MY_TASKS);
        mutableSubscription.add(realm.objects(Task), {name: GET_ONLY_MY_TASKS});
      });
    }
  }, []);

  const addTask = (task: AddTaskType) => {
    realm.write(() => {
      realm.create(TASK_MODAL_NAME, {
        ...task,
        userId: user.id,
      });
    });
  };

  const updateTask = (task: TaskType) => {
    const taskToUpdate = realm.objectForPrimaryKey(TASK_MODAL_NAME, task._id);
    console.log(taskToUpdate);
    if (taskToUpdate) {
      realm.write(() => {
        taskToUpdate.title = task.title;
        taskToUpdate.priorityLevel = task.priorityLevel;
        taskToUpdate.isComplete = task.isComplete;
      });
    }
  };

  const deleteTAsk = (id: BSON.ObjectId) => {
    const taskToDelete = realm.objectForPrimaryKey(TASK_MODAL_NAME, id);
    realm.write(() => {
      realm.delete(taskToDelete);
    });
  };

  return {
    allTask,
    addTask,
    updateTask,
    deleteTAsk,
  };
};
