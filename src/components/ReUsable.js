import React from 'react';
import {getSignedUrl} from '../redux/actions/media';
import $ from 'jquery';

export const transformImagesInContent = async (html, change, id) => {
  const getFileName = (url) => {
    let changeUrl = new URL(url).pathname.split('/');
    if (changeUrl[1] === 'static') changeUrl = changeUrl[2];
    else changeUrl = changeUrl[1];
    return changeUrl;
  };

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
    allMedia.push(
      getSignedUrl({fileName: getFileName(img.getAttribute('src'))}),
    );
  });

  const res = await Promise.all(allMedia);

  res.map((mediaData) => {
    imgs.forEach(function (img) {
      // allMedia.push(
      //   getSignedUrl({fileName: getFileName(img.getAttribute('src'))}),
      // );
      if (mediaData.fileName === getFileName(img.getAttribute('src'))) {
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

export const getRestoredImage = (featureImageUrl) => {
  return featureImageUrl.substring(featureImageUrl.lastIndexOf('/') + 1);
};
