import React, {useEffect, useState} from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {Show_Message} from '../shared/constants/ActionTypes';
import $ from 'jquery';
import {
  getUserMediaList,
  createOneMedia,
  getUserMediaListEditor,
} from '../redux/actions/media';
import baseUrl from '../utils/url';
import {useDispatch, useSelector} from 'react-redux';
import './sunEditor.css';
import axiosInstance from '../utils/axios';
import Media from 'redux/services/media';

let allData = [];
let allImages = [];
let fileData = null;
let contentData;
let add = false;

export default (props) => {
  const dispatch = useDispatch();
  const mediaFilesData = useSelector(({mediaList}) => {
    return mediaList.mediaList;
  });
  const [render, setRender] = useState(false);
  allData = mediaFilesData;
  contentData = props.content;
  useEffect(() => {
    dispatch(getUserMediaListEditor()).then((mediaData) => {
      if (mediaData.length) {
        for (let image of mediaData) {
          if (
            ['jpeg', 'png', 'jpg', 'JPG', 'PNG'].includes(
              image.url.split('.').pop(),
            )
          )
            allImages.push(
              `<span style = "float: left;" ><img class="select-images" style = "height: 80px; width: 120px; cursor: pointer; margin: 20px;" src = "${image.url}"/><p style = "text-align: center; max-width: 100px; font-size: 10px; margin: auto; font-weight: 700;" >${image.fileName}</p></span>`,
            );
        }
        setRender(true);
        $(`<div class = "_se_tab_content_library" style = "height: 200px; display : none; overflow-y: auto; " > 
          ${allImages.toString().replace(/,/g, '')}
        </div>`).insertAfter('._se_tab_content_url');
        $(`<button style = " display: block; color: white; font-size: 15px; font-weight: 500; width: 30%; border-radius: 20px;
          margin: auto;  background-color: rgb(96 179 218); padding: 10px;margin-bottom: 10px; " class = "upload-link-button" >Select Url</p>`).insertAfter(
          '._se_tab_content_url',
        );
        $('.se-file-browser-list').append('asdasd');
        $('.select-images').on('click', function (e) {
          add = false;
          fileData = this.src;
          handleEditorChange(contentData);
        });
        $('.se-tooltip').on('click', function (e) {
          setTimeout(() => {
            if ($('._se_tab_image-library').length === 0) {
              $(`<div class = "_se_tab_image-library" style = "width: 90%; margin: auto; display : block; overflow-y: auto; " > 
                ${allImages.toString().replace(/,/g, '')}
              </div>`).insertAfter('.se-file-browser-list');
            }
          }, 1000);
          $('.upload-link-button').css('display', 'none');
        });
        $('.upload-link-button').on('click', function (e) {
          add = false;
          var urlToDownload = $('.se-input-url').val();
          addMediaUrl(urlToDownload);
        });
      }
    });
  }, []);

  const addMediaUrl = async (url) => {
    $('.sun-editor-editable').append(`<img src='${url}' />`);
    props.onContentChanged(true);
    var htmlToBeSave = document.getElementsByClassName('sun-editor-editable')[0]
      .innerHTML;
    props.onContentSave(htmlToBeSave);
  };

  const handleEditorChange = (e) => {
    setTimeout(() => {
      if (fileData) {
        if (add) {
          var list = document.getElementsByClassName('sun-editor-editable')[0];
          list.removeChild(list.childNodes[0]);
          addMediaUrl(fileData);
        } else addMediaUrl(fileData);
      } else {
        props.onContentSave(e);
        props.onContentChanged(true);
      }
    }, 1000);
  };

  useEffect(() => {
    $('.se-dialog-tabs').append(
      `<button type="button" class="_se_tab_link library-button"  data-tab-link="library">Library</button>`,
    );
    $('._se_tab_link').on('click', function (e) {
      if (e.target.innerText === 'Library') {
        $('._se_tab_content_image').css('display', 'none');
        $('._se_tab_content_url').css('display', 'none');
        $('._se_tab_content_library').css('display', 'block');
        $('.se-dialog-form-footer').css('display', 'block');
        $('.se-dialog-footer').css('display', 'block');
        $('.upload-link-button').css('display', 'none');
      } else {
        if (e.target.innerText === 'Link') {
          $('._se_tab_content_library').css('display', 'none');
          $('.se-dialog-form-footer').css('display', 'none');
          $('.se-dialog-footer').css('display', 'none');
          $('.upload-link-button').css('display', 'block');
        } else if (e.target.innerText === 'Image') {
          $('.se-dialog-form-footer').css('display', 'block');
          $('._se_tab_content_image').css('display', 'block');
          $('._se_tab_content_url').css('display', 'block');
          $('.se-dialog-footer').css('display', 'block');
          $('.upload-link-button').css('display', 'none');
          $('._se_tab_content_library').css('display', 'none');
        }
      }
    });
  }, []);

  // const handleImageUploadBefore = async (files, info, uploadHandler) => {
  //   try {
  //     await handleSave(files, info);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
  // };

  const handleSave = async (files, info) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      for (const file of files) {
        data.append('media', file);
      }
      const isNotUnderSizeLimit = files.filter((file) => {
        if (file.size >= 5000000) return true;
      });

      if (isNotUnderSizeLimit.length === 0) {
        dispatch(createOneMedia(data))
          .then((res) => {
            const data = res.data.map((file) => {
              return {
                url: baseUrl + 'static/' + file.file_name,
                fileName: file.title,
                description: file.description,
                uploadedOn: file.created_at,
                id: file.id,
              };
            });
            add = true;
            fileData = data[0] ? data[0].url : null;
            if (data.length) {
              resolve(true);
            }
            reject(false);
          })
          .catch((err) => {
            reject(false);
          });
      } else {
        dispatch({
          type: Show_Message,
          payload: {message: 'Each image max upto 5mb', success: false},
        });
      }
    });
  };
  const handleImageUploadBefore = async (files, info, uploadHandler) => {
    const formData = new FormData();
    formData.append('media', files[0]);
    formData.append('category', 'cover');
    const data = await Media.addMedia(formData);
    const photo_url = baseUrl + 'static/' + data.data[0].file_name;
    console.log(photo_url);
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
      {props.showMessageError && props.content === '' && (
        <p className='showErrorMessage'>content is required</p>
      )}
      <SunEditor
        onImageUploadBefore={handleImageUploadBefore}
        setContents={props.content}
        defaultValue=''
        setOptions={{
          height: !props.changeHeight ? 630 : 200,
          buttonList: [
            ['bold', 'italic', 'underline'],
            ['indent', 'outdent'],
            ['list'],
            ['fontColor'],
            ['fontSize'],
            ['font', 'align'],
            ['video', 'image'],
            ['imageGallery'],
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
          plugins: ['image'],
          imageUploadSizeLimit: 5000000,
          imageGalleryUrl: true,
          imageUrlInput: false,
        }}
        onChange={handleEditorChange}
        // onImageUploadBefore={handleImageUploadBefore}
      />
    </div>
  );
};
