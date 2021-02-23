import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import axiosInstance from '../../../utils/axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const CFGSessionDetails = () => {
    const [shouldCall, setShouldCall] = useState(true);
    const [sessionList, setSessionLIst] = useState([]);
    const history = useHistory();
    const sessionName = JSON.parse(localStorage.getItem('session'));
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    
    useEffect(() => {
        localStorage.removeItem('content');
        localStorage.removeItem('type');
        if(shouldCall) {
            axiosInstance.get(`/api/content/list/session/${sessionName?.id}`)
            .then((res) => {
                setSessionLIst(res?.data?.data?.titles?.rows)
            })
            .catch((err) => {
                setSessionLIst([])
            })
            setShouldCall(false)
        }
    }, [shouldCall, sessionList, sessionName])

    const onRowClick = (res, type) => {
        history.push({
            pathname: `/content/session`,
        });
        localStorage.setItem("content", JSON.stringify(res));
        localStorage.setItem("type", JSON.stringify(type));
    };

    // const handleSelected = content => {
    //     localStorage.setItem("content", JSON.stringify(content?.selectedRows[0]));
    // }
    
    return (
        <>
            <article>
                <Helmet>
                    <title>Add New</title>
                    <meta
                        name='description'
                        content='A React.js Boilerplate application homepage'
                    />
                </Helmet>
            </article>
            <Header />
            <main>
                <div className='dash-wrapper'>
                    <div className='row dash-session-header'>
                        <div className='col-md-8'>
                            <label
                                style={{
                                    fontSize: '1rem',
                                    fontWeight: '700',
                                }}
                            >
                                {sessionName?.title}
                            </label>
                            <Link
                                to="/content/session"
                                type='button'
                                className='button-title-small button_inline m-l-15 um_primary_button'
                            >
                                <i className='fas fa-plus-circle' /> Add new
                            </Link>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'col-md-12'}>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell style={{ fontSize: "16px", fontWeight: "bold"}}>Title</TableCell>
                                            <TableCell style={{ fontSize: "16px", fontWeight: "bold"}} align="right">Author</TableCell>
                                            <TableCell style={{ fontSize: "16px", fontWeight: "bold"}} align="right">Date Published</TableCell>
                                            <TableCell style={{ fontSize: "16px", fontWeight: "bold"}} align="right">Points</TableCell>
                                            <TableCell style={{ fontSize: "16px", fontWeight: "bold"}} align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sessionList && sessionList?.map((item, index) => (
                                            <React.Fragment>
                                                <TableRow key={index} className={classes.root} style={{ background: "" }}>
                                                    <TableCell>
                                                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                                            {open ? <i class="fas fa-window-minimize"></i> : <i class="fas fa-plus"></i>}
                                                        </IconButton>
                                                        <IconButton aria-label="expand row" size="small">
                                                            <Checkbox
                                                                checked={true}
                                                                color="default"
                                                                inputProps={'aria-label'/*: 'checkbox with default color' */}
                                                            />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell onClick={() => onRowClick(item, "title")} component="th" scope="row">
                                                        {item?.title}
                                                    </TableCell>
                                                    <TableCell onClick={() => onRowClick(item, "title")} align="right">{item?.auther}</TableCell>
                                                    <TableCell onClick={() => onRowClick(item, "title")} align="right">{item?.created_at}</TableCell>
                                                    <TableCell onClick={() => onRowClick(item, "title")} align="right">{item?.total_points}</TableCell>
                                                    <TableCell onClick={() => onRowClick(item, "title")} align="right">{item?.status}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                                            <Box margin={2}>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead >
                                                                        <TableRow className="tHead" style={{ height: "40px" }}>
                                                                            <td className="colm">&nbsp;</td>
                                                                            <td>Subtitle</td>
                                                                            <td>Author</td>
                                                                            <td>Date Published</td>
                                                                            <td>Points</td>
                                                                            <td>Status</td>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    {item?.subtitles?.rows[0] &&
                                                                        <TableHead>
                                                                            <TableRow className="tbody" style={{ height: "40px" }}>
                                                                                <td className="colm">&nbsp;</td>
                                                                                <td>{item?.subtitles?.rows[0]
                                                                                    && item?.subtitles?.rows[0]?.title}
                                                                                </td>
                                                                                <td>
                                                                                    author
                                                                            </td>
                                                                                <td>{item?.subtitles?.rows[0]
                                                                                    && item?.subtitles?.rows[0]?.created_at}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[0]
                                                                                    && item?.subtitles?.rows[0]?.total_points}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[0]
                                                                                    && item?.subtitles?.rows[0]?.status}
                                                                                </td>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                    }
                                                                    {item?.subtitles?.rows[1] &&
                                                                        <TableHead>
                                                                            <TableRow className="tbody" style={{ height: "40px" }}>
                                                                                <td className="colm">&nbsp;</td>
                                                                                <td>{item?.subtitles?.rows[1]
                                                                                    && item?.subtitles?.rows[1]?.title}
                                                                                </td>
                                                                                <td>
                                                                                    author
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[1]
                                                                                    && item?.subtitles?.rows[1]?.created_at}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[1]
                                                                                    && item?.subtitles?.rows[1]?.total_points}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[1]
                                                                                    && item?.subtitles?.rows[1]?.status}
                                                                                </td>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                    }
                                                                    {item?.subtitles?.rows[2] &&
                                                                        <TableHead>
                                                                            <TableRow className="tbody" style={{ height: "40px" }}>
                                                                                <td className="colm">&nbsp;</td>
                                                                                <td>{item?.subtitles?.rows[2]
                                                                                    && item?.subtitles?.rows[2]?.title}
                                                                                </td>
                                                                                <td>
                                                                                    author
                                                                            </td>
                                                                                <td>{item?.subtitles?.rows[2]
                                                                                    && item?.subtitles?.rows[2]?.created_at}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[2]
                                                                                    && item?.subtitles?.rows[2]?.total_points}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[2]
                                                                                    && item?.subtitles?.rows[2]?.status}
                                                                                </td>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                    }
                                                                    {item?.subtitles?.rows[3] &&
                                                                        <TableHead>
                                                                            <TableRow className="tbody" style={{ height: "40px" }}>
                                                                                <td className="colm">&nbsp;</td>
                                                                                <td>{item?.subtitles?.rows[3]
                                                                                    && item?.subtitles?.rows[3]?.title}
                                                                                </td>
                                                                                <td>
                                                                                    author
                                                                            </td>
                                                                                <td>{item?.subtitles?.rows[3]
                                                                                    && item?.subtitles?.rows[3]?.created_at}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[3]
                                                                                    && item?.subtitles?.rows[3]?.total_points}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[3]
                                                                                    && item?.subtitles?.rows[3]?.status}
                                                                                </td>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                    }
                                                                    {item?.subtitles?.rows[4] &&
                                                                        <TableHead>
                                                                            <TableRow className="tbody" style={{ height: "40px" }}>
                                                                                <td className="colm">&nbsp;</td>
                                                                                <td>{item?.subtitles?.rows[4]
                                                                                    && item?.subtitles?.rows[4]?.title}
                                                                                </td>
                                                                                <td>
                                                                                    author
                                                                            </td>
                                                                                <td>{item?.subtitles?.rows[4]
                                                                                    && item?.subtitles?.rows[4]?.created_at}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[4]
                                                                                    && item?.subtitles?.rows[4]?.total_points}
                                                                                </td>
                                                                                <td>{item?.subtitles?.rows[4]
                                                                                    && item?.subtitles?.rows[4]?.status}
                                                                                </td>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                    }
                                                                    
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CFGSessionDetails