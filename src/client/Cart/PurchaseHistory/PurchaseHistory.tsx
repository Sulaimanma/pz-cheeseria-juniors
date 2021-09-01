import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { PurchaseRecordType } from '../../App';
import { useQuery } from 'react-query';

//types
type Props = {
  open: boolean;
  setOpen: (openStatus: boolean) => void;
};

const useStyles = makeStyles({
  fullList: {
    width: '500px',
  },
});

// Get purchase history
const getPurchase = async (): Promise<PurchaseRecordType[]> =>
  await (await fetch(`api/purchase`)).json();

const PurchaseHistory: React.FC<Props> = ({ open, setOpen }) => {
  //Get purchase query
  const { data, isLoading, error } = useQuery<PurchaseRecordType[]>('cheeses', getPurchase);
  const classes = useStyles();

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div className={classes.fullList} role="presentation" onClick={() => setOpen(true)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
};
export default PurchaseHistory;
