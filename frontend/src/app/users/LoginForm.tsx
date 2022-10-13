import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import MyTextInput from "../components/MyTextInput";
import { useStore } from "../stores/store";

function LoginForm() {
    const { userStore } = useStore();
    const { login } = userStore;

    return (
        <div ref={this}>
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) =>
                (
                    login(values)
                        .catch(error => setErrors({ error: 'Invalid email or password' }))
                )}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Login to reactivities' color="teal" textAlign="center" />
                        <MyTextInput name="email" placeholder="Email" />
                        <MyTextInput name="password" placeholder="Password" type='password' />
                        <ErrorMessage
                            name="error"
                            render={() =>
                            (
                                <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error.toString()} />
                            )
                            }
                        />
                        <Button loading={isSubmitting} positive content='Login' type="submit" fluid ref={this} as='button' />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(LoginForm);