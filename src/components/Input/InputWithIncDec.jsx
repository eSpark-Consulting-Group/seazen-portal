import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteIcon from '@mui/icons-material/Delete';

function IncDec(props) {
  const { 
    quantity, 
    onIncrease, 
    onDecrease, 
    IncButtonProps, 
    isSingleItem, 
    onDelete 
  } =
    props;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {isSingleItem ? (
        <IconButton
          aria-label="remove"
          onClick={onDelete}
          size="small"
          sx={{
            border: "1px solid #DCDFE3",
            color: "black",
            p: 0.5,
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        ) : (
        <IconButton
          aria-label="remove"
          onClick={onDecrease}
          size="small"
          sx={{
            border: "1px solid #DCDFE3",
            color: "black",
            p: 0.5,
          }}
        >
          <RemoveRoundedIcon fontSize="small" />
        </IconButton>
      )}

      <Typography variant="h6" fontWeight={700}>
        {quantity}
      </Typography>

      <IconButton
        aria-label="add"
        onClick={onIncrease}
        size="small"
        sx={{
          border: "1px solid #DCDFE3",
          color: "black",
          p: 0.5,
          ...IncButtonProps.sx,
        }}
        {...IncButtonProps}
      >
        <AddRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default IncDec;
