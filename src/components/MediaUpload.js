import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baseUrl from '../utils/url';
import {DropzoneDialog} from 'material-ui-dropzone';
import {createOneMedia} from '../redux/actions/media';

export default (props) => {
  const dispatch = useDispatch();

  console.log('the props', props);

  const handleSave = (files) => {
    const data = new FormData();
    for (const file of files) {
      data.append('media', file);
    }
    dispatch(createOneMedia(data))
      .then((res) => {
        const data = res.data.map((file) => {
          return {
            url: baseUrl + 'static/' + file.file_name,
            fileName: file.file_name,
            description: file.description,
            uploadedOn: file.created_at,
            id: file.id,
          };
        });
        console.log('the data', data);
        props.onImageSave(data);
        props.onClose();
      })
      .catch((err) => {
        console.log('the error', err);
      });
  };

  const getAcceptedFiles = () => {
    if (props.mediaType && props.mediaType !== '') {
      if (props.mediaType === 'image') return ['image/*'];
      else return ['video/*'];
    } else return ['image/*', 'video/*'];
  };

  return (
    <DropzoneDialog
      open={props.showDialogue}
      onSave={handleSave}
      acceptedFiles={getAcceptedFiles()}
      showPreviews={true}
      maxFileSize={15000000}
      filesLimit={4}
      showFileNames={true}
      onClose={() => props.onClose()}
    />
  );
};
