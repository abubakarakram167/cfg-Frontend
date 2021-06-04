import React from 'react';
import SunEditor from 'suneditor-react';

const EditorComponent = ({content, setContent}) => {
  const handleEditorChange = (e) => {
    setContent(e);
  };

  return (
    <div>
      <SunEditor
        setContents={content}
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
