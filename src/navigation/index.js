import React from 'react';

import {AuthUserProvider} from '../context/AuthUserProvider';
import {CourseProvider} from '../context/CourseProvider';
import Routes from './Routes';

export default function Providers() {
  return (
    <AuthUserProvider>
      <CourseProvider>
        <Routes />
      </CourseProvider>
    </AuthUserProvider>
  );
};
