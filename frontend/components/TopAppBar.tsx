import Link from "next/link";
import { useState } from "react";
import { MdMailOutline, MdSettings, MdMenu } from "react-icons/md";



// export interface TopAppBarProps {
//     menuOpen: boolean;
//     setMenuOpen: (value: boolean) => void;
// }

const NAV_ITEMS = [
    {
        label: "Homepage",
        route: "/"
    }, {
        label: "Daily Report",
        route: "/daily-report"
    }, {
        label: "Profile",
        route: "/profile"
    }, {
        label: "Tutorials",
        route: "/tutorials"
    }, {
        label: "My Privacy",
        route: "/privacy"
    }, {
        label: "Contact Us",
        route: "/contact"
    }
];

export function TopAppBar() {
    const [ hasMail, setHasMail ] = useState(false);

    // TODO: animate mail icon when mail is present
    const mailIcon = hasMail ?
        <div className="indicator">
            <MdMailOutline/>
            <span className="badge badge-error indicator-item"></span>
        </div> : <MdMailOutline/>;

    return (
        <div className="navbar bg-primary h-24">
            <div className="navbar-start">
                {/* <button className="btn btn-lg btn-ghost btn-circle" onClick={() => setMenuOpen(!menuOpen)}>
                    <MdMenu/>
                </button> */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <MdMenu/>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {NAV_ITEMS.map((n) => <li key={n.label}><Link href={n.route}><a>{n.label}</a></Link></li>)}
                    </ul>
                </div>
            </div>
            <div className="navbar-center h-full">
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
                <button className="btn btn-lg btn-ghost btn-circle">
                    <MdSettings/>
                </button>
            </div>
        </div>
    );
}
