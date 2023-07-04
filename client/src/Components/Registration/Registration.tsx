import React, { useState } from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import registrateUser from "../../helpers/requests/registrateUser";
import { getUser } from "../../store/user/actionCreators";

interface PropTypes {
  changeComponent: () => void;
}

export const Registration: React.FC<PropTypes> = ({ changeComponent }) => {
  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };

  let inputs = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };

  const [showNotification, setShowNotification] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateInputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs = { ...inputs, [e.target.name]: e.target.value };
  };

  const signButtonHandler = async () => {
    const result = await registrateUser(inputs);
    if (result.isApproved) {
      delete result.isApproved;
      dispatch(getUser(result));
      navigate("/");
    } else {
      setShowNotification(() => result.notification);
      setTimeout(() => {
        setShowNotification(() => "");
      }, 5000);
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      // onFinish={onFinish}
    >
      <Form.Item rules={[{ required: true, message: "Please input your Username!" }]}>
        <Input onChange={updateInputsHandler} style={{ width: "300px" }} name="name" prefix={<UserOutlined rev="user-icon" className="site-form-item-icon" />} placeholder="Name" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your Username!" }]}>
        <Input onChange={updateInputsHandler} style={{ width: "300px" }} name="surname" prefix={<UserOutlined rev="user-icon" className="site-form-item-icon" />} placeholder="Surname" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your Username!" }]}>
        <Input onChange={updateInputsHandler} style={{ width: "300px" }} name="email" prefix={<MailOutlined rev="mail-icon" className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

      <Form.Item rules={[{ required: true, message: "Please input your Password!" }]}>
        <Input
          onChange={updateInputsHandler}
          style={{ width: "300px" }}
          name="password"
          prefix={<LockOutlined rev="password-icon" className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        {showNotification ? <h3>{showNotification}</h3> : <></>}
        <Button onClick={signButtonHandler} type="primary" htmlType="submit" className="login-form-button">
          Sign up
        </Button>
        Or <a onClick={changeComponent}>Already have an account? Log in!</a>
      </Form.Item>
    </Form>
  );
};
