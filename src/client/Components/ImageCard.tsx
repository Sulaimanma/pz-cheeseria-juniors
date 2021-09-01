import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CartItemType, PurchaseRecordType } from '../App';

//types
type Props = {
  cheeseItem: PurchaseRecordType;
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: 10,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    time: {
      marginTop: 35,
    },
  })
);

const ImageCard: React.FC<Props> = ({ cheeseItem }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="cheese image" src={cheeseItem.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {cheeseItem.title}
                </Typography>
                {/* <Typography variant="body2" gutterBottom>
                  Category:{cheeseItem.}
                </Typography> */}
                <Typography variant="body2" color="textSecondary">
                  x{cheeseItem.amount}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={classes.time}>
                  Purchased time: {cheeseItem.purchaseTime}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">${cheeseItem.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default ImageCard;
