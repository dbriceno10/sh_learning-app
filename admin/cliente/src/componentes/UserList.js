import React from "react";
import {
    List, Datagrid, 
    TextField, EditButton, 
    DeleteButton, Edit, 
    TextInput, SimpleForm, 
    Create, } from 'react-admin';




 export const UserList =(props)=>{
    return(
        <List {...props} >
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="lastName"/>
                <TextField source="avatar"/>
                <TextField source="role"/>          
                <EditButton basePath="students"/>
                <DeleteButton basePath="students"/>
            </Datagrid>
        </List>

    )
}
export const UserEdit =(props)=>{
    return(
        <Edit {...props}>
            <SimpleForm rowClick="edit">
                <TextInput  disabled source="id"/>
                <TextInput source="name"/>
                <TextInput source="lastName"/>
                <TextInput source="email"/>  
                <TextInput source="avatar"/>

            </SimpleForm>
        </Edit>

    )
}
export const UserCreate =(props)=>{
    return(
        <Create {...props}>
            <SimpleForm rowClick="edit">
            <TextInput  disabled source="id"/>
                <TextInput source="name"/>
                <TextInput source="lastName"/>
                <TextInput source="avatar"/>
                <TextInput source="email"/>   
                <TextInput source="password"/>  


            </SimpleForm>
        </Create>

    )
}
