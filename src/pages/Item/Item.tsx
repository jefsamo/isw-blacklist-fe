import { Button, Center, Loader, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useGetANonBlacklistedItem } from "../../hooks/useGetANonBlacklistedItem";
import { useBlacklistItem } from "../../hooks/useBlacklistItem";
import { useState } from "react";

const Item = () => {
  const { itemId } = useParams();
  const [opened, { close }] = useDisclosure(false);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const { isLoading, nonBlacklistItem } = useGetANonBlacklistedItem();

  const { isPending, createBlacklist } = useBlacklistItem();

  const blacklistReason = nonBlacklistItem?.data.removalReason ?? "Nil";

  if (isLoading)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );
  return (
    <div>
      <h2>Reason</h2>
      <p> ItemId {itemId}</p>

      <Text m={"20 0"}>Reason for Removal Blacklist: {blacklistReason}</Text>
      {/* <Button onClick={open} variant="filled" color="red">
        Add to Blacklist
      </Button> */}

      <Modal
        opened={opened}
        onClose={close}
        title="Reason for blacklist"
        centered
        size="55%"
      >
        <Textarea
          placeholder="Reason..."
          m="0 0 30 0"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button
          variant="filled"
          color="red"
          style={{ display: "flex", marginLeft: "auto" }}
          loading={isPending}
          onClick={(e) => {
            e.preventDefault();

            if (!reason) return;

            createBlacklist(
              {
                itemId: itemId!,
                reason: reason,
                token: currentUser?.jwToken,
              },
              {
                onSettled: () => {
                  setReason("");
                  close();
                  navigate("/blacklist");
                },
              }
            );
          }}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
};

export default Item;
