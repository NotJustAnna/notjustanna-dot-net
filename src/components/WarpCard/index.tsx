import classed from "classed-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons/faChartSimple';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGitlab } from '@fortawesome/free-brands-svg-icons/faGitlab';
import { faSteam } from '@fortawesome/free-brands-svg-icons/faSteam';
import { faDocker } from '@fortawesome/free-brands-svg-icons/faDocker';
import { faTerminal } from '@fortawesome/free-solid-svg-icons/faTerminal';
import { useState } from "react";

const Container = classed.div`
  container my-4 max-w-4xl p-6 mx-auto bg-linkedark sm:rounded-lg
  flex flex-row items-center justify-center gap-2
`;

const Button = classed.a`font-bold py-2 px-4 rounded-lg`;

const LinkedInButton = classed(Button)`bg-linkeblue text-white`;

const GreyButton = classed(Button)`bg-linkedark-800 text-white`;

// This is used to prevent spam bots from scraping stuff
const thatConstant = 'notjustanna.net$otliam';

export default function WarpCard() {
  const [thatHref, setThatHref] = useState('javascript:void(0)');

  const onThatHover = () => {
    const [domain,proto] = thatConstant.split('$');
    setThatHref(
      `${proto.split('').reverse().join('')}:${domain.split('.').shift()}@${domain}`
    );
  };
  

  return (
    <Container>
      <LinkedInButton href="https://linkedin.com/in/notjustanna">
        <FontAwesomeIcon icon={faLinkedinIn}/> LinkedIn
      </LinkedInButton>
      <GreyButton href="https://github.com/annathelibri">
        <FontAwesomeIcon icon={faGithub}/> GitHub
      </GreyButton>
      <GreyButton href="https://steamcommunity.com/id/notjustanna">
        <FontAwesomeIcon icon={faSteam}/> Steam
      </GreyButton>
      {/* that button */}
      <GreyButton href={thatHref} onMouseEnter={onThatHover}>
        <FontAwesomeIcon icon={faEnvelope}/> Email
      </GreyButton>
    </Container>
  );
}