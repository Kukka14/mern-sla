
import CartItem from "../models/cartItem.model.js";

export const addToCart = async(req, res) => {
    try {
       
        const { productId, quantity, price ,product} = req.body;

     
        const cartItem = new CartItem({
            productId,
            product,
            quantity,
            price
        });

        
        await cartItem.save();

       
       // const userCart = await Cart.findOne({ user: req.userId });

       
        // userCart.items.push(cartItem);
        // await userCart.save();

       
        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding product to cart' });
    }
};

export const getCart = async (req, res) => {
    try {
       
        const allCartItems = await CartItem.find();

        res.status(200).json({ items: allCartItems });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart items' });
    }
};




// const updateCartItem = (req, res) => {
//     // Implementation to update cart item
// };

export const removeCartItem = async (req, res) => {
    const { itemId } = req.params;

    try {
        // Find the cart item by its ID and remove it from the database
        await CartItem.findByIdAndRemove(itemId);

        res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ error: 'An error occurred while removing cart item' });
    }
};



// // Export controller methods
// expoort default {
//     addToCart,
//     updateCartItem,
//     removeCartItem,
//     getCart
// };