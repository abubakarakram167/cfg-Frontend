import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserAvatar from 'assets/user-avatar.png';
import {useSelector, useDispatch} from 'react-redux';
import {Dialog, DialogTitle, DialogActions, TextField} from '@material-ui/core';
import {updateUser} from 'redux/actions/authActions';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  media: {
    height: 250,
  },
});

export default function BioCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setImage(user.photo_url || UserAvatar);
    }
  }, [user]);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('media', file);
    formData.append('category', 'cover');
    const data = await Media.addMedia(formData);
    const photo_url = data.data[0].file_name;
    dispatch(
      updateUser({
        id: user.id,
        photo_url,
      }),
    );
  };

  const saveBio = () => {
    dispatch(
      updateUser({
        id: user.id,
        bio,
      }),
    );

    setDialogOpen(false);
  };

  const dialogJSX = (
    <Dialog open={dialogOpen} fullWidth>
      <DialogTitle>Add a bio</DialogTitle>
      <div className='dialog-content'>
        <TextField
          value={bio}
          label={'Your Biography...'}
          rows={5}
          variant='filled'
          multiline
          onChange={(e) => setBio(e.target.value)}
          fullWidth
        />
      </div>
      <DialogActions style={{textAlign: 'right'}}>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={saveBio} color='primary' autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {dialogJSX}
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={baseUrl + 'static/' + image}
            title='user-photo'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {user && user.first_name + ' ' + user.last_name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => setDialogOpen(true)}>
            Add Bio
          </Button>

          <input
            type='file'
            name=''
            id='file-input'
            style={{display: 'none'}}
            onChange={handleFile}
          />
          <label htmlFor='file-input'>
            <div
              style={{
                marginLeft: '10px',
                color: '#0A8FDC',
                boxShadow: '0px 1px 2px gainsboro',
                textTransform: 'uppercase',
                padding: '6px',
                fontSize: '12px',
                fontWeight: 600,
              }}>
              Add Image
            </div>
          </label>
        </CardActions>
      </Card>
    </>
  );
}
