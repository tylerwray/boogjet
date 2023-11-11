import { Button } from "~/app/_components/Button";
import { getAccount } from "~/data/accounts";
import { EditAccountButton } from "./EditAccountButton";
import { DeleteAccountButton } from "./DeleteAccountButton";

export default async function AccountPage({
  params,
}: {
  params: { accountPublicId: string };
}) {
  const account = await getAccount(params.accountPublicId);

  if (!account) return null;

  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
      {account?.name}
      <EditAccountButton account={account} />
      <DeleteAccountButton />
    </div>
  );
}
