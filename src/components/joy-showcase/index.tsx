import {useEffect, useState} from 'react';
import Main from './Main';
import ShootingStarScene from './shooting-star-scene';
import InfoBar, {Position} from './info-bar.tsx';
import {EventService} from '@/components/joy-showcase/event/event-service.ts';
import {EventContext} from '@/components/joy-showcase/event/context.ts';

export default function JoyShowcase() {
  const [eventService] = useState(() => new EventService());

  useEffect(() => {
    eventService.init();
    return () => eventService.destroy();
  }, [eventService]);

  return (
    <>
      <ShootingStarScene paused={false}/>
      <EventContext.Provider value={eventService}>
        <InfoBar position={Position.TopRight}/>
        <Main/>
        {/*<Router>*/}
        {/*  <Routes>*/}
        {/*    <Route path="/" element={<Main/>}/>*/}
        {/*    <Route path="/system" element={<System/>}/>*/}
        {/*    <Route path="/system/reboot" element={<Reboot/>}/>*/}
        {/*    <Route path="/system/shutdown" element={<Shutdown/>}/>*/}
        {/*  </Routes>*/}
        {/*</Router>*/}
      </EventContext.Provider>
    </>
  );
}
