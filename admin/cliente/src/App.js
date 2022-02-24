import React from 'react';
import {Admin,Resource } from 'react-admin';
//import jsonServerProvider from 'ra-data-json-server'
//import simpleRestProvider from 'ra-data-simple-rest'
//import lb4Provider from 'react-admin-lb4' 
import {UserList, UserEdit, UserCreate} from './componentes/UserList';
import {CoursesList, CoursesEdit, CoursesCreate} from './componentes/CoursesList';
import {TeachertsList, TeachertsEdit, TeachertsCreate} from './componentes/Teacherts';
import{AdminList, AdminEdit, AdminCreate} from './componentes/Admin'
import { CategoryList ,CategoryCreate} from './componentes/CategoryList';
import {VideoList,VideoEdit,VideoCreate } from './componentes/VideoList.js';
import {OrdersList } from './componentes/StripeList.js'
import {CvsLists} from './componentes/CvsList'
import dataProvider from './dataprovider';
import authProvider from './authProvider';


function Adm() {
  return ( 
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}>

        <Resource 
        name='students'
        list={UserList}
        edit={UserEdit}
        create={UserCreate}/>
       
        <Resource 
        name='teachers'
        list={TeachertsList}
        edit={TeachertsEdit}
        create={TeachertsCreate}/>
         <Resource 
        name='courses'
        list={CoursesList}
        edit={CoursesEdit}
        create={CoursesCreate}/>
        <Resource 
        name='admins'
        list={AdminList}
        edit={AdminEdit}
        create={AdminCreate}/>
        <Resource 
        name="category"
        list={CategoryList}
        // edit={CategoryEdit}
        create={CategoryCreate}/>
        <Resource
        name='video'
        list={VideoList}
        edit={VideoEdit}
        create={VideoCreate}/>
        <Resource
        name='stripe/orders'
        list={OrdersList}
        />
        <Resource
        name='cv'
        list={CvsLists}/>
    </Admin>
   
   
   
  );
}

export default Adm;
