import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Html } from '@react-three/drei';

// project import
import LoadingView from './LoadingView';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //
const Loadable = (importFunc) => {
    const LazyComponent = lazy(importFunc);

    return (props) => (
        <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <Html center>
                    <div>
                        에러 발생! <button onClick={() => resetErrorBoundary()}>다시 불러오기</button>
                        <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
                    </div>
                </Html>
            )}
        >
            <Suspense
                fallback={
                    <Html>
                        <LoadingView loadingScreen={true} />
                    </Html>
                }
            >
                <LazyComponent {...props} />
            </Suspense>
        </ErrorBoundary>
    );
};

export default Loadable;
