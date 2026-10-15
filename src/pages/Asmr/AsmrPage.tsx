import PageLayout from "../../components/PageLayout/PageLayout";
import { useAudio } from "../../hooks/useAudio";
import shoebillImg from "../../assets/shoebill.png";
import shoebillSounds from "../../assets/ShoebillSounds.mp3";
import "./AsmrPage.css";

export default function AsmrPage() {
  const playSounds = useAudio(shoebillSounds);

  return (
    <PageLayout title="Shoebill ASMR">
      <img src={shoebillImg} className="asmr-image" alt="A shoebill staring at the camera" />
      <p className="asmr-hint">best with headphones</p>
      <button className="asmr-button" onClick={playSounds}>
        shoebill asmr
      </button>
    </PageLayout>
  );
}
