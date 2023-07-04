import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUser } from "../../store/user/actionCreators";
import loginUser from "../../helpers/requests/loginUser";

interface PropTypes {
  changeComponent: () => void;
}

export const Login: React.FC<PropTypes> = ({ changeComponent }) => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  let inputs = {
    email: "",
    password: "",
  };

  const [showNotification, setShowNotification] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateInputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputs = { ...inputs, [e.target.name]: e.target.value };
  };

  const logButtonHandler = async () => {
    const result = await loginUser(inputs);
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
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item rules={[{ required: true, message: "Please input your Username!" }]}>
        <Input onChange={updateInputsHandler} style={{ width: "300px" }} name="email" prefix={<UserOutlined rev="user-icon" className="site-form-item-icon" />} placeholder="Username" />
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

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        {showNotification ? <h3>{showNotification}</h3> : <></>}
        <Button onClick={logButtonHandler} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a onClick={changeComponent}>No account? Register!</a>
      </Form.Item>
    </Form>
  );
};
