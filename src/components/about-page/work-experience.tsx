import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import avanadeIcon from "@/assets/brands/avanade.png?url";
import tokenlabIcon from "@/assets/brands/tokenlab.png?url";
import kaffaIcon from "@/assets/brands/kaffa.png?url";
import { useMediaQuery } from "usehooks-ts";
import { Badge } from "@/components/ui/badge.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import type { ReactNode } from "react";

const freelanceImages = import.meta.glob("@/assets/freelance/*.jpg", { eager: true, import: 'default', query: '?url' });

function sinceDate(startYear: number, startMonth: number, startDay: number): string {
  const now = new Date();
  const start = new Date(startYear, startMonth - 1, startDay);
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months--;
  if (months < 0) { years--; months += 12; }
  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  return parts.join(' ') || 'less than a month';
}

type WorkExperienceCardProps = {
  icon: string
  iconAlt: string
  fallbackText: string
  fallbackClassName?: string
  name: string
  role: string
  dateRange: string
  children: ReactNode
}

function WorkExperienceCard({ icon, iconAlt, fallbackText, fallbackClassName, name, role, dateRange, children }: WorkExperienceCardProps) {
  return <Card className="gap-2.5">
    <CardHeader>
      <CardTitle className="flex gap-3 items-center">
        <Avatar>
          <AvatarImage src={icon} alt={iconAlt} />
          <AvatarFallback className={fallbackClassName}>{fallbackText}</AvatarFallback>
        </Avatar>
        <span className="text-lg">{name}</span>
      </CardTitle>
      <CardDescription>{role} · {dateRange}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {children}
    </CardContent>
  </Card>;
}

function KaffaTab() {
  return <WorkExperienceCard
    icon={kaffaIcon} iconAlt="Kaffa icon"
    fallbackText="K" fallbackClassName="bg-emerald-600 text-white font-bold"
    name="Kaffa" role="Full-stack Developer"
    dateRange={`May 2025 - present (${sinceDate(2025, 5, 12)})`}
  >
    <p>At Kaffa, I began by implementing and customizing their operational asset management platform
      for an energy distribution client, then transitioned to the company&apos;s product innovation team.</p>
    <p>There I took on some of the more technically interesting challenges: building a Lua scripting layer
      to make the platform fully loadable from a single executable, and authoring a Static
      Reflections library for Kotlin — twice, once with ByteBuddy and once with KSP.</p>
    <p>I&apos;ve since been developing a GIS platform in TypeScript with Vite + React, and a Bun-powered
      task graph executor for spinning up and configuring temporary development environments.</p>
  </WorkExperienceCard>;
}

function AvanadeTab() {
  return <WorkExperienceCard
    icon={avanadeIcon} iconAlt="Avanade icon"
    fallbackText="AV"
    name="Avanade" role="Full-stack Developer"
    dateRange="May 2024 - Mar 2025 (11 months)"
  >
    <p>While at Avanade, I collaborated in many agile teams to deliver high-quality software solutions for
      clients.</p>
    <p>I worked on various front-end and back-end solutions, where I utilized my skills in Java/Spring,
      TypeScript/NextJS.</p>
    <p>My experience at Avanade has allowed me to grow as a developer and gain valuable insights on working with
      big corporate clients.</p>
  </WorkExperienceCard>;
}

function FreelanceTab() {
  return <Card className="gap-2.5">
    <CardHeader>
      <CardTitle className="text-lg">
        Freelance Full-stack Developer
      </CardTitle>
      <CardDescription>Freelance · Jul 2023 - Mar 2024 (8 months)</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2">
        <p>Developed landing pages and showcase websites for small businesses, with focus on affordable hosting
          and easy upkeep.</p>
        <p>Deployed websites now receive 3.9k unique visitors monthly, with zero hosting costs.</p>
      </div>
      <div>
        <span
          className="text-sm text-center text-muted-foreground mb-1 block">Showcase of completed projects</span>
        <div className="sm:grid sm:grid-cols-2 sm:gap-3 max-sm:space-y-3 max-sm:mx-auto max-sm:max-w-sm">
          {Object.entries(freelanceImages).map(([key, value]) => <img key={key} src={value as string}
            alt={key}
            className="rounded-lg shadow" />)}
        </div>
      </div>
    </CardContent>
  </Card>;
}

function TokenlabTab() {
  return <WorkExperienceCard
    icon={tokenlabIcon} iconAlt="Tokenlab icon"
    fallbackText="TL"
    name="Tokenlab" role="Full-stack Developer"
    dateRange="Nov 2020 - Jul 2023 (2 years 9 months)"
  >
    <p>While at Tokenlab, I grew as a developer and learned to work with a variety of technologies,
      as well as to work in a team and deliver high-quality software solutions.</p>
    <p>I shined as a junior and mid developer with tons of technical knowledge and experience, being able to
      deliver high-quality software solutions in a timely manner.</p>
    <p>My knowledge and experience led me to focus on my development of soft skills, such as communication and
      teamwork.</p>
  </WorkExperienceCard>;
}

export function WorkExperience() {
  const orientation = useMediaQuery('(min-width: 640px)', { initializeWithValue: false }) ? 'vertical' : 'horizontal';
  return <div className="space-y-2">
    <h2 className="text-xl font-semibold flex items-center gap-3">Work Experience <Badge variant="secondary">5+ years</Badge></h2>
    <Tabs defaultValue="kaffa" orientation={orientation}>
      <TabsList>
        <TabsTrigger value="kaffa">Kaffa</TabsTrigger>
        <TabsTrigger value="avanade">Avanade</TabsTrigger>
        <TabsTrigger value="freelance">Freelance</TabsTrigger>
        <TabsTrigger value="tokenlab">Tokenlab</TabsTrigger>
      </TabsList>
      <TabsContent value="kaffa"><KaffaTab /></TabsContent>
      <TabsContent value="avanade"><AvanadeTab /></TabsContent>
      <TabsContent value="freelance"><FreelanceTab /></TabsContent>
      <TabsContent value="tokenlab"><TokenlabTab /></TabsContent>
    </Tabs>
  </div>;
}
