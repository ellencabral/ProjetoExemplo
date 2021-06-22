import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {CourseProvider} from '../context/CourseProvider';
import {StudentProvider} from '../context/StudentProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <CourseProvider>
        <StudentProvider>
          <Routes />
        </StudentProvider>
      </CourseProvider>
    </AuthUserProvider>
  );
};
