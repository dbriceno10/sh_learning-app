import React from "react";
import {List, Datagrid, TextField, EditButton, DeleteButton, Edit, TextInput, SimpleForm, Create} from 'react-admin';

 export const CoursesList =(props)=>{
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="price"/>
                <TextField source="score"/>
                <TextField source="FKteacherID" label="porfesor"/>
                <TextField source="category"/>
                <TextField multiline source="description"/>
                <EditButton basePath="courses"/>
                <DeleteButton basePath="courses"/>
            </Datagrid>
        </List>

    )
}
export const CoursesEdit =(props)=>{
    return(
        <Edit {...props}>
            <SimpleForm rowClick="edit">
            <TextField source="id"/>
                <TextInput source="name"/>
                <TextInput source="price"/>
                <TextInput source="score"/>
                <TextInput source="FKteacherID" label="porfesor"/>
                <TextInput source="category"/>
                <TextInput multiline source="description"/>   
            </SimpleForm>
        </Edit>

    )
}
export const CoursesCreate =(props)=>{
    return(
        <Create {...props}>
            <SimpleForm rowClick="edit">
            <TextField source="id"/>
                <TextInput source="name"/>
                <TextInput source="price"/>
                <TextInput source="score"/>
                <TextInput source="FKteacherID" label="porfesor"/>
                <TextInput source="category"/>
                <TextInput multiline source="description"/>
            </SimpleForm>
        </Create>

    )
}