import { Suspense } from 'react';

// project import
import LoadingView from './LoadingView';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<LoadingView />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
