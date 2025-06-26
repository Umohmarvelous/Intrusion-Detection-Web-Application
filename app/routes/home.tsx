import type { Route } from "./+types/home";
import Component from "../intrusiondetectionapp/intrusiondetectionapp";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Component />;

}
