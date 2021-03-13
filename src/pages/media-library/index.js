import React, {useState} from 'react';
import AdminHeader from 'pages/admin-header';
import {DropzoneDialog} from 'material-ui-dropzone';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ControlPoint from '@material-ui/icons/ControlPoint';
import './style.css';

export default function MediaLibrary() {
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line
  const [files, setFiles] = useState([]);
  const [filesPreview, setFilesPreview] = useState([]);

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setFiles(files);
    setDialogOpen(false);
    files.forEach((element) => {
      readImage(element, (data) => {
        setFilesPreview([...filesPreview, data]);
      });
    });
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const readImage = (file, callback) => {
    let reader = new FileReader();
    reader.onload = function (file) {
      callback(file.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>

      <Container>
        <div className='options'>
          <Typography variant='h6'>Media Library</Typography>
          <Chip
            icon={<ControlPoint style={{fill: 'white'}} />}
            label={'ADD NEW'}
            className='chip-style'
            onClick={() => setDialogOpen(true)}
          />
        </div>
        <DropzoneDialog
          open={dialogOpen}
          onSave={handleSave}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={handleClose}
        />

        <div className='gallery'>
          {filesPreview.map((element, index) => {
            return (
              <img
                src={element}
                className='gallery-image'
                alt='alt-text'
                key={index}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
}
