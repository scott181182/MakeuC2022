import type { NextPage } from "next";
import { useRouter } from "next/router";

import { SymptomReportForm } from "../components/SymptomReportForm";



const SymptomReportPage: NextPage = () => {
    const router = useRouter();
    const afterSubmit = () => {
        router.push("/");
    };

    return (
        <section className="p-8 flex-grow">
            <div className="card w-full shadow-xl bg-base-100">
                <div className="card-body">
                    <SymptomReportForm afterSubmit={afterSubmit}/>
                </div>
            </div>
        </section>
    );
};
export default SymptomReportPage;
