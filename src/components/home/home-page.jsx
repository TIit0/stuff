import Link from "next/link";
import Image from "next/image";
import style from "./home-page.module.css"

export default function HomePage({ data }) {
    return (
        <div className={style.main}>
            {data.map(event => (
                <Link
                    className={style.main__card}
                    key={event.id}
                    href={`/events/${event.id}`}>
                    <div >
                        <Image className={style.main__card_img}
                            alt={`land-scape of ${event.title}`}
                            src={event.image}
                            width={400}
                            height={400}
                        />
                    </div>

                    <div className={style.main__card_content}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}