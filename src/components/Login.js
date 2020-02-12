import React, { useState } from "react";
import { Form, Checkbox, Button, Card, Icon} from "semantic-ui-react";

export default function Login({ login, register }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    if (isLogin) {
      login(credentials);
    } else {
      register(credentials);
    }
    emptyFormFields();
  };

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const emptyFormFields = () => {
    setCredentials({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <>
      <Card style={{
         left: '40%',top: '7%' }}>
        
        <Form style={{ margin: '5%'}}>
          <h1 style={{fontWeight:'bold'}}>Login</h1>
          <Form.Field>
            <input placeholder='Email' />
          </Form.Field>
          <Form.Field>
            <input placeholder="password" type='password' />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Card>
    </>
  );
}
