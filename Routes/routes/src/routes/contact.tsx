import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";
import { LoaderFunctionArgs, LoaderFunction } from "react-router-dom";

type Contact = {
    first: string,
    last: string,
    avatar: string,
    twitter: string,
    notes: string,
    favorite: boolean
}
export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
    const contact = await getContact(params.contactId as string);
    return { contact };
};

export default function Contact() {
    const { contact } = useLoaderData() as { contact: Contact };


    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={
                        contact.avatar ||
                        `https://robohash.org/unknown.png?size=200x200`
                    }
                    alt={`${contact.first} ${contact.last}`}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
type FavoriteProps = {
    contact: Contact
}

function Favorite({ contact }: FavoriteProps) {
    const favorite = contact.favorite;
    return (
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
}