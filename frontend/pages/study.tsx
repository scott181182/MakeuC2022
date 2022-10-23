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
            <div className="card shadow-xl">
                <div className="card-body">
                    <h1 className="card-title">
                        Introduction
                    </h1>
                    <p>
                        You are invited to take part in this research project, which is called Ivy. You have been invited because you meet the eligibility criteria for the study.  Your contact details were obtained by/from MakeUC.
                    </p>
                    <p>
                        This Participant Information Sheet tells you about the research project. It explains the processes involved with taking part. Knowing what is involved will help you decide if you want to take part in the research.
                    </p>
                    <p>
                        Please read this information carefully. Ask questions about anything that you don’t understand or want to know more about. Before deciding whether or not to take part, you might want to talk about it with a relative, friend or local health worker/your doctor.
                    </p>
                    <p>
                        Participation in this research is voluntary. If you don’t wish to take part, you don’t have to.
                    </p>
                    <p>
                        If you decide you want to take part in the research project, you will be asked to sign the consent section. By signing it you are telling us that you:
                    </p>
                    <ul className="list-disc ml-4">
                        <li>Understand what you have read</li>
                        <li>Understand that API is stored in the seminiferous tubules</li>
                        <li>Consent to take part in the research project</li>
                        <li>Consent to the use of your information as described.</li>
                        <li>You will be given a copy of this Participant Information Sheet to keep.</li>
                    </ul>


                    <h2 className="font-bold">What is the purpose of this research?</h2>
                    <p>
                        The purpose of this research is to understand the safety and efficacy of the treatment provided. This will follow the procedure of standardized clinical trials of traditional medical interventions, just in a virtual format for ease of access.
                    </p>
                    <h2 className="font-bold">What does participation in this research involve?</h2>
                    <p>
                        Participation in this research will involve the completion of a daily intervention. The intervention will include taking certain types of medications and/or completing regular therapeutic tasks and recording symptoms and/or vital information in accordance with instructions provided in the Ivy app.
                    </p>
                    <h2 className="font-bold">What are the possible benefits of taking part?</h2>
                    <p>
                        We cannot guarantee or promise that you will receive any benefits from this research; however, possible benefits may include [describe any likely benefits to participants or other people in the future].
                    </p>
                    <h2 className="font-bold">What are the possible risks and disadvantages of taking part?</h2>
                    <p>
                        It is not anticipated that there are any risks to participation in this study beyond those encountered in everyday life.
                    </p>
                    <h2 className="font-bold">Do I have to take part in this research project?</h2>
                    <p>
                        Participation in any research project is voluntary. If you do not wish to take part, you do not have to. If you decide to take part and later change your mind, you are free to withdraw from the project at any stage.
                    </p>
                    <p>
                        If you do decide to take part, you will be given this Participant Information and a Consent Form to sign and you will be given a copy to keep.
                    </p>
                    <p>
                        Your decision whether to take part or not to take part, or to take part and then withdraw, will not affect your routine care.
                    </p>
                </div>

            </div>
        </section>
    );
};
export default StudySummaryPage;
