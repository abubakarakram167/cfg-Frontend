import React from 'react';
import {getSignedUrl} from '../redux/actions/media';
import $ from 'jquery';

export const transformImagesInContent = async (html, change, id) => {
  const el = Object.assign(document.createElement('div'), {
    className: 'temporary-image-container',
  });
  el.insertAdjacentHTML('afterbegin', html);
  var x = document.getElementsByClassName('temporary-image-container');
  var allMedia = [];

  var ele = document.createElement('div');
  ele.innerHTML = html;

  var imgs = ele.querySelectorAll('img');
  imgs.forEach(function (img) {
    allMedia.push(getSignedUrl({fileName: img.getAttribute('data-file-name')}));
  });

  const res = await Promise.all(allMedia);

  res.map((mediaData) => {
    imgs.forEach(function (img) {
      allMedia.push(
        getSignedUrl({fileName: img.getAttribute('data-file-name')}),
      );
      if (mediaData.fileName === img.getAttribute('data-file-name')) {
        img.setAttribute('src', mediaData.newUrl);
      }
    });
  });

  return {
    html: ele.innerHTML,
    change: true,
    id,
  };
};
