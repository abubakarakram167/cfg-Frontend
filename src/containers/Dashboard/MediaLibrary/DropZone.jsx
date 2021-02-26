import React,{useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone'
import { makeStyles, Modal, TextField, Button } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
 cont:{
     display:'flex',
     alignItems:'center',
     flexDirection:'column'
 },
 selectButton:{
border:'1px solid grey',
backgroundColor:'lightgrey'
 },
 header:{
    width:'100%',
    maxWidth:'700px',
    color:'gray'
},
 dropCont:{
     width:'100%',
     display:'flex',
     flexDirection:'column',
     alignItems:'center'
 },
 footer:{
     width:'100%',
     maxWidth:'700px',
     color:'gray'
 },
 btnCont: {
    margin: "15px 0",
  },
  button: {
    borderRadius: "25px",
    marginRight: "15px",
    fontSize: "12px",
  },
   }));

const DropZone = (props) => {
const classes=useStyles()
const [files,setFiles]=useState([])
    const handleChange=(e)=>{
setFiles(e)
    }

    const handleSave=()=>{
        props.onSave(files)
        props.onClose()
    }

    return ( <div className={classes.cont}>
        <div className={classes.dropCont}>
        <div className={classes.header}><i className="fas fa-images" style={{fontSize:'25px',color:'gray'}} /> <b style={{color:'gray',fontSize:'22px'}}>Add New Media</b></div>
<DropzoneArea
Icon={()=><Button className={classes.selectButton} startIcon={<AttachFileIcon />}>Select files</Button>}
acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
showPreviews={true}
onSave={handleChange}
dropzoneText="Drop files here or"
maxFileSize={5000000}
        onChange={(e)=>handleChange(e)}
        />
        <p className={classes.footer}>Maximum upload file size: 1 GB</p>
</div>

<div className={classes.btnCont}>
<Button
          variant="contained"
          onClick={handleSave}
          style={{ backgroundColor: "red" }}
          color="secondary"
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          variant="contained"
          onClick={()=>props.onClose()}
          style={{ backgroundColor: "grey" }}
          color="secondary"
          className={classes.button}
          startIcon={<CancelIcon />}
        >
          Cancel
        </Button>

        
      </div>

    </div> );
}
 
export default DropZone;

