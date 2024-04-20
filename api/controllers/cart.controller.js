import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, productName, productImages, price, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            cart = await Cart.create({ user: userId });
        }

        const existingCartItem = await CartItem.findOne({ cartId: cart._id, productId });

        if (existingCartItem) {
            try {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
            } catch (error) {
                console.error('Error updating item quantity in cart:', error);
                res.status(500).json({ success: false, error: 'Internal server error' });
            }
        } else {
            try {
                const cartItem = new CartItem({
                    cartId: cart._id,
                    productId,
                    p_name: productName,
                    p_img: [productImages],
                    quantity,
                    price
                });
                await cartItem.save();
                cart.items.push(cartItem._id);
                await cart.save();
                res.status(200).json({ success: true, message: 'Item added to cart successfully' });
            } catch (error) {
                console.error('Error adding new item to cart:', error);
                res.status(500).json({ success: false, error: 'Internal server error' });
            }
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


export const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cart = await Cart.findOne({ user: userId, status: 'active' }).populate('items');

        if (!cart) {
            res.status(200).json({ items: [] });
            return;
        }

        res.status(200).json({ items: cart.items });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;

        const cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            return res.status(404).json({ success: false, error: 'Active cart not found for the user' });
        }

        const cartItem = await CartItem.findOne({ _id: itemId, cartId: cart._id });

        if (!cartItem) {
            return res.status(404).json({ success: false, error: 'Item not found in the users cart' });
        }

        cart.items.pull(itemId);
        await cart.save();

        await CartItem.findByIdAndRemove(itemId);

        res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
