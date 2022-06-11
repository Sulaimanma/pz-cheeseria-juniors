import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { PurchaseRecordType } from "../../App";
import { useQuery } from "react-query";
import ImageCard from "../../Components/ImageCard";
import { Drawer, Typography, Button } from "@material-ui/core";
import { getPurchase, deletePurchaseHistories } from "../../Api/CheeseApi";

//types
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullList: {
      width: "600px",
      marginTop: "20px",
    },
    large: {
      width: "160px",
      height: "60px",
    },
    title: {
      width: "600px",
    },
  })
);
const clearPurchase = async () => {
  try {
    await deletePurchaseHistories();
    await getPurchase();
  } catch (err) {
    alert(`There is an error in deleting your purchase history: ${err} `);
  }
};
const PurchaseHistory: React.FC<Props> = ({ open, setOpen }) => {
  //Get purchase query
  const { data, isLoading, error } = useQuery<any[]>("records", getPurchase);
  const classes = useStyles();

  if (error) {
    alert(`There is an error in getting your purchase history: ${error} `);
  }

  return (
    <>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className={classes.fullList} role="presentation">
          {isLoading ? (
            <Typography variant="h4">Loading ...</Typography>
          ) : (
            <div>
              {data?.map((cheese: PurchaseRecordType) => (
                <ImageCard cheeseItem={cheese} />
              ))}
            </div>
          )}
        </div>
        {data &&
          !isLoading &&
          (data.length > 0 ? (
            <Button onClick={clearPurchase}>Clear Purchase Histories</Button>
          ) : (
            <Typography variant="h4">No purchase history</Typography>
          ))}
      </Drawer>
    </>
  );
};
export default PurchaseHistory;
