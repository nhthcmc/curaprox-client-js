import { lazy, Suspense } from "react";
import Loading from "./components/PageLoading"
import BackHome from "./components/BackHome"

const lazyFn = (importFn, access = true) => {
    if (!access) {
        return () => (
            <BackHome />
        )
    }
    const LazyComponent = lazy(importFn)
    return () => (
        <Suspense fallback={<Loading />}>
            <LazyComponent />
        </Suspense>
    )
};
export default {
    lazyFn
}