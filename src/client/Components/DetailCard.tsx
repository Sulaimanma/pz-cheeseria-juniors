import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { CartItemType } from '../App';
//Glass Magnifier to see the details of the image
import { GlassMagnifier } from 'react-image-magnifiers';

//types
type Props = {
  cheeseItem: CartItemType;
};
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

const DetailCard: React.FC<Props> = ({ cheeseItem }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
    </div>
  );
};
export default DetailCard;
