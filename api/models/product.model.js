import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema({
  catalogRef: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog', 
    required: true
  },
  sellerRef: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
 
}
,  { timestamps: true });

const Product = model('Product', productSchema);

export default Product;
