import React, { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import axios from 'axios';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography } from './App.styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CheeseDetailDialog from './Cart/CheeseDetailDialog/CheeseDetailDialog';
import PurchaseHistory from './Cart/PurchaseHistory/PurchaseHistory';

// Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type PurchaseRecordType = {
  title: string;
  price: number;
  description: string;
  image: string;
  id: string;
  amount: number;
  purchaseTime: string;
};
// Get cheese list
const getCheeses = async (): Promise<CartItemType[]> => await (await fetch(`api/cheeses`)).json();
// create purchase record

//set the headers for authentication
const headers = {
  paymenttoken: 'sulaiman',
};
export const createPurchase = async (data: PurchaseRecordType[]) => {
  const { data: response } = await axios.post('api/purchase', data, {
    headers: headers,
  });

  return response.data;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  // Control the purchase history open state
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  // Control the cheese detail dialog open state
  const [dialogOpen, setDialogOpen] = useState(false);
  //Determine the click card index
  const [clickCardIndex, setClickCardIndex] = useState<number>(2);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  //Get cheese query
  const { data, isLoading, error } = useQuery<CartItemType[]>('cheeses', getCheeses);

  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <StyledButton onClick={() => setPurchaseOpen(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">Recent Purchases</Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge badgeContent={getTotalItems(cartItems)} color="error" data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">Cart</Typography>
            </StyledButton>
          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          setCartOpen={setCartOpen}
          setCartItems={setCartItems}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid
            item
            key={item.id}
            xs={12}
            sm={4}
            onClick={() => {
              setDialogOpen(true);
              setClickCardIndex(item.id);
            }}
          >
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {dialogOpen && data && (
        <CheeseDetailDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          cheeseItem={data[clickCardIndex - 1]}
        />
      )}
      {purchaseOpen && <PurchaseHistory open={purchaseOpen} setOpen={setPurchaseOpen} />}
    </Wrapper>
  );
};

export default App;
