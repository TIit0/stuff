import Image from "next/image";
import Link from "next/link";


export async function getStaticProps(context) {
    const {events_categories} = await import("/data/data.json");
    return {
        props: {
            data: events_categories,
        }
    }
}

export default function Events({data}) {

    return (
        <div>
            <h1>Events landing page</h1>
            <div>
                {data.map(event => (
                    <Link
                    key={event.id}
                    href={`/events/${event.id}`}>
                        <Image
                        src={event.image}
                        alt={event.title}
                        width={300}
                        height={300}/>
                        <h2>{event.title}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}

