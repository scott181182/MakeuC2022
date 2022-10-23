import type { NextPage } from "next";
import { useState } from "react";



const DailyReportPage: NextPage = () => {
    const [ step, setStep ] = useState(0);

    return (
        <>
            <div className="p-8 flex-grow">
                <h1>Daily Report Page</h1>
            </div>
            <ul className="steps w-full py-4">
                <li className="step step-primary">Therapeutics</li>
                <li className={step >= 1 ? "step step-primary" : "step"}>Symptoms</li>
            </ul>
        </>
    );
};
export default DailyReportPage;
