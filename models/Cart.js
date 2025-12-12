import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    default: '/placeholder-image.jpg',
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
  category: {
    type: String,
    enum: ['clothing', 'accessories', 'shoes', 'home'],
    default: 'clothing',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// If you want to track user carts, add this:
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Make it optional for testing
  },
  sessionId: {
    type: String,
    required: false,
  },
  items: [cartItemSchema],
  totalPrice: {
    type: Number,
    default: 0,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
export const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);