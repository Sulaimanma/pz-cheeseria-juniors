import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType, createPurchase, PurchaseRecordType } from '../App';
import { Button } from '@material-ui/core';
import { useQueryClient, useMutation } from 'react-query';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const queryClient = useQueryClient();

  //Post purchase record query
  const { mutate, isLoading } = useMutation(createPurchase, {
    onSuccess: (data) => {
      console.log(data);
      const message = 'success';
      alert(message);
    },
    onError: () => {
      alert('there was an error');
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

    const purchaseRecord = cartItems?.map((cheese) => {
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
    console.log('record', purchaseRecord);
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
