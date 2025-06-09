import React, {Suspense} from 'react';

export const SuspenseWrapper = ({ children }) => {
    return <Suspense fallback={<div>Loading ...</div>}>{children}</Suspense>
}