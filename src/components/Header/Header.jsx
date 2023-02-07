import Link from "next/link";
import style from "./Header.module.css"
import Image from "next/image";


export default function Header() {
    return (
        <header className={style.header}>
            <div className={style.topNav}>
                <Image
                    alt="company logo"
                    src={"/images/Asset_1.png"} width={50} height={50}
                    className={style.logo} />

                <nav className={style.topNav__nav}>
                    <ul className={style.topNav__nav_ul}>
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                        <li>
                            <Link href='/events'>Events</Link>
                        </li>
                        <li>
                            <Link href='/about-us'>About us</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <h1 className={style.header_title}>
                Sed ut Perspiciantis unde omnis
            </h1>
        </header>
    );
}