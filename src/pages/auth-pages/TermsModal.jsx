import React, {useState, useCallback} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {terms_conditions} from './create-password/terms_conditions';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TermsModal(props) {
  const [open, setOpen] = useState(false);
  const [boxHeight, setHeight] = useState(null);
  const history = useHistory();

  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height - 140);
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
    props.setOpenState(false);
  };
  const acceptTerms = () => {
    // props.setView(2);
    history.push('/signUp');
  };
  const rejectTerms = () => {
    toast.error('You must agree to terms and conditions to signup.!');
    handleClose();
  };

  React.useEffect(() => {
    setOpen(props.open);
  }, [props]);

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style} ref={div}>
            {/* <Typography id='transition-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography> */}
            {/* <Typography id='transition-modal-description' sx={{mt: 2}}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
            <div style={{align: 'right', float: 'right', cursor: 'pointer'}}>
              <CloseIcon
                onClick={() => {
                  handleClose();
                }}
              />
            </div>
            <div>
              <h3>Terms and Conditions</h3>
              <div style={{height: `${boxHeight}px`, overflowY: 'scroll'}}>
                <div dangerouslySetInnerHTML={{__html: terms_conditions}}></div>
              </div>
            </div>
            <div
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}>
              <button
                onClick={() => acceptTerms()}
                className='btn bt-lg'
                style={{
                  float: 'left',
                  backgroundColor: '#eb1b29',
                  color: 'white',
                  fontWeight: '600',
                  width: '30%',
                  margin: '5px',
                }}>
                Accept
              </button>

              <button
                onClick={() => rejectTerms()}
                className='btn bt-lg'
                style={{
                  float: 'left',
                  backgroundColor: '#6A6A6A',
                  color: 'white',
                  fontWeight: '600',
                  width: '30%',
                  margin: '5px',
                }}>
                Reject
              </button>
              <a
                className='btn bt-lg btn-info'
                href='./style.css'
                download
                onClick={() => handleClose()}
                style={{
                  float: 'left',
                  color: 'white',
                  fontWeight: '600',
                  width: '25%',
                  margin: '5px',
                }}>
                {/* <a  download style={{textDecoration:'none' , color:'white'}} onClick={()=>alert('Hello')}> */}
                <CloudDownloadIcon />
                {/* </a> */}

                {/* <p style={{ whiteSpace: 'pre-wrap' , overflowWrap: 'break-word'}}>Download T&C's</p> */}
              </a>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
