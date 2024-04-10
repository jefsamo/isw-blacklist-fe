import { Button, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <h2>Reason for Blacklist</h2>
      <p> Book {bookId}</p>

      <Text m={"20 0"}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi quo
        nesciunt quos odio eveniet, ex consequuntur et sed hic sapiente eum
        mollitia animi illum quis numquam debitis totam. Maiores, eveniet atque
        perspiciatis odit quaerat accusamus ut architecto corporis beatae sequi
        reprehenderit exercitationem mollitia qui itaque laboriosam impedit quod
        natus minus dicta. Voluptatibus minus cumque, deserunt culpa earum ipsa
        et ipsam fugiat alias, laudantium eius excepturi veritatis fugit esse,
        quisquam quaerat exercitationem. Impedit doloribus voluptate ab? Sequi,
        ipsam? Nobis molestias saepe molestiae accusantium sequi odio numquam.
        Animi suscipit cumque beatae veritatis, iste ratione similique nostrum
        alias qui aliquid provident? Dolor eligendi accusamus officia provident
        praesentium mollitia officiis quisquam eaque numquam, ducimus temporibus
        ex, pariatur earum, consequatur voluptate harum. Natus magni ex quam
        quos reprehenderit nemo vel facilis minus, eaque illum, eius fugit vitae
        a esse autem.
      </Text>
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

export default Book;
