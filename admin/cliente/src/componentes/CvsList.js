import React from "react";
import {List, Datagrid, TextField,DateField, ReferenceField, FileField} from 'react-admin';

export const CvsLists =(props)=>{
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="Id"/>
                <FileField source="url" label='C.V.' title="ver archivo" target="url"/>
                <ReferenceField source="teacherId" reference= 'teachers' label='Profesor'>
                   <TextField source="email" />
                </ReferenceField>
                <DateField source="createdAt" label='Fecha'/>
            </Datagrid>
        </List>

    )
}