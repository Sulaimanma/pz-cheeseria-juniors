import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType, PurchaseRecordType } from '../App';
import { Button } from '@material-ui/core';
import { useQueryClient, useMutation } from 'react-query';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { createPurchase } from '../Api/CheeseApi';
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

const Cart: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
  setCartOpen,
  setCartItems,
}) => {
  const queryClient = useQueryClient();

  //Post purchase record query
  const { mutate, error } = useMutation(createPurchase, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'You purchase these cheese successfully';
      setCartItems([]);
      alert(message);

      setCartOpen(false);
    },
    onError: () => {
      alert(`You met the error in the purchase: ${error}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  //Handle click on purchase button
  const purchaseItems = (items: CartItemType[]) => {
    //Get the purchase time
    let purchaseTime = moment().format('DD-MM-YYYY hh:mm:ss');

    //Initialize the record data props
    const purchaseRecord: PurchaseRecordType[] = cartItems?.map((cheese) => {
      const record = {
        id: uuid(),
        title: cheese.title,
        price: cheese.price,
        amount: cheese.amount,
        image: cheese.image,
        description: cheese.description,
        purchaseTime: purchaseTime,
      };
      return record;
    });
    mutate(purchaseRecord);
  };

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button variant="contained" onClick={() => purchaseItems(cartItems)}>
        Purchase
      </Button>
    </Wrapper>
  );
};

export default Cart;
