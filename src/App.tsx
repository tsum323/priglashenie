import { Masthead } from './components/Masthead/Masthead';
import { Hero } from './sections/Hero/Hero';
import { Invitation } from './sections/Invitation/Invitation';

const INVITATION_ID = 'invitation';

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <div id="top">
        <Masthead />
      </div>
      <main id="main" tabIndex={-1}>
        <Hero nextSectionId={INVITATION_ID} />
        <Invitation id={INVITATION_ID} />
      </main>
    </>
  );
}
