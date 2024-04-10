import { Button, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddButton = ({ setShowModal }: Props) => {
  return (
    <Button
      leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}
      onClick={() => {
        setShowModal(true);
      }}
    >
      Add Blacklist
    </Button>
  );
};

export default AddButton;
