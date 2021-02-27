import React,{useEffect,useState} from 'react';
import Header from "../../../components/Header";
import { makeStyles, Modal, TextField, Button } from "@material-ui/core";
import{ getMedia,addMedia} from "../../../store/actions/media.actions"
import DropZone from "./DropZone"
import jsCookie from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    sidebar:{
        height: '100vh',
        backgroundColor: 'lightgray',
        maxWidth: '300px',
        width: '100%',
        position: 'fixed',
        top: '70px',
        right:' 0',
    },
   headSection1:{
       width:'fit-content'
   },
   headSection2:{
       width:'230px',
       display:'flex',
       alignItems:'center',
       justifyContent:'space-between'
   },
   ml20:{
       marginLeft:'20px'
   },button: {
    borderRadius: "25px",
    marginRight: "15px",
    fontSize: "12px",
  },
  }));

const MediaContentScreen = () => {
    const [media,setMedia]=useState([]);
    const [displayList,setDisplayList]=useState(true)

    useEffect(()=>{
        getMedia().then((res)=>setMedia(res))
    },[])
    const classes=useStyles()
    const handleSave=(e)=>{
console.log(e)


e.forEach((f)=>{
    addMedia({title:f.name,url:f.path,mime_type:f.type,description:"",created_by:JSON.parse(localStorage.getItem('session')).author.id})
    console.log({title:f.name,url:f.path,mime_type:f.type,description:"",created_by:JSON.parse(localStorage.getItem('session')).author.email})
})

    }
    return ( <>
     <Header />
     <main>
     
         {displayList?
        (<div className="dash-wrapper">
          <div className="row dash-title-bar">
            <div className={classes.headSection1}><i style={{color:'gray'}} className="fas fa-images" /> <b style={{color:'gray'}}>Media Library</b></div>
            <div className={classes.headSection2}>
              <button onClick={()=>setDisplayList(false)} className="button primary_button" style={{fontSize:'14px',padding:'8px'}}><i className="fas fa-plus-circle" /> Add New</button>
              <i className="fas fa-list-alt" />
              <i className="fas fa-border-all" />
            </div>
          </div>
          <div className="row">
            <div className="media-grid-parent">
{media.map((m)=>(
    <div className="media-img">
                <img src={m.url} />
              </div>

))}
              
            </div>
          </div>
<div className={classes.sidebar}>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-around',margin:'10px 0'}}>
    <p style={{marginBottom:'0px'}}>URL</p>
    <TextField  inputProps={{style:{backgroundColor:'white',borderRadius:'8px'}}} variant="outlined"/>
</div>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-around',margin:'10px 0'}}>
    <p style={{marginBottom:'0px'}}>Filename</p>
    <TextField  inputProps={{style:{backgroundColor:'white',borderRadius:'8px'}}} variant="outlined"/>
</div>
<div style={{display:'flex',alignItems:'center',justifyContent:'space-around',margin:'10px 0'}}>
    <p style={{marginBottom:'0px'}}>Description</p>
    <TextField  inputProps={{style:{backgroundColor:'white',borderRadius:'8px'}}} variant="outlined"/>
</div>



</div>


        </div>):



(<div>

    <DropZone onSave={(e)=>handleSave(e)} onClose={()=>setDisplayList(true)}/>
</div>)}
      </main>
    
    
    </> );
}
 
export default MediaContentScreen;