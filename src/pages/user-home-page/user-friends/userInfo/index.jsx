import React from 'react';
import {Card} from '@material-ui/core';
import './style.css';

const UserInfo = (props) => {
  return (
    <div className='col-12 col-sm-6 col-md-4 col-lg-3'>
      <div className='user-card-container'>
        <div className='user-image'>
          <img
            style={{borderRadius: 20}}
            src={
              'https://du1jzqmqkepz6.cloudfront.net/2021-10-05T00-31-45.921Z-6128fA2NuZL.jpg?Expires=1647194506&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kdTFqenFtcWtlcHo2LmNsb3VkZnJvbnQubmV0LzIwMjEtMTAtMDVUMDAtMzEtNDUuOTIxWi02MTI4ZkEyTnVaTC5qcGciLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NDcxOTQ1MDZ9fX1dfQ__&Signature=TYRuYcdulQHb7oPAZpsGw3gmixxA50kHGKDXE9~9Gj5YuZpaJn~id6l3MHOYDftIjjOtHmSOnV7OtxADRdgL-9XGEC~H7B8NUr5fDGgCW0kaV0dZNORejMamfXQPKHWb6BUA5QFziqoLHrfM9fW-re1LDmq7ZCYRRTd501Jdd6~wn7wmOgfIxf1r1tNt5VXnn5QsQ7lTcircMrMPQdUiPNOVLEJPlcU640fWEGLqaWqxHPBaER8uai8NtQ0xFZQVjBmFSZ-xuq5Mdgb9thTrUF6kx1Gt7gi99Rbys5ZamT8IGcg1RDrS2r56dhRYdAthi~i-rdix7GGmQ-NyZvMEkw__&Key-Pair-Id=K30S0N0WWH7I01'
            }
          />
        </div>
        <h3 className='avatar-name'>Lenox james</h3>
        <div className='button-container'>
          <button className='confirm-buttton'>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
