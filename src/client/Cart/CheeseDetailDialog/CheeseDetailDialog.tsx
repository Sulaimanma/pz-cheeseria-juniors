import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

//Glass Magnifier to see the details of the image
import { GlassMagnifier } from 'react-image-magnifiers';

//Types
import { CartItemType } from '../../App';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cheeseItem: CartItemType;
};

//define the style
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 40,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      minWidth: 600,
      // maxWidth: 1000,
    },
    image: {
      maxWidth: 512,
      maxHeight: 512,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  })
);
//Define the dialog transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CheeseDetailDialog: React.FC<Props> = ({ open, setOpen, cheeseItem }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
      >
        {cheeseItem && (
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <GlassMagnifier
                    className={classes.img}
                    imageSrc={cheeseItem.image}
                    imageAlt={`${cheeseItem.image} detail image`}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {cheeseItem.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Category: {cheeseItem.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description:
                      {cheeseItem.description}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">${cheeseItem.price}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CheeseDetailDialog;
