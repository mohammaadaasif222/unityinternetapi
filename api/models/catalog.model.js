import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CatalogSchema = new Schema({
  sellerRef: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product' 
  }]
},  { timestamps: true });

const Catalog = model('Catalog', CatalogSchema);

export default Catalog;
