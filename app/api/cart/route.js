// app/api/cart/route.js
import { Cart } from '@/models/Cart'
import connectDB from '@/utils/dbconnect';

export async function GET() {
  try {
    await connectDB();
    const cartItems = await Cart.find({}) // Adjust based on your model
    return Response.json(cartItems)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newCartItem = new Cart(data); // Adjust based on your model
    await newCartItem.save();
    return Response.json(newCartItem, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    await Cart.findByIdAndDelete(id); // Adjust based on your model
    return Response.json({ message: 'Item deleted' }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
