import {  ActionFunction, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export const action: ActionFunction = async ({ params }) => {
    if (params.contactId) {

    await deleteContact(params.contactId);
    }
    return redirect("/");
}