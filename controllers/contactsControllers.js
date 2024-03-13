import { Contact } from "../db/contact.js";
import HttpError from "../helpers/HttpError.js";



export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, '-createdAt -updatedAt',{skip, limit}).populate('owner', 'name email');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
    try {
      const { id } = req.params;
    const result = await Contact.findById(id);
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
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, `Contacts with id: ${id} not found`)
    }
  res.json(result);
  } catch (error) {
    next(error)
  }

};

export const createContact =  async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, `Contacts with id: ${id} not found`)
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
    if (!result) {
      throw HttpError(404, `Contact with id: ${id} not found`)
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
};
