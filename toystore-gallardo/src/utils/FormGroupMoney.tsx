import { Field, ErrorMessage } from "formik";
import ShowErrorField from "./ShowErrorField";

export default function FormGroupMoney(props: formGroupTextProps) {
  return (
    <div className="input-group mb-3">
      {props.label ? <label htmlFor={props.field}>{props.label}</label> : null}
      <Field
        name={props.field}
        className="form-input-group-text"
        placeholder={props.placeholder}
      />
      <ErrorMessage name={props.field}>
        {(message) => <ShowErrorField message={message} />}
      </ErrorMessage>
    </div>
  );
}

interface formGroupTextProps {
  field: string;
  label?: string;
  placeholder?: string;
}
