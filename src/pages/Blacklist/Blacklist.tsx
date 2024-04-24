import { Button, Center, Loader, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useGetABlacklistedItem } from "../../hooks/useGetABlacklistedItem";
import { useUsers } from "../../hooks/useUsers";
import { useGetAllUsers } from "../../hooks/useGetAllUsers"; // Import the necessary hooks

const Blacklist = () => {
  const { blacklistItemId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const { isLoading, blacklistItem } = useGetABlacklistedItem();
  const { users, isLoading: isLoadingUsers } = useUsers(); // Get users and loading state
  const { users: totalUsers, isLoading: isLoadingTotalUsers } = useGetAllUsers(); // Get total users and loading state

  const currentUser = JSON.parse(localStorage.getItem("user")!);

  if (isLoading || isLoadingUsers || isLoadingTotalUsers)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const blacklistReason = blacklistItem?.data.reason ?? "Nil";

  return (
    <div>
      <h2>Reason for Blacklist</h2>
      <p> ItemId {blacklistItemId}</p>

      {currentUser.userRole === "BlacklistAdmin" ? (
        <>
          <Text m={"20 0"}>Reason for blacklist: {blacklistReason}</Text>
          <Button onClick={open}>Remove from Blacklist</Button>
        </>
      ) : (
        <Text><b>Only Authorized User can see the reason why this item is blacklisted.</b></Text>
      )}

      {/* Modal for removing from blacklist */}
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
