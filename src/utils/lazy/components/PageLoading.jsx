import "./page_loading.scss";
import images from '@/images';
export default function Loading() {
    return (
        <div className="loading_container">
            <img src={images.loading} alt='sw' />
        </div>
    )
}