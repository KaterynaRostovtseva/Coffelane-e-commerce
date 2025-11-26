import React from 'react';
import {Box, DialogContent, Typography, Button} from '@mui/material';
import {StyledDialog} from "../UI/StyledDialog.js";
import {btnCart} from '../../styles/btnStyles.jsx';
import {useSelector, useDispatch} from 'react-redux';
import {
    selectCartItems,
    selectCartTotal,
    addToCart,
    decrementQuantity,
    removeFromCart
} from '../../store/slice/cartSlice.jsx';
import {useNavigate} from 'react-router-dom';
import {typography} from '../../theme/typography.js';
import emptyCartImage from '../../assets/images/cart/empty-cart.png';
import {cartStyles} from './styles.js';
import {CART_CONSTANTS, CART_MESSAGES} from './constants.js';
import ProductImage from './components/ProductImage.jsx';
import ProductHeader from './components/ProductHeader.jsx';
import ProductFooter from './components/ProductFooter.jsx';


const CartModal = ({open, onClose}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartEntries = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotal);
    const total = subtotal;

    const handleQuantityChange = (key, change) => {
        if (change === 1) {
            const cartItem = cartEntries.find(([itemKey]) => itemKey === key);
            if (cartItem) {
                const [, item] = cartItem;
                dispatch(addToCart({product: item.product, quantity: 1}));
            }
        } else if (change === -1) {
            dispatch(decrementQuantity(key));
        }
    };

    const handleRemove = (key) => {
        dispatch(removeFromCart(key));
    };

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };


    return (
        <StyledDialog 
            open={open}
            modalIsOpen={open}
            onClose={onClose}
            maxWidth={false}
            sx={cartStyles.modalContainer}
        >
            <DialogContent sx={cartStyles.dialogContent}>
                {/* Cart Header */}
                <Box sx={cartStyles.cartHeader}>
                    <Typography sx={{...typography.h3}}>
                        {CART_MESSAGES.CART_HEADER}
                    </Typography>
                </Box>

                {/* Cart Content */}
                <Box sx={cartStyles.cartContent}>
                    {cartEntries.length === 0 ? (
                        <EmptyCart/>
                    ) : (
                        <>
                            <Box sx={cartStyles.itemsContainer}>
                                <PopulatedCart
                                    cartEntries={cartEntries}
                                    handleQuantityChange={handleQuantityChange}
                                    handleRemove={handleRemove}
                                />
                            </Box>
                            <Box sx={cartStyles.orderSummaryContainer}>
                                <OrderSummary subtotal={subtotal} total={total}/>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{...btnCart, ...cartStyles.checkoutButton, ...typography.h6}}
                                    onClick={handleCheckout}
                                >
                                    {CART_MESSAGES.CHECKOUT_BUTTON}
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </DialogContent>
        </StyledDialog>
    )
        ;
};

const EmptyCart = () => (
    <Box sx={{textAlign: 'center', p: 0, m: 0, mx: '32px'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, m: 0}}>
            {/* Empty cart illustration */}
            <Box sx={{p: 0, m: 0, my: 0, mx: '58px'}}>
                <Box
                    component="img"
                    src={emptyCartImage}
                    alt="Empty cart"
                    sx={{
                        width: '100%',
                        maxWidth: '320px',
                        maxHeight: '280px',
                        height: 'auto',
                        objectFit: 'contain',
                        p: 0,
                        m: 0
                    }}
                />
            </Box>
            <Typography sx={{...typography.h4, color: '#3E3027', p: 0, m: 0, mt: 2, textAlign: 'center', overflow: 'hidden'}}>
                {CART_MESSAGES.EMPTY_CART_TITLE}
            </Typography>
            <Typography sx={{...typography.h5, color: '#3E3027', p: 0, m: 0, width: '100%', mt: 2}}>
                {CART_MESSAGES.EMPTY_CART_SUBTITLE}
            </Typography>
        </Box>
    </Box>
);

const PopulatedCart = ({cartEntries, handleQuantityChange, handleRemove}) => (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        {cartEntries.map(([key, item]) => (
            <CartItem
                key={key}
                item={item}
                itemKey={key}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
            />
        ))}
    </Box>
);

const CartItem = ({item, itemKey, handleQuantityChange, handleRemove}) => {
    const {product, quantity} = item;
    const supplies = product.supplies || [];
    const selectedSupply = supplies.find((s) => s.id === product.selectedSupplyId);
    const price = Number(selectedSupply?.price ?? product.price ?? 0);

    return (
        <Box sx={cartStyles.itemContainer}>
            <ProductImage 
                src={product.photos_url?.[0]?.url} 
                alt={product.name} 
            />
            
            <Box sx={cartStyles.contentContainer}>
                <ProductHeader 
                    name={product.name} 
                    onDelete={() => handleRemove(itemKey)} 
                />
                <ProductFooter 
                    quantity={quantity}
                    price={price * quantity}
                    onQuantityChange={(change) => handleQuantityChange(itemKey, change)}
                />
            </Box>
        </Box>
    );
};

const OrderSummary = ({subtotal, total}) => {
    return (
        <Box sx={cartStyles.orderSummary}>
            <Box sx={cartStyles.orderSummaryRowLast}>
                <Typography sx={cartStyles.textStyles.orderSummary}>Total:</Typography>
                <Typography sx={cartStyles.textStyles.orderSummary}>${parseFloat(total.toFixed(2))}</Typography>
            </Box>
        </Box>
    );
};

export default CartModal;