import { getAccount } from "~/data/accounts";

export default async function AccountPage({
  params,
}: {
  params: { accountPublicId: string };
}) {
  const account = await getAccount(params.accountPublicId);
  return <div>{account?.name}</div>;
}
