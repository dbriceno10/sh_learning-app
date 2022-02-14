import React from 'react';
import {Admin,Resource } from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server'
//import simpleRestProvider from 'ra-data-simple-rest'
//import lb4Provider from 'react-admin-lb4' 
import {UserList, UserEdit, UserCreate} from './componentes/UserList';
import {CoursesList, CoursesEdit, CoursesCreate} from './componentes/CoursesList';
import {TeachertsList, TeachertsEdit, TeachertsCreate} from './componentes/Teacherts';
import { CategoryList ,CategoryCreate} from './componentes/CategoryList';
import dataProvider from './dataprovider';
import authProvider from './authProvider';


function Adm() {
  return ( 
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      

      <Resource 
      name='students'
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
      list={TeachertsList}
      edit={TeachertsEdit}
      create={TeachertsCreate}/>
      <Resource 
      name='category'
      list={CategoryList}
      // edit={CategoryEdit}
      create={CategoryCreate}
    />
   </Admin>
   
   
   
    
  );
}

export default Adm;
