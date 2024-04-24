import { useState } from "react";
import { Button, Center, Loader, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useGetABlacklistedItem } from "../../hooks/useGetABlacklistedItem";
import { useRemoveBlacklist } from "../../hooks/useRemoveBlacklist";

const Blacklist = () => {
  const navigate = useNavigate();
  const { blacklistItemId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState("");

  const { isLoading, blacklistItem } = useGetABlacklistedItem();

  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { removeBlacklist } = useRemoveBlacklist();

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
          <Textarea 
            placeholder="Reason..." 
            m="0 0 30 0" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
          />
          <Button
            variant="filled"
            style={{ display: "flex", marginLeft: "auto" }}
            onClick={(e) => {
              e.preventDefault();
  
              if (!reason) return;
  
              removeBlacklist(
                {
                  blacklistItemId: blacklistItemId || '', // Providing a default value
                  reason,
                  token: currentUser?.jwToken,
                },
                {
                  onSettled: () => {
                    setReason("");
                    close();
                    navigate("/items");
                  },
                }
              );
            }}
          >
            Remove
          </Button>
        </Modal>
      </div>
    );
};

export default Blacklist;
