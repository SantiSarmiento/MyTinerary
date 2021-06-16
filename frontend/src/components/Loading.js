import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
    return(
        <Spinner color="light" style={{ width: '3rem', height: '3rem' }} />
    )
}

export default Loading