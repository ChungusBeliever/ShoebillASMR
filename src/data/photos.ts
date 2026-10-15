import uenoShoebill from "../assets/gallery/uenoshoebill1.png";

export interface Photo {
  src: string;
  alt: string;
  caption: string;
}

export const PHOTOS: Photo[] = [
  {
    src: uenoShoebill,
    alt: "A shoebill standing behind glass at Ueno Zoo",
    caption: "A photo I took of a shoebill at Ueno Zoo in Tokyo",
  },
];
