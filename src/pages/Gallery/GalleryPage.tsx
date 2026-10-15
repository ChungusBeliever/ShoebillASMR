import PageLayout from "../../components/PageLayout/PageLayout";
import { PHOTOS } from "../../data/photos";
import "./GalleryPage.css";

export default function GalleryPage() {
  return (
    <PageLayout title="The Shoebill Gallery" shadedTitle>
      {PHOTOS.map((photo) => (
        <div className="photo" key={photo.src}>
          <img src={photo.src} alt={photo.alt} />
          <p>{photo.caption}</p>
        </div>
      ))}
    </PageLayout>
  );
}
