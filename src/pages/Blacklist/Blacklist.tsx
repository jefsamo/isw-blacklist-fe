import { Button, Center, Loader, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useGetABlacklistedItem } from "../../hooks/useGetABlacklistedItem";

const Blacklist = () => {
  const { blacklistItemId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, blacklistItem } = useGetABlacklistedItem();

  const blacklistReason = blacklistItem?.data.reason ?? "Nil";
  console.log(blacklistItem);

  if (isLoading)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );
  return (
    <div>
      <h2>Reason for Blacklist</h2>
      <p> ItemId {blacklistItemId}</p>

      <Text m={"20 0"}>Reason for blacklist: {blacklistReason}</Text>
      <Button onClick={open}>Remove from Blacklist</Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Reason for removal"
        centered
        size="55%"
      >
        <Textarea placeholder="Reason..." m="0 0 30 0" />
        <Button
          variant="filled"
          style={{ display: "flex", marginLeft: "auto" }}
        >
          Remove
        </Button>
      </Modal>
    </div>
  );
};

export default Blacklist;
