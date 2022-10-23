import { useQuery } from "@apollo/client";
import type { NextPage } from "next";

import { StudySummary } from "../components/StudySummary";
import { GetStudiesDocument } from "../generated/graphql";



const StudySummaryPage: NextPage = () => {
    const { data: studyData, loading, error } = useQuery(GetStudiesDocument);

    return (
        <section className="p-8 flex-grow">
            {
                studyData?.studies?.[0] ? <StudySummary study={studyData.studies[0]}/> :
                    studyData?.studies ? <span>No study found for the current user</span> :
                        error ? <span>Error loading study</span> :
                            <span>Loading study information...</span>
            }
        </section>
    );
};
export default StudySummaryPage;
