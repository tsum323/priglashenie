import { Masthead } from './components/Masthead/Masthead';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Closing } from './sections/Closing/Closing';
import { Countdown } from './sections/Countdown/Countdown';
import { DressCode } from './sections/DressCode/DressCode';
import { Gallery } from './sections/Gallery/Gallery';
import { Gifts } from './sections/Gifts/Gifts';
import { Hero } from './sections/Hero/Hero';
import { Invitation } from './sections/Invitation/Invitation';
import { Schedule } from './sections/Schedule/Schedule';
import { Venue } from './sections/Venue/Venue';
import { SECTION_IDS } from './sections/ids';

export function App() {
  useScrollReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <div id="top">
        <Masthead />
      </div>
      <main id="main" tabIndex={-1}>
        <Hero nextSectionId={SECTION_IDS.invitation} />
        <Invitation id={SECTION_IDS.invitation} />
        <Countdown id={SECTION_IDS.countdown} />
        <Schedule id={SECTION_IDS.schedule} />
        <Venue id={SECTION_IDS.venue} />
        <DressCode id={SECTION_IDS.dressCode} />
        <Gifts id={SECTION_IDS.gifts} />
        <Gallery id={SECTION_IDS.gallery} />
      </main>
      <Closing id={SECTION_IDS.closing} />
    </>
  );
}
