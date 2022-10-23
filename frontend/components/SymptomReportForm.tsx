import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useContext } from "react";

import { ReportSymptomsDocument, SymptomReportCreateInput } from "../generated/graphql";
import { AuthContext, AuthContextUser } from "../lib/AuthContext";



interface SymptomReportFormData {
    symptom: string;
    occurredOn: Date;
    notes: string;
}

export interface SymptomReportFormProps {
    afterSubmit?(): void;
}



export function SymptomReportForm({ afterSubmit }: SymptomReportFormProps) {
    const auth = useContext(AuthContext);
    const [ submitSymptoms ] = useMutation(ReportSymptomsDocument);
    // TODO: add loading icon and error alert.
    // const [submitLogin, { loading, error }] = useMutation(LoginWithPasswordDocument);

    const initialValues: SymptomReportFormData = {
        symptom: "",
        occurredOn: new Date(),
        notes: ""
    };

    return (
        <div>
            <h1 className="text-4xl py-4 text-center">Symptom Form</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    if(!auth.user) { return; }
                    const data: SymptomReportCreateInput = {
                        ...values,
                        user: { connect: { id: auth.user.id } }
                    };
                    return submitSymptoms({ variables: { data } }).then((res) => {
                        afterSubmit?.();
                    });
                }}
            >
                <Form className="w-full my-8">
                    <label className="label" htmlFor="form-symptom">
                        <span className="text-xl">Symptom</span>
                    </label>
                    <Field id="form-symptom" className="w-full text-xl mb-4 input input-bordered" name="symptom"></Field>
                    <label className="label" htmlFor="form-notes">
                        <span className="text-xl">Notes</span>
                    </label>
                    <Field id="form-notes" className="w-full text-xl mb-4 textarea textarea-bordered" name="notes" as="textarea"></Field>
                    <button className="btn btn-secondary float-right" type="submit">
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}
