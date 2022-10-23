import type { NextPage } from "next";



const TUTORIAL_CARDS = [
    {
        title: "Taking Blood Pressure",
        uri: "https://www.youtube-nocookie.com/embed/cWyjqXX5Zgo?start=40"
    }, {
        title: "Swallowing Pills",
        uri: "https://www.youtube-nocookie.com/embed/-a5b2u7MG7U"
    }
];

const TutorialsPage: NextPage = () => {
    return (
        <div className="p-8">
            {TUTORIAL_CARDS.map((c) => <section key={c.uri} className="card shadow-xl">
                <div className="card-body">
                    <h1 className="card-title">{c.title}</h1>
                    <iframe width="415" height="233" src={c.uri} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </section>)}
        </div>
    );
};
export default TutorialsPage;
