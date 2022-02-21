import React from "react";
import {List, Datagrid, TextField, EditButton, DeleteButton, Edit, TextInput, ReferenceField,SimpleForm, Create,ReferenceArrayInput,SelectArrayInput} from 'react-admin';

export const VideoList =(props)=>{
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="title"/>
                <TextField multiline source="description"/>
                <TextField source="url"/>
                <ReferenceField source="FKcourseID" reference= 'courses' label='curso'>
                   <TextField source="name" />
                </ReferenceField>
                <EditButton basePath="video"/>
                <DeleteButton basePath="video"/>
            </Datagrid>
        </List>

    )
}

export const VideoEdit =(props)=>{
    return(
        <Edit {...props}>
            <SimpleForm rowClick="edit">
            <TextInput disabled source="id"/>
                <TextInput source="title"/>
                <TextInput multiline source="description"/>
                <TextInput source="url"/>
                <ReferenceArrayInput source="cursoId" reference="courses" label='curso'>
                        <SelectArrayInput disabled optionText="name" />
                 </ReferenceArrayInput>
                
            </SimpleForm>
        </Edit>

    )
}

export const VideoCreate =(props)=>{
    return(
        <Create {...props}>
            <SimpleForm rowClick="edit">
            <TextInput disabled source="id"/>
                <TextInput source="title"/>
                <TextInput multiline source="description"/>
                <TextInput source="url"/>
                <ReferenceArrayInput source="cursoId" reference="courses">
                        <SelectArrayInput optionText="name" />
                 </ReferenceArrayInput>
                
            </SimpleForm>
        </Create>

    )
}