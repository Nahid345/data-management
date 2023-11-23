import { Schema, model, connect } from 'mongoose'
import { TAddress, TFullName, TOrders, TUser } from './user.interface'

const userFullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'firstName is require'],
    maxlength: [20, 'first name is more than 20 characters'],
    validate: function (value: string) {
      const nameCapitalize = value.charAt(0).toUpperCase() + value.slice(1)
      return value === nameCapitalize
    },
  },
  lastName: {
    type: String,
    required: [true, 'lastName is require'],
  },
})

const userAddressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

const userOrdersSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String },
  fullName: userFullNameSchema,
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is require'],
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: userAddressSchema,
  isActive: {
    type: Boolean,
    required: [true, 'isactive is require'],
    default: true,
  },
  orders: { type: [userOrdersSchema] },
})
