import Link from "next/link";


export interface StudySummaryProps {
    study: {
        id: string;
        name?: string | null;
        description?: string | null;
        medicine?: { name?: string | null; } | null;
        participantsCount?: number | null;
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
                <p>Participants: <span className="badge badge-secondary">{study.participantsCount}</span></p>
                <div className="card-actions justify-end">
                    <Link href={`/studies/${study.id}/symptoms?start_data=`}>
                        <a className="btn btn-accent">
                            Symptom Overview
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
