import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { MdMailOutline, MdSettings } from "react-icons/md";



function labelizeRoute(route: string) {
    return route === "" ? "Homepage" : route
        .replaceAll("-", " ")
        .replace(/(^| )[a-z]/g, (val) => val.toUpperCase());
}

export function TopAppBar() {
    const router = useRouter();
    const [ hasMail, setHasMail ] = useState(false);

    const crumbs = useMemo(() => {
        const routeParts = router.route === "/" ? [ "" ] : router.route.split("/");
        return routeParts.map((p, i) => ({ label: labelizeRoute(p), route: "/" + routeParts.slice(0, i + 1).join("/") }));
    }, [ router.route ]);
    console.log(crumbs);

    // TODO: animate mail icon when mail is present
    const mailIcon = hasMail ?
        <div className="indicator">
            <MdMailOutline/>
            <span className="badge badge-error indicator-item"></span>
        </div> : <MdMailOutline/>;

    return (
        <>
            <div className="navbar bg-primary h-24">
                <div className="navbar-start h-full">
                    <Link href="/">
                        <a className="h-full">
                            <img src="/ivy-tag.png" alt="Ivy" className="h-full"/>
                        </a>
                    </Link>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-lg btn-ghost btn-circle">
                        {mailIcon}
                    </button>
                    <button className="btn btn-lg btn-ghost btn-circle mx-4">
                        <MdSettings/>
                    </button>
                </div>
            </div>
            <div className="w-full bg-secondary px-4">
                <div className="breadcrumbs">
                    <ul>
                        {crumbs.map((n) => <li key={n.label}><Link href={n.route}><a>{n.label}</a></Link></li>)}
                    </ul>
                </div>
            </div>
        </>
    );
}
