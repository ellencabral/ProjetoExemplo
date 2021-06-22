import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const CourseContext = createContext({});

export const CourseProvider = ({children}) => {
  const [courses, setCourses] = useState([]);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const getCourses = async () => {
    const unsubscribe = firestore()
      .collection('courses')
      .onSnapshot(
        //inscrevendo um listener
        querySnapshot => {
          let d = [];
          querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, ' => ', doc.data());
            const val = {
              uid: doc.id,
              campus: doc.data().campus,
              modulos: doc.data().modulos,
              name: doc.data().name,
              sigla: doc.data().sigla,
            };
            d.push(val);
          });
          //console.log(d);
          setCourses(d);
        },
        e => {
          console.log('Courses, getCourses: ' + e);
        },
      );

    return unsubscribe;
  };

  const saveCourse = async val => {
    await firestore()
      .collection('courses')
      .doc(val.uid)
      .set({
        campus: val.campus,
        modulos: val.modulos,
        name: val.name,
        sigla: val.sigla,
      })
      .then(() => {
        showToast('Dados salvos.');
      })
      .catch(e => {
        console.error('CourseProvider, save ' + e);
      });
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourses,
        saveCourse,
      }}>
      {children}
    </CourseContext.Provider>
  );
};
