import React, { useContext } from "react";
import { Button, Form, Input, notification } from "antd";
import { loginApi } from "../util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginApi(email, password);

    if (res && res.ErrorCode === 0) {
      localStorage.setItem("access_token", res.access_token);
      notification.success({
        //"CREATE USER"
        message: "Đăng Nhập Thành Công",
        // Success
        description: "Hoàn Thành",
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });
      navigate("/");
    } else {
      notification.error({
        message: "Đăng Nhập Thất Bại",
        description: res?.ErrorMessage ?? "Lỗi Đăng Nhập",
      });
    }

    console.log(">> Success:", res);
  };

  return (
    <div style={{ margin: 85 }}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
