import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SecretCardSkeleton = () => {
    return (<>
        <div className='col-md-12 secretCard my-2'>
            <div>
                <h3><Skeleton
                    height={"2rem"}
                    baseColor="#5d6e6a"
                    highlightColor="#d4fff57a"
                /></h3>
            </div>
            <div>
                <p><Skeleton
                    height={"1rem"}
                    width={"8rem"}
                    baseColor="#5d6e6a"
                    highlightColor="#d4fff57a"
                /></p>
            </div>
        </div>
    </>);
}

export default SecretCardSkeleton;