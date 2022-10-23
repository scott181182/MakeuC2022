

export interface SideNavBarProps {
    menuOpen: boolean;
    setMenuOpen: (value: boolean) => void;
}

export function SideNavBar({ menuOpen, setMenuOpen }: SideNavBarProps) {
    let navClasses = "h-full w-0 bg-secondary transition-all absolute";
    if(menuOpen) { navClasses += " w-[50vw]"; }

    return (
        <nav className={navClasses}>
            <h1>this is a test</h1>
        </nav>
    );
}
