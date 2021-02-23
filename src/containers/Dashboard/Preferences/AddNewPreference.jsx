import React, { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import save from "../../../components/common/assets/icons/save.svg";

const useStyles = makeStyles((theme) => ({
  cont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const AddNewPreference = ({ onSave, onClose,index }) => {
  const classes = useStyles();
  const [preference, setPreference] = useState({id:index});

  const handleChange=(e)=>{
setPreference({...preference,[e.name]:e.value})
  }
  const handleSave = async () => {
    if (!preference.option_name==""&&!preference.option_value==""&&!preference.description=="") {
      await onSave(preference);
    }
    onClose();
  };

  return (
    <div className={classes.cont}>
      <TextField
        id="standard-full-width"
        label="Option"
        placeholder="Write the Option here!"
        variant="filled"
        fullWidth
        margin="normal"
        name="option_name"
        onChange={(e) => handleChange(e.target)}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="standard-full-width"
        label="Value"
        placeholder="Write the value here!"
        variant="filled"
        name="option_value"
        fullWidth
        margin="normal"
        onChange={(e) => handleChange(e.target)}
        InputLabelProps={{
          shrink: true,
        }}
      />
       <TextField
        id="standard-full-width"
        label="Description"
        placeholder="Write the description here!"
        variant="filled"
        name="description"
        fullWidth
        margin="normal"
        onChange={(e) => handleChange(e.target)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <div className="d-block" style={{ textAlign: "center" }}>
        <button
          className="button primary_button"
          style={{ marginRight: 10 }}
          onClick={() => handleSave()}
        >
          <div className="d-flex align-items-center justify-content-center">
            <img src={save} />
            <span style={{ marginLeft: 5 }}>Save</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddNewPreference;
