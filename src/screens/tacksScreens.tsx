import {StyleSheet, View, FlatList, SafeAreaView, Image} from 'react-native';
import React, {useState, useEffect, useCallback, useRef} from 'react';
import Task from '../components/task';
import * as COLORS from '../constants/colors';
import {TaskType} from '../types/task';
import {TaskController} from '../controllers/task';
import {FloatingActionButton} from '../components/floatinActionButton';
import {TaskComponent} from '../components/bottomSheet';
import {Text} from '@rneui/base';

const TaskScreen = () => {
  const {allTask, updateTask} = TaskController();
  const [index, setIndex] = useState(-1);
  const onPress = useCallback(
    (index: number) => {
      console.log(index, 'index is ');
      setIndex(index);
      rbSheet?.current.open();
    },
    [index],
  );
  const rbSheet = useRef();

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      {allTask.length > 0 ? (
        <FlatList
          style={{width: '100%'}}
          data={allTask}
          renderItem={({item, index}: {item: TaskType; index: number}) => (
            <Task
              isCompleted={item.isComplete}
              title={item.title}
              priorityLevel={item.priorityLevel}
              index={index}
              onPress={() => onPress(index)}
            />
          )}
        />
      ) : (
        <View>
          <Text h4>There is no task yet</Text>
        </View>
      )}
      <FloatingActionButton
        onPress={() => {
          setIndex(-1);
          rbSheet?.current.open();
        }}
      />
      <TaskComponent
        task={index >= 0 ? allTask[index] : null}
        update={index >= 0}
        rbSheet={rbSheet}
      />
    </SafeAreaView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SCREEN_BACKGROUND_COLOR,
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});
