import { Button } from "~/app/_components/Button";
import { getAccount } from "~/data/accounts";
import { DeleteAccountButton } from "./DeleteAccountButton";

export default async function AccountPage({
  params,
}: {
  params: { accountPublicId: string };
}) {
  const account = await getAccount(params.accountPublicId);
  return (
    <div>
      {account?.name}
      <DeleteAccountButton />
    </div>
  );
}
