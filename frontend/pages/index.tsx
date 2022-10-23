import { NextPage } from "next";
import Link from "next/link";



interface HomePageLink {
    label: string;
    route: string;
    className?: string;
    bg?: string;
}
const HOME_PAGE_LINKS: HomePageLink[] = [
    {
        label: "Daily Report",
        route: "/daily-report",
        className: "col-span-2",
        bg: "btn-accent"
    }, {
        label: "My Progress",
        route: "/profile"
    }, {
        label: "Symptom Report",
        route: "/symptom-report"
    }, {
        label: "Tutorials",
        route: "/tutorials"
    }, {
        label: "My Privacy",
        route: "/privacy"
    }, {
        label: "Study Summary",
        route: "/study"
    }, {
        label: "Contact Study Rep",
        route: "/contact-rep"
    }
];

const HomePage: NextPage = () => {
    const buttons = HOME_PAGE_LINKS.map((n) => (
        <div key={n.label} className={n.className || ""}>
            <Link href={n.route}>
                <a className={"btn btn-block h-full text-2xl text-neutral " + (n.bg ??  "btn-primary")}>
                    {n.label}
                </a>
            </Link>
        </div>
    ));
    return (
        <div className="grid p-8 gap-8 grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2 flex-grow">
            {buttons}
        </div>
    );
};

export default HomePage;
