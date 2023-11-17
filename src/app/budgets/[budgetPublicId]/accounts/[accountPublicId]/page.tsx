import { Button } from "~/components/ui/button";
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
    <div className="grid h-full grid-cols-[1fr_auto_auto] gap-2 p-8">
      {account?.name}
      <EditAccountButton account={account} />
      <DeleteAccountButton />
    </div>
  );
}
