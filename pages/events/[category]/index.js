import Image from "next/image";
import Link from "next/link";

/* this creates the web paths */
export async function getStaticPaths() {
    const { events_categories } = await import("/data/data.json");
    const allPaths = events_categories.map(event => {
        return {
            params: {
                category: event.id.toString().toLowerCase()
            }
        }
    });

    return {
        paths: allPaths,
        fallback: false
    }
}

/* this feeds the properties to the components */
export async function getStaticProps(context) {
    const { allEvents } = await import("/data/data.json");
    const id = context?.params.category;
    const data = allEvents.filter(event => event.city.toLowerCase() === id)
    return { props: { data, city: id } };
}

/* 
this is the dynamic component created for http://localhost:3000/events/[category]

aka:  3000/events/[event.id]
*/
export default function CategoryPage({ data, city }) {
    return (
        <div>
            <h1>{city}</h1>
            <div>
                {data.map(event => (
                    <Link
                    passHref
                    key={event.id}
                    href={`/events/${event.city.toLowerCase()}/${event.id}`}>
                        <Image
                            alt={`land-scape of ${event.id}`}
                            src={event.image}
                            width={400}
                            height={400} />
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                    </Link>
                    
                ))}
            </div>
        </div>
    );
}