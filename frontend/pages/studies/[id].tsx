import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { StudySummary } from "../../components/StudySummary";
import { GetStudyDocument } from "../../generated/graphql";



const StudySummaryPage: NextPage = () => {
    const router = useRouter();
    const { id: studyId } = router.query;
    const { data: studyData, loading, error } = useQuery(GetStudyDocument, { variables: { id: studyId as string } });

    return (
        <section className="p-8 flex-grow">
            {
                studyData?.study ? <StudySummary study={studyData.study}/> :
                    studyData ? <span>Study not found</span> :
                        error ? <span>Error loading study</span> :
                            <span>Loading study information...</span>
            }
        </section>
    );
};
export default StudySummaryPage;
