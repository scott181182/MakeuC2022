import { useQuery } from "@apollo/client";
import { useMemo } from "react";

import { GetStudiesDocument, GetStudiesQuery } from "../generated/graphql";



export interface StudySummaryProps {
    study: {
        id: string;
        name?: string | null;
        description?: string | null;
        medicine?: { name?: string | null; } | null;
    }
}

export function StudySummary({ study }: StudySummaryProps) {
    return (
        <div className="card w-full shadow-xl bg-base-100">
            <div className="card-body">
                <h1 className="card-title">Study: {study.name}</h1>
                <hr/>
                <p>Therapeutic: {study.medicine?.name}</p>
                <p>{study.description}</p>
            </div>
        </div>
    );
}
