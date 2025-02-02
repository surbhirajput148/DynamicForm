// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputComponent from "./formGroupComponents/inputComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./dynamicForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import formData from "./formData.json";

const DynamicForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formState1, setFormState1] = useState({});

  const formFields = () => {
    for (let key in formData) {
      if (Array.isArray(formData[key])) {
        return formData[key].map((field) => {
          return getFormComponent(field);
        });
      }
    }
  };

  const onSubmit = (data) => {
    setFormState1({ ...formState1, ...data });
    setFormState1({});
  };

  const getFormComponent = (field) => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return (
          <InputComponent
            placeholder={field.placeholder}
            name={field.id}
            label={field.label}
            type={field.type}
            value={formState1[field.id] ?? ""}
            {...register(field.id, {
              required: field.required,
              minLength:
                field.type === "password"
                  ? field.validation.minLength
                  : 0 || field.id === "username"
                  ? field.validation.minLength
                  : 0,
              maxLength:
                field.id === "username"
                  ? field.validation.maxLength
                  : undefined,
              pattern: field.type === "email" ? field.pattern : null,
            })}
            onChange={(e) => {
              setFormState1({
                ...formState1,
                [e.target.name]: e.target.value,
              });
            }}
            errors={errors}
            key={field.id}
            errorMsg={field?.validation?.message ?? ""}
            required={field.required}
          />
        );
        break;
      case "textarea":
        return (
          <InputComponent
            placeholder={field.placeholder}
            name={field.id}
            label={field.label}
            as={field.type}
            value={formState1[field.id] ?? ""}
            {...register(field.id, { required: field.required })}
            onChange={(e) => {
              setFormState1({
                ...formState1,
                [e.target.name]: e.target.value,
              });
            }}
            errors={errors}
            key={field.id}
            required={field.required}
          />
        );
        break;
    }
  };

  return (
    <div className="d-flex justify-content-md-center align-items-md-center userform-layout">
      <div className="mb-3 p-5">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-primary pb-3">{formData.formTitle}</h4>
            <h6 className="text-secondary pb-2">{formData.formDescription}</h6>
            <Form.Group as={Row} className="mb-3">
              {formFields()}
            </Form.Group>
            <input type="submit" className="btn btn-primary" />
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default DynamicForm;
