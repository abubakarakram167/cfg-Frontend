import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router';
import {getContentData} from 'redux/actions/sessionActions';
import AdminHeader from 'pages/admin-header';
import './style.css';
import {Link} from 'react-router-dom';
import SunEditor from 'suneditor-react';

export default function ContentDisplay() {
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.session);
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    dispatch(getContentData(params.id));
  }, [params.id, dispatch]);
  useEffect(() => {
    if (state.currentContent) {
      setData(state.currentContent);
    }
  }, [state]);

  const getUrlFormat = (url) => {
    return new URL(url).pathname;
  };

  return (
    <div className='content-display-body'>
      <div className='toolbar-container'>
        <AdminHeader />
      </div>
      <br />
      <div className='titles-container-display-page'>
        <div className='title-display-container'>
          <h1>{data && data.title}</h1>
          {/* <h6>{data && data.sub_title}</h6> */}
        </div>
      </div>

      <div className='display-content-container'>
        <br />
        <br />

        {/* <div
          className='display-content'
          dangerouslySetInnerHTML={{ __html: data ? data.detail : '' }}></div> */}
        <div className='display-content'>
          <div className='rich-content-user-container'>
            <SunEditor
              disable={true}
              height='100%'
              setContents={data ? data.detail : ''}
              showToolbar={false}
            />
          </div>
        </div>
      </div>

      <div className='content-display-buttons-container'>
        <div className='content-display-buttons'>
          {data && data.previous_page && (
            <Link to={getUrlFormat(data.previous_page)}>
              <button className='next-prev-button'>Previous</button>
            </Link>
          )}
          {data && data.next_page && (
            <Link to={getUrlFormat(data.next_page)}>
              <button className='next-prev-button'>Next</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
