import { createContext } from "react";
import type ContactService from "./ContactService";

export const ContactServiceContext = createContext<ContactService>(undefined!);