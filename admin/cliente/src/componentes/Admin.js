import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  PasswordInput,
  DeleteButton,
  Edit,
  TextInput,
  SimpleForm,
  Create,
} from "react-admin";

export const AdminList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="lastName" />
        <TextField source="email" />
        <TextField source="role" />
        <EditButton basePath="admins" />
        <DeleteButton basePath="admins" />
      </Datagrid>
    </List>
  );
};
export const AdminEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm rowClick="edit">
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="lastName" />
        <TextInput source="email" />
      </SimpleForm>
    </Edit>
  );
};
export const AdminCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm rowClick="edit">
        <TextInput disabled source="id" />
        <TextInput source="name" />
        <TextInput source="lastName" />
        <TextInput source="email" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Create>
  );
};
