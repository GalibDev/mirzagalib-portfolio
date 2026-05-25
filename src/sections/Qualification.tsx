import { getQualifications } from "@/lib/public-data";
import QualificationClient from "@/sections/QualificationClient";

export default async function Qualification() {
  const items = await getQualifications();

  return <QualificationClient items={items} />;
}
