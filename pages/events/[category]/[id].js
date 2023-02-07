import Image from "next/image";
import style from "../../../styles/event.module.css"
import { useRouter } from "next/router";
import { useState } from "react";


export async function getStaticPaths() {
    const { allEvents } = await import("/data/data.json");
    const ids = allEvents.map(event => {

        return {
            params: {
                category: event.city.toLowerCase(),
                id: event.id.toString()
            }
        }
    });

    return {
        paths: ids,
        fallback: false,
    }
}

export async function getStaticProps(context) {

    const id = context.params.id
    const { allEvents } = await import("/data/data.json");
    const eventData = allEvents.find(event => (
        id === event.id
    ))

    return {
        props: { data: eventData }
    }
}



 /* component start */


export default function EventPage({ data }) {

    const router = useRouter();
    const [messageText, setMessageText] = useState("")

    async function handleSubmit(e) {
        setMessageText("")
        e.preventDefault();
        const emailValue = e.target.email.value
        const eventId = router.query.id;

        const emailValidationRegx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(!emailValue.match(emailValidationRegx)) {
            return setMessageText("Invalid email format! OH NOOOOOOOOO")
        }

        try {
            const response = await fetch("/api/email-registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: emailValue, eventId}),
            });


            const parsedRes = await response.json();
            setMessageText(parsedRes.message);
            
        } catch(e) {
            setMessageText(`there was a problem: ${e.message}`)
        }
    }


    return (
        <div className={style.single_page_event}>
            <Image src={data.image} width={500} height={500}
                alt={data.title} />
            <h1>{data.title}</h1>
            <p className={style.event_description}>{data.description}</p>

            <form
            onSubmit={handleSubmit}
            className={style.email_registration}>
                <label
                className={style.label}
                htmlFor="email"
                >Register for this event:
                </label>

                <input
                type="email"
                id="email"
                className={style.input}
                placeholder="write your email here!"
                />

                <button>Submit</button>
            </form>
            {
            messageText ? 
            <p className={style.message}>{messageText}</p> 
            : 
            null}

        </div>
    );
}