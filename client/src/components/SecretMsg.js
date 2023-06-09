import React from 'react';

const SecretMsg = (Props) => {
    return (<>
        <div className='col-md-12 secretCard my-2'>
            <div>
                <h3>{Props.secretText}</h3>
            </div>
            <div>
                <p>By: {Props.name}</p>
            </div>
        </div>
    </>);
}

export default SecretMsg;