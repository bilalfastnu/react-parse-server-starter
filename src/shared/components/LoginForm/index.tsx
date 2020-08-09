import React from 'react';
import { Formik, Field, Form } from 'formik';

export default function LoginForm() {
    return (
        <div className="login-form">
            <Formik
                initialValues={{ name: '', email: '' }}
                onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    // eslint-disable-next-line no-alert
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form>
                    <Field name="name" type="text" />
                    <Field name="email" type="email" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
