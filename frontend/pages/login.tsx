import { Formik, Form, Field } from "formik";
import { NextPage } from "next";



interface LoginFormData {
    email: string;
    password: string;
}



const LoginPage: NextPage = () => {
    const initialValues: LoginFormData = {
        email: "",
        password: ""
    };

    return (
        <div className="w-full h-screen">
            <div className="w-full h-1/3 lg:h-32 bg-primary flex items-center justify-center pb-[10vw]">
                <h1 className="text-base-100 text-6xl">Welcome</h1>
            </div>
            <div className="avatar placeholder translate-y-[-50%] translate-x-[-50%] absolute left-[50vw]">
                <div className="bg-neutral text-base-100 rounded-full w-[30vw]">
                    <span className="text-4xl">IVY</span>
                </div>
            </div>
            <div className="w-full container pt-[20vw] flex justify-center">
                <div>
                    <h1 className="text-4xl py-4 text-center">Let&apos;s Get Started</h1>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => {
                            console.log({ values, actions });
                            // TODO: use GraphQL login mutation
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
