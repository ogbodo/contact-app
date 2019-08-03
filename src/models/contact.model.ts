import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ICreateContact extends mongoose.Document {
  title?: string; //initials of the contact, e.g:Mr.Mrs.
  fullName: string; //Full name of the contact
  phone: string; // The phone number of the contact
  mobile?: string; // The mobile number of the contact
  email?: string; //contact's valid email address
  homeAddress?: string; //Home address of the contact
  company?: string; //contact's company name
  country?: string; //contact's country
  state?: string; //contact's state
  street?: string; //contact's street name
  zipCode?: string; //contact's country zip code
  website?: string; //contact's website address
  note?: string; //Short note about this contact
}

const contactSchema = new Schema({
  blocked: { type: Boolean, default: false },
  title: { type: String },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  mobile: { type: String },
  email: { type: String },
  homeAddress: { type: String },
  company: { type: String },
  country: { type: String },
  state: { type: String },
  street: { type: String },
  zipCode: { type: String },
  website: { type: String },
  note: { type: String },
});

const Contact = mongoose.model<ICreateContact>('Contact', contactSchema);

export default Contact;
