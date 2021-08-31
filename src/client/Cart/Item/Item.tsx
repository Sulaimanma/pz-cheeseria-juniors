import Button from '@material-ui/core/Button';
// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({
  item,
  handleAddToCart,
}) => {
  //Prevent div click cover the button click
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> =
    (event) => {
      handleAddToCart(item);
      event.stopPropagation();
    };
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
      <Button
        onClick={handleButtonClick}
        data-cy={`add-to-cart-${item.id}`}
      >
        Add to cart
      </Button>
    </Wrapper>
  );
};

export default Item;
