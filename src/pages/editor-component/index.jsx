import React from 'react';
import SunEditor from 'suneditor-react';
import Media from 'redux/services/media';
import {baseUrl} from 'utils/axios';

const EditorComponent = ({content, setContent}) => {
  const handleEditorChange = (e) => {
    setContent(e);
  };
  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    const formData = new FormData();
    formData.append('media', files[0]);
    formData.append('category', 'cover');
    const data = await Media.addMedia(formData);
    const photo_url = baseUrl + 'static/' + data.data[0].file_name;
    uploadHandler({
      result: [
        {
          url: photo_url,
          name: data.data[0].file_name,
          size: files[0].size,
        },
      ],
    });
  };

  return (
    <div>
      <SunEditor
        setContents={content}
        onImageUploadBefore={handleImageUploadBefore}
        defaultValue=''
        setOptions={{
          height: 630,
          buttonList: [
            ['bold', 'italic', 'underline'],
            ['indent', 'outdent'],
            ['list'],
            ['fontColor'],
            ['fontSize'],
            ['font', 'align'],
            ['video', 'image', 'link', 'audio'],
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          font: [
            'Arial',
            'Gotham',
            'Rissa',
            'Angelina',
            'courier',
            'impact',
            'verdana',
            'georgia',
          ],
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default EditorComponent;
