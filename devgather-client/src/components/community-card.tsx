import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

type CommunityCardProps = {
  data: {
    slug: string;
    image: string;
    name: string;
    city: string;
    state: string;
    description: string;
    totalMembers: number;
    tags: string[];
  };
};

export default function CommunityCard({ data }: CommunityCardProps) {
  let description = data.description;

  description = description.slice(0, Math.min(60, description.length)) + "...";

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            height={56}
            src={data.image}
            width={56}
          />
          <div>
            <h4 className="font-bold text-large leading-none">{data.name}</h4>
            <p className="text-sm">
              {data.city}, {data.state}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="-mt-4 flex-col items-start gap-1">
        <div className="flex gap-1 flex-wrap">
          {data.tags.map((tag) => (
            <Chip key={`communities-${data.slug}-tag-${tag}`} size="sm">
              {tag}
            </Chip>
          ))}
          <Chip color="primary" size="sm">
            10 Membros
          </Chip>
        </div>
        <p className="text-sm hyphens-auto">{description}</p>
      </CardBody>
    </Card>
  );
}
