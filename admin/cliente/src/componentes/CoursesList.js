import React from "react";
import {List, Datagrid, TextField, EditButton,ReferenceField,  DeleteButton, Edit, TextInput, SimpleForm, Create,ReferenceArrayInput,SelectArrayInput} from 'react-admin';

 export const CoursesList =(props)=>{
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="price"/>
                <TextField source="img"/>
                <TextField multiline source="description"/>
                <ReferenceField source="teacherID" reference= 'teachers' label='Profesor'>
                   <TextField source="email" />
                </ReferenceField>              
                <TextField source="category"/>
                
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
            <TextInput disabled source="id"/>
                <TextInput source="name"/>
                <TextInput source="price"/>
                <TextInput source="img"/>
                <ReferenceArrayInput source="category" reference="category">
                        <SelectArrayInput optionText="name" />
                 </ReferenceArrayInput>
                 {/* <ReferenceArrayInput source="teachers" reference="email">
                        <SelectArrayInput optionText="email" />
                 </ReferenceArrayInput> */}
                <TextInput disabled source="teacherID" label="profesor" />
                <TextInput multiline source="description"/>   
            </SimpleForm>
        </Edit>

    )
}
export const CoursesCreate =(props)=>{
    return(
        <Create {...props}>
           <SimpleForm rowClick="edit">
            <TextInput disabled source="id"/>
                <TextInput source="name"/>
                <TextInput source="price"/>
                <TextInput source="img"/>
                <ReferenceArrayInput source="category" reference="category">
                        <SelectArrayInput optionText="name" />
                 </ReferenceArrayInput>
                 {/* <ReferenceArrayInput source="email" reference="teachers" label="email profesor">
                        <SelectArrayInput optionText="email" />
                 </ReferenceArrayInput> */}
                <TextInput source="email" label="email profesor" />
                <TextInput multiline source="description"/>   
            </SimpleForm>
        </Create>

    )
}