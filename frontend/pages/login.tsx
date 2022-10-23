import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { LoginWithPasswordDocument } from "../generated/graphql";



interface LoginFormData {
    email: string;
    password: string;
}

export function getStaticProps() {
    return {
        props: { navbar: false }
    };
}



const LoginPage: NextPage = () => {
    const router = useRouter();
    const [ submitLogin ] = useMutation(LoginWithPasswordDocument);
    // TODO: add loading icon and error alert.
    // const [submitLogin, { loading, error }] = useMutation(LoginWithPasswordDocument);

    const initialValues: LoginFormData = {
        email: "",
        password: ""
    };

    // eslint-disable-next-line @next/next/no-img-element
    const avatar = <img src="/ivy-leaf.png" className="p-8" alt="Ivy Icon"/>;

    return (
        <div className="w-full h-screen">
            <div className="w-full h-1/3 lg:h-32 bg-primary flex items-center justify-center pb-[10vw] border-b-8 border-secondary">
                <h1 className="text-base-100 text-6xl">Welcome</h1>
            </div>
            <div className="avatar placeholder translate-y-[-50%] translate-x-[-50%] absolute left-[50vw]">
                <div className="bg-base-100 border-secondary border-8 rounded-full w-[30vw]">
                    {avatar}
                </div>
            </div>
            <div className="w-full container pt-[20vw] flex justify-center">
                <div>
                    <h1 className="text-4xl py-4 text-center">Let&apos;s Get Started</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(variables) => {
                            return submitLogin({ variables }).then((res) => {
                                if(res.data?.authenticateUserWithPassword?.__typename === "UserAuthenticationWithPasswordSuccess") {
                                    router.push("/");
                                } else if(res.data?.authenticateUserWithPassword?.__typename === "UserAuthenticationWithPasswordFailure") {
                                    console.error(res.data.authenticateUserWithPassword.message);
                                    // TODO: error alert
                                }
                            });
                        }}
                    >
                        <Form className="w-full my-8">
                            <label className="label" htmlFor="form-email">
                                <span className="text-xl">Email</span>
                            </label>
                            <Field id="form-email" className="w-full text-xl mb-4" name="email" type="email"></Field>
                            <label className="label" htmlFor="form-password">
                                <span className="text-xl">Password</span>
                            </label>
                            <Field id="form-password" className="w-full text-xl mb-4" name="password" type="password"></Field>
                            <button className="btn btn-secondary float-right" type="submit">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
