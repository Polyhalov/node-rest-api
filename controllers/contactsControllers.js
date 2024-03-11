import HttpError from "../helpers/HttpError.js";
import {  addContact, getContactById, listContacts, removeContact, updateContactById } from "../services/contactsServices.js";



export const getAllContacts = async (req, res, next) => {
  try {
      const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
    const result = await getContactById(id);
      if (!result) {
        throw HttpError(404, `Contact with id:${id} not found`);
    }
    res.json(result);
    } catch (error) {
      next(error);
    }
 
}

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, `Movie with ${id} not found`)
    }
  res.json(result);
  } catch (error) {
    next(error)
  }

};

export const createContact =  async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Movie with ${id} not found`)
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
};
