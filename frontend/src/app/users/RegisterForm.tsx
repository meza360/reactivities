import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../components/MyTextInput";
import { useStore } from "../stores/store";
import * as Yup from 'yup';
import ValidationErrors from "../components/ValidationErrors";

function RegisterForm() {
    const { userStore } = useStore();
    const { register } = userStore;

    return (
        <div ref={this}>
            <Formik
                initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
                onSubmit={(values, { setErrors }) =>
                (
                    register(values)
                        .catch(error => setErrors({ error }))
                )}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Sign up to reactivities' color="teal" textAlign="center" />
                        <MyTextInput name="displayName" placeholder="Display Name" />
                        <MyTextInput name="username" placeholder="User Name" />
                        <MyTextInput name="email" placeholder="Email" />
                        <MyTextInput name="password" placeholder="Password" type='password' />
                        <ErrorMessage
                            name="error"
                            render={() =>
                            (
                                <ValidationErrors errorArray={errors.error} />
                            )
                            }
                        />

                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            positive content='Register' type="submit" fluid ref={this} as='button'
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default observer(RegisterForm);