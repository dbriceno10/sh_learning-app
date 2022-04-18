import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  TextInput,
  SimpleForm,
  Create,
} from "react-admin";

export const CategoryList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <DeleteButton basePath="category" />
      </Datagrid>
    </List>
  );
};
// export const CategoryEdit =(props)=>{
//     return(
//         <Edit {...props}>
//             <SimpleForm rowClick="edit">
//                 <TextField disabled source="id"/>
//                 <TextInput source="name"/>
//             </SimpleForm>
//         </Edit>

//     )
// }
export const CategoryCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm rowClick="edit">
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};
