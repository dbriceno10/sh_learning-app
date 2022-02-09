import React from 'react';
import {Admin,Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserList, UserEdit, UserCreate} from './componentes/UserList';
import {CoursesList, CoursesEdit, CoursesCreate} from './componentes/CoursesList';


function App() {
  return ( 
    <Admin dataProvider={jsonServerProvider('http://localhost:3001')}>
      <Resource 
      name='users'
      list={UserList}
      edit={UserEdit}
      create={UserCreate}/>
 
     <Resource 
     name='courses'
     list={CoursesList}
     edit={CoursesEdit}
     create={CoursesCreate}/>
      <Resource 
     name='teachers'
     list={CoursesList}
     edit={CoursesEdit}
     create={CoursesCreate}/>
   </Admin>
   
    
  );
}

export default App;
