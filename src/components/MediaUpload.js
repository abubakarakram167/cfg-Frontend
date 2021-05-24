import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baseUrl from '../utils/url';
import {DropzoneDialog} from 'material-ui-dropzone';
import {createOneMedia} from '../redux/actions/media';

export default (props) => {
  const dispatch = useDispatch();

  const handleSave = (files) => {
    const data = new FormData();
    for (const file of files) {
      data.append('media', file);
    }
    dispatch(createOneMedia(data)).then((res) => {
      const data = res.data.map((file) => {
        return {
          url: baseUrl + 'static/' + file.file_name,
          fileName: file.title,
          description: file.description,
          uploadedOn: file.created_at,
          id: file.id,
        };
      });
      props.onImageSave(data);
      props.onClose();
    });
  };

  return (
    <DropzoneDialog
      open={props.showDialogue}
      onSave={handleSave}
      acceptedFiles={['image/jpeg', 'image/png', 'video/mkv', 'video/mp4']}
      showPreviews={true}
      maxFileSize={15000000}
      filesLimit={4}
      showFileNames={true}
      onClose={() => props.onClose()}
    />
  );
};
