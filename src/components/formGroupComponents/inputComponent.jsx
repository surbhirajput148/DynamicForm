import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const InputComponent = (props) => {
  const { register } = useForm();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    displayErrMsg();
  });

  const displayErrMsg = async () => {
    (await props?.errors[props?.name]) !== undefined
      ? setErrMsg(props.errorMsg)
      : setErrMsg("");
  };
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label>
        {props.label}{" "}
        {props.required && <span style={{ color: "red" }}>*</span>}
      </Form.Label>
      <Col sm="3">
        <Form.Control
          size="lg"
          placeholder={props.placeholder}
          name={props.name}
          {...props}
        />
      </Col>
      {errMsg && <Form.Text className="text-danger">{errMsg}</Form.Text>}
    </Form.Group>
  );
};

export default InputComponent;
