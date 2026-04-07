import { personalInfo } from '../data/portfolio';

export default function Footer() {
  return (
    <footer>
      <p>
        {personalInfo.name} · {personalInfo.location} · {personalInfo.email}
      </p>
    </footer>
  );
}
