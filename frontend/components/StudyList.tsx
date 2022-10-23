import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useMemo } from "react";

import { GetStudiesDocument } from "../generated/graphql";



export function StudyList() {
    const { data: studyData, loading, error } = useQuery(GetStudiesDocument);

    const studyRows = useMemo(() => studyData?.studies?.map((s) => (
        <tr key={s.id}>
            <th>
                <Link href={`/studies/${s.id}`}>
                    <a>
                        {s.name}
                    </a>
                </Link>
            </th>
            <td>{s.description}</td>
            <td>{s.participantsCount}</td>
            <td>{s.medicine?.name}</td>
        </tr>
    )) || null, [ studyData?.studies ]);

    const table = studyRows ? (
        <table className="table no-stick w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Participants</th>
                    <th>Medicine</th>
                </tr>
            </thead>
            <tbody>
                {studyRows.length > 0 ? studyRows : <tr>
                    <td colSpan={4} className="text-center">
                        No Studies Found
                    </td>
                </tr>}
            </tbody>
        </table>
    ) : null;

    return (
        <section className="overflow-x-auto p-8">
            {
                studyRows ? table :
                    error ? <span>Error loading studies</span> :
                        <span>Loading studies...</span>
            }
        </section>
    );
}
