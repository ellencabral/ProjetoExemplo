import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const StudentContext = createContext({});

export const StudentProvider = ({children}) => {
  const [students, setStudents] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getStudents = async () => {
    const unsubscribe = firestore()
      .collection('students')
      .orderBy('name')
      .onSnapshot(
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            const val = {
              uid: doc.id,
              name: doc.data().name,
              modulos: doc.data().modulos,
              sigla: doc.data().sigla,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            };
            d.push(val);
          });
          setStudents(d);
        },
        e => {
          console.log('Students, getStudents: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveStudent = async val => {
    await firestore()
      .collection('students')
      .doc(val.uid)
      .set(
        {
          latitude: val.latitude,
          longitude: val.longitude,
          modulos: val.modulos,
          name: val.name,
          sigla: val.sigla,
        },
        {merge: true},
      )
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch(e => {
        console.error('StudentProvider, saveStudent ' + e);
      });
  };

  const deleteStudent = async val => {
    firestore()
      .collection('students')
      .doc(val)
      .delete()
      .then(() => {
        showToast('Aluno excluído.');
      })
      .catch(e => {
        console.log('StudentProvider, deleteStudent' + e);
      });
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudents,
        saveStudent,
        deleteStudent,
      }}>
      {children}
    </StudentContext.Provider>
  );
};
