const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator"); // esta lib para manejar el error de unique
var AutoIncrement = require("mongoose-sequence")(mongoose);

let Schema = mongoose.Schema;

let ordersSchema = new Schema({
  orderDate: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 6,
  },
  deliveryDate: {
    type: String,
    maxlength: 10,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: [{ type: String, unique: false, required: true }],
  quantity: [{ type: String, unique: false, required: true }],
  delivered: {
    type: Boolean,
    default: false,
  },
  clientId: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

ordersSchema.plugin(AutoIncrement, { inc_field: "orderNumber" });
ordersSchema.plugin(uniqueValidator, {
  message: "Error, se esperaba {PATH} sea unico.",
});

module.exports = mongoose.model("Pedidos", ordersSchema);
