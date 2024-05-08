import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItem.model.js";

export const checkoutcart =async (req, res) => {
    try {
        const { totalPrice, userId } = req.body;

       
        const activeCart = await Cart.findOne({ user:userId, status: 'active' });

        if (!activeCart) {
            return res.status(404).json({ error: 'Active cart not found' });
        }

      
        activeCart.total = totalPrice;
        await activeCart.save();

       
        return res.status(200).json({ message: 'Checkout successful' });
    } catch (error) {
        console.error('Error during checkout:', error);
        return res.status(500).json({ error: 'An error occurred during checkout' });
    }

};

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, productName, productImages, price, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            cart = new Cart({ user: userId, status: 'active', items: [], total: 0
             });

        // Save the new cart to the database
        await cart.save();
        console.log('New cart created:', cart); 
        }

        const existingCartItem = await CartItem.findOne({ cartId: cart._id, productId });

        if (existingCartItem) {
            try {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();
                res.status(200).json({ success: true, updated:true, message: 'Item quantity updated successfully' });
            } catch (error) {
                console.error('Error updating item quantity in cart:', error);
                res.status(500).json({ success: false, updated:true, error: 'Internal server error' });
            }
        } else {
            try {
                const cartItem = new CartItem({
                    cartId: cart._id,
                    productId,
                    p_name: productName,
                    p_img: productImages,
                    quantity,
                    price
                });
                await cartItem.save();
                cart.items.push(cartItem._id);
                await cart.save();
                res.status(200).json({ success: true,updated:false, message: 'Item added to cart successfully' });
            } catch (error) {
                console.error('Error adding new item to cart:', error);
                res.status(500).json({ success: false,updated:false, error: 'Internal server error' });
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
      

        const cartItem = await CartItem.findOne({cartId: cart._id });

        if (!cartItem) {
            return res.status(404).json({ success: false, error: 'Item not found in the users cart' });
        }
      

        cart.items.pull(itemId);
        await cart.save();

        await CartItem.findByIdAndDelete(itemId);
       

        res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

export const updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ user: userId, status: 'active' });

        if (!cart) {
            return res.status(404).json({ success: false, error: 'Active cart not found for the user' });
        }

        const cartItem = await CartItem.findOne({ _id: itemId, cartId: cart._id });

        if (!cartItem) {
            return res.status(404).json({ success: false, error: 'Item not found in the user\'s cart' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ success: true, message: 'Item quantity updated successfully' });
    } catch (error) {
        console.error('Error updating item quantity in cart:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
export const getCartDetails = async (req, res) => {
    try {
        const { cartId } = req.body;

        const cart = await Cart.find({ _id: cartId });

        if (!cart) {
            return res.status(404).json({ success: false, error: 'Cart not found' });
        }
        const items = await CartItem.find({ cartId: cartId });
        res.status(200).json({items});

    } catch (error) {
        console.error('Error fetching cart details:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
