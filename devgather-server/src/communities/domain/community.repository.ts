export type CreateCommunity = {
  image: string;
  name: string;
  state: string;
  city: string;
  description: string;
  ownerId: string;
  tags: string[];
};

export default interface CommunityRepository {
  create(data: CreateCommunity): Promise<void>;
}
