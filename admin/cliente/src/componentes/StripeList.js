import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  ReferenceField,
} from "react-admin";

export const OrdersList = (props) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="amount" label="monto" />
        <ReferenceField source="studentId" reference="students" label="alumno">
          <TextField source="email" />
        </ReferenceField>
        <ReferenceField
          source="arrayCoursesId"
          reference="courses"
          label="cursos"
        >
          <TextField source="name" />
        </ReferenceField>
        <BooleanField source="status" />
        <DateField source="createdAt" label="fecha" />
      </Datagrid>
    </List>
  );
};
