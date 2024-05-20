import workCover from '@/../public/profile/work/cover.jpg';
import workAvatar from '@/../public/profile/work/avatar.jpg';
import personalCover from '@/../public/profile/personal/cover.jpg';
import personalAvatar from '@/../public/profile/personal/avatar.png';
import ribbon from '@/../public/profile/ribbon.svg';
import flag from '@/../public/profile/flag.svg';
import Image from 'next/image';
import classed from 'classed-components';

const Container = classed.div`
  container max-w-4xl mx-auto bg-linkedark sm:rounded-lg
`;

const Cover = classed(Image)`sm:rounded-t-lg`;

const Avatar = classed(Image)`
  rounded-full border-4 border-linkedark-950 w-48 max-w-[30vw] absolute
  left-1/2 top-[18vw] sm:top-32 transform -translate-x-1/2 -translate-y-1/2
  md:left-auto md:transform-none md:ml-4 md:top-20 lg:top-24
`;

const CardHeader = classed.div`
  mx-4 mt-[9vw] sm:mt-14 md:ml-52 md:mr-8 md:mt-3 flex pb-4
  items-center justify-center md:justify-start
`;

const PinkPill = classed.div`
  rounded-full bg-pink-600 m-2 px-2 max-h-6 flex items-center justify-center text-white
`;

const Title = classed.h1`text-3xl font-bold`;

const Subtitle = classed.p`text-lg`;

const Icon = classed(Image)`
  max-w-12 w-full bg-linkedark-800 m-1 p-1 rounded-full aspect-square
`;

interface Props {
  profile: 'personal' | 'work';
}

export default function ProfileCard(props: Props) {
  const cover = props.profile === 'personal' ? personalCover : workCover;
  const avatar = props.profile === 'personal' ? personalAvatar : workAvatar;
  const title = props.profile === 'personal' ? 'NotJustAnna' : 'Anna Silva';

  return (
    <Container>
      <Cover src={cover} alt="Cover" />
      <Avatar src={avatar} alt="Avatar" />
      <CardHeader>
        <div>
          <div className="flex items-center">
            <Title>{title}</Title>
            <PinkPill>she/her</PinkPill>
          </div>
          <Subtitle>Software Developer</Subtitle>
        </div>
        <div title="Transgender">
          <Icon src={flag} alt='Trans'/>
        </div>
        <div title="Autism Spectrum Disorder (ASD)">
          <Icon src={ribbon} alt='Autistic'/>
        </div>
      </CardHeader>
    </Container>
  );
}