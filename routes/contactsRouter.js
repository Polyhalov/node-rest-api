import express from "express";

import validateBody from "../helpers/validateBody.js";
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { createContact, deleteContact, getAllContacts, getOneContact, updateContact, updateFavorite } from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/isValidId.js";


const contactsRouter = express.Router();



contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), updateFavorite);


export default contactsRouter;
