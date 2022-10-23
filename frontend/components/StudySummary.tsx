import Link from "next/link";
import { useContext } from "react";
import { GetStudyQuery } from "../generated/graphql";
import { AuthContext } from "../lib/AuthContext";



export interface StudySummaryProps {
    study: GetStudyQuery["study"];
}

export function StudySummary({ study }: StudySummaryProps) {
    const auth = useContext(AuthContext);

    if(!study) { return null; }
    const therapeutics = study.therapeutics ? study.therapeutics.map((t) => <span key={t.name} className="badge badge-accent">{t.name}</span>) : "none";

    return (
        <div className="card w-full shadow-xl bg-base-100">
            <div className="card-body">
                <h1 className="card-title">Study: {study.name}</h1>
                <hr/>
                <p>Therapeutics: {therapeutics}</p>
                <p>{study.description}</p>
                <p>Participants: <span className="badge badge-secondary">{study.participantsCount}</span></p>
                {auth.user?.role !== "patient" ? <div className="card-actions justify-end">
                    <Link href={`/studies/${study.id}/symptoms?start_date=${study.startDate}`}>
                        <a className="btn btn-accent">
                            Symptom Overview
                        </a>
                    </Link>
                </div> : null}
            </div>
        </div>
    );
}
