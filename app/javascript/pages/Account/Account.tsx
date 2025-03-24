import { AccountType } from "./types";
import { Text } from "../../components/ui/text"; // Assuming you have a Text component

interface AccountProps {
  account: AccountType;
}

export default function Account({ account }: AccountProps) {
  return (
    <div className="p-4">
      <Text>
        <strong>Name:</strong> {account.name?.toString()}
      </Text>
    </div>
  );
}
