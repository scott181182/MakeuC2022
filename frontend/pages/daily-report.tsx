import { useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SymptomReportForm } from "../components/SymptomReportForm";

import { GetDailyTherapeuticsDocument, CheckDailyTherapeuticStepDocument } from "../generated/graphql";
import { AuthContext } from "../lib/AuthContext";



const DailyReportPage: NextPage = () => {
    const router = useRouter();
    const auth = useContext(AuthContext);

    const [ step, setStep ] = useState(0);
    const [ now ] = useState(new Date());
    const { data: queryData } = useQuery(GetDailyTherapeuticsDocument, { variables: {
        today: now.toISOString()
    } });
    const [ checkDailyStep ] = useMutation(CheckDailyTherapeuticStepDocument);


    const checkItem = (tasId: string) => {
        if(!auth.user) { return; }
        checkDailyStep({
            variables: {
                today: (new Date()).toISOString(),
                userId: auth.user?.id,
                tasId
            }
        });
    };

    const content = step === 0 ? (
        <>
            <h1 className="card-title">Daily Therapeutics</h1>
            {!queryData ? <span>Could not fetch daily therapies</span> :
                queryData.therapeuticAssignments?.[0]?.therapeuticAssignmentSteps?.map((t) => <>
                    <div className="divider m-0"></div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">{t.direction}</span>
                            <input type="checkbox" className="checkbox checkbox-primary" onClick={() => checkItem(t.id)}/>
                        </label>
                    </div>
                </>) || null}
            <div className="divider mt-0 mb-8"></div>
            <div className="card-actions justify-end">
                <button className="btn btn-accent" onClick={() => setStep(1)}>
                    Next Step
                </button>
            </div>
        </>
    ) : (
        <SymptomReportForm afterSubmit={() => router.push("/")}/>
    );

    return (
        <div className="overflow-y-auto">
            <div className="p-8 pb-0">
                <div className="hero h-32 bg-secondary shadow-xl rounded-3xl">
                    <div className="hero-content flex-row-reverse">
                        <img src="/nurse.jpg" className="h-24 rounded-full shadow-2xl" alt=""/>
                        <div>
                            <p className="py-6">Let&apos;s check up with your interventions!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow-xl bg-base-100 m-8 flex-grow">
                <div className="card-body">
                    {content}
                </div>
            </div>
            <ul className="steps w-full py-4">
                <li className="step step-primary">Therapeutics</li>
                <li className={step >= 1 ? "step step-primary" : "step"}>Symptoms</li>
            </ul>
        </div>
    );
};
export default DailyReportPage;
